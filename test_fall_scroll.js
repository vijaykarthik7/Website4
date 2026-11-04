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

async function captureFallScroller() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = 'C:\\Users\\vijay\\AppData\\Local\\Temp\\chrome-debug-profile-' + Date.now();
  const chromeArgs = [
    '--remote-debugging-port=9222',
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=${tmpDir}`,
    '--window-size=1440,900',
    'http://localhost:3000'
  ];

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

    // 1. Capture Hero (Scroll = 0)
    console.log('Capturing Hero with Frame 001...');
    const shotHero = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('fall_capture_1_hero.png', Buffer.from(shotHero.data, 'base64'));

    // 1b. Capture transition between Hero and Awards (scrollY = 450)
    console.log('Capturing Hero -> Awards transition...');
    await sendCommand('Runtime.evaluate', { expression: 'window.scrollTo({ top: 450, behavior: "instant" })' });
    await sleep(800);
    const shotTransition = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('fall_capture_1b_transition.png', Buffer.from(shotTransition.data, 'base64'));

    // 2. Scroll to Section 2 (Awards)
    console.log('Scrolling to Awards...');
    await sendCommand('Runtime.evaluate', { expression: 'document.getElementById("awards").scrollIntoView({ behavior: "instant" })' });
    await sleep(1000);
    const shotAwards = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('fall_capture_2_awards.png', Buffer.from(shotAwards.data, 'base64'));

    // 3. Scroll to Section 3 (About / Trust)
    console.log('Scrolling to About / Trust...');
    await sendCommand('Runtime.evaluate', { expression: 'document.getElementById("about").scrollIntoView({ behavior: "instant" })' });
    await sleep(1000);
    const shotAbout = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('fall_capture_3_about.png', Buffer.from(shotAbout.data, 'base64'));

    // 4. Scroll to Section 4 (Services) to verify fade-out
    console.log('Scrolling to Services (fade-out check)...');
    await sendCommand('Runtime.evaluate', { expression: 'document.getElementById("services").scrollIntoView({ behavior: "instant" })' });
    await sleep(1000);
    const shotServices = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('fall_capture_4_services.png', Buffer.from(shotServices.data, 'base64'));

    // Check canvas status
    const canvasEval = await sendCommand('Runtime.evaluate', {
      expression: '({ opacity: document.getElementById("fall-bg-viewport").style.opacity, canvasW: document.getElementById("fall-canvas").width, canvasH: document.getElementById("fall-canvas").height })',
      returnByValue: true
    });
    console.log('Canvas eval result at Services:', canvasEval.result.value);

    console.log('Console logs:', consoleLogs);
    ws.close();
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    try { chromeProc.kill(); } catch (e) {}
  }
}

captureFallScroller();
