const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function testLiftScroller() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = 'C:\\Users\\vijay\\AppData\\Local\\Temp\\chrome-lift-profile-' + Date.now();
  const chromeArgs = [
    '--remote-debugging-port=9222',
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=${tmpDir}`,
    '--window-size=1440,900',
    'http://localhost:3000'
  ];

  console.log('Spawning Chrome headless...');
  const chromeProc = spawn(chromePath, chromeArgs);

  let targets = null;
  for (let i = 0; i < 15; i++) {
    await sleep(600);
    try {
      targets = await getJson('http://localhost:9222/json');
      if (targets && targets.length > 0) break;
    } catch (e) {}
  }

  try {
    const pageTarget = targets.find(t => t.type === 'page' && t.url.includes('localhost:3000')) || targets[0];
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

    let id = 1;
    function sendCommand(method, params = {}) {
      return new Promise((resolve) => {
        const cmdId = id++;
        const handler = (event) => {
          const res = JSON.parse(event.data);
          if (res.id === cmdId) {
            ws.removeEventListener('message', handler);
            resolve(res.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: cmdId, method, params }));
      });
    }

    const consoleLogs = [];
    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        consoleLogs.push(msg.params.args.map(a => a.value).join(' '));
      }
    });

    await sendCommand('Runtime.enable');
    await sendCommand('Page.enable');

    // Wait for preloader to finish
    await sleep(3500);
    await sendCommand('Runtime.evaluate', {
      expression: 'document.body.classList.remove("loading-state"); const p = document.getElementById("preloader"); if (p) p.style.display = "none";'
    });
    await sleep(1000);

    // 1. Scroll to Section 4 (Services) - First section of LIFT
    console.log('Scrolling to Section 4 (Services)...');
    await sendCommand('Runtime.evaluate', {
      expression: 'document.getElementById("services").scrollIntoView({ behavior: "instant" })'
    });
    await sleep(1500);

    const liftEval4 = await sendCommand('Runtime.evaluate', {
      expression: '({ fallOpacity: document.getElementById("fall-bg-viewport").style.opacity, liftOpacity: document.getElementById("lift-bg-viewport").style.opacity, liftCanvasW: document.getElementById("lift-canvas").width, scrollY: window.scrollY })',
      returnByValue: true
    });
    console.log('Status at Section 4 (Services):', liftEval4.result.value);

    const shotServices = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('lift_capture_4_services.png', Buffer.from(shotServices.data, 'base64'));

    // 2. Scroll to Section 5 (Guardian) - Middle section of LIFT
    console.log('Scrolling to Section 5 (Guardian)...');
    await sendCommand('Runtime.evaluate', {
      expression: 'document.getElementById("guardian").scrollIntoView({ behavior: "instant" })'
    });
    await sleep(1500);

    const liftEval5 = await sendCommand('Runtime.evaluate', {
      expression: '({ liftOpacity: document.getElementById("lift-bg-viewport").style.opacity, scrollY: window.scrollY })',
      returnByValue: true
    });
    console.log('Status at Section 5 (Guardian):', liftEval5.result.value);

    const shotGuardian = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('lift_capture_5_guardian.png', Buffer.from(shotGuardian.data, 'base64'));

    // 3. Scroll to Section 6 (Portfolio) - Final section of LIFT
    console.log('Scrolling to Section 6 (Portfolio)...');
    await sendCommand('Runtime.evaluate', {
      expression: 'document.getElementById("portfolio").scrollIntoView({ behavior: "instant" })'
    });
    await sleep(1500);

    const liftEval6 = await sendCommand('Runtime.evaluate', {
      expression: '({ liftOpacity: document.getElementById("lift-bg-viewport").style.opacity, scrollY: window.scrollY })',
      returnByValue: true
    });
    console.log('Status at Section 6 (Portfolio):', liftEval6.result.value);

    const shotPortfolio = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('lift_capture_6_portfolio.png', Buffer.from(shotPortfolio.data, 'base64'));

    // 3b. Scroll to Case Card 2 (Puratap) - Key being clamped and lifted
    console.log('Scrolling to Case Card 2 (Puratap)...');
    await sendCommand('Runtime.evaluate', {
      expression: 'document.querySelectorAll(".case-card")[1].scrollIntoView({ behavior: "instant" })'
    });
    await sleep(1500);
    const scrollMidVal = await sendCommand('Runtime.evaluate', { expression: '({ scrollY: window.scrollY, liftOpacity: document.getElementById("lift-bg-viewport").style.opacity })', returnByValue: true });
    console.log('Scroll at Case Card 2:', scrollMidVal.result.value);
    const shotPortfolioMid = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('lift_capture_6b_portfolio_mid.png', Buffer.from(shotPortfolioMid.data, 'base64'));

    // 3c. Scroll to Case Card 3 (TNG) - Key lifted into the air
    console.log('Scrolling to Case Card 3 (TNG)...');
    await sendCommand('Runtime.evaluate', {
      expression: 'document.querySelectorAll(".case-card")[2].scrollIntoView({ behavior: "instant" })'
    });
    await sleep(1500);
    const scrollDeepVal = await sendCommand('Runtime.evaluate', { expression: '({ scrollY: window.scrollY, liftOpacity: document.getElementById("lift-bg-viewport").style.opacity })', returnByValue: true });
    console.log('Scroll at Case Card 3:', scrollDeepVal.result.value);
    const shotPortfolioDeep = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('lift_capture_6c_portfolio_deep.png', Buffer.from(shotPortfolioDeep.data, 'base64'));

    // 4. Scroll to Section 7 (Results) - Should fade out LIFT
    console.log('Scrolling to Section 7 (Results - fade out check)...');
    await sendCommand('Runtime.evaluate', {
      expression: 'document.getElementById("results").scrollIntoView({ behavior: "instant" })'
    });
    await sleep(1500);

    const liftEval7 = await sendCommand('Runtime.evaluate', {
      expression: '({ liftOpacity: document.getElementById("lift-bg-viewport").style.opacity, scrollY: window.scrollY })',
      returnByValue: true
    });
    console.log('Status at Section 7 (Results):', liftEval7.result.value);

    const shotResults = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('lift_capture_7_results.png', Buffer.from(shotResults.data, 'base64'));

    console.log('All captures complete! Console logs:', consoleLogs.filter(l => !l.includes('THREE.WebGLRenderer')));
    ws.close();
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    try { chromeProc.kill(); } catch (e) {}
  }
}

testLiftScroller();
