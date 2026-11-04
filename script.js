/**
 * RIYADVI SOFTWARE TECHNOLOGIES — LUXURY 3D INTERACTIVE SCRIPT
 * Three.js 3D WebGL Engine, Guardian 3D Shield, Custom Magnetic Cursor,
 * Digital Capability Console, Connected Tech Canvas, 7-Step Estimator & AI Assistant
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. CINEMATIC PRELOADER (1-2s Gold Particle Sequence - Section 4)
  // ==========================================================================
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloader-bar-fill');
  const preloaderCanvas = document.getElementById('preloader-canvas');
  let preloadProgress = 0;

  if (preloaderCanvas) {
    const pCtx = preloaderCanvas.getContext('2d');
    let pW = (preloaderCanvas.width = window.innerWidth);
    let pH = (preloaderCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      pW = preloaderCanvas.width = window.innerWidth;
      pH = preloaderCanvas.height = window.innerHeight;
    });

    const particles = [];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * pW,
        y: Math.random() * pH,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5,
        alpha: Math.random() * 0.7 + 0.3
      });
    }

    let pAnimId;
    function renderPreloaderParticles() {
      pCtx.clearRect(0, 0, pW, pH);
      const centerX = pW / 2;
      const centerY = pH / 2;

      particles.forEach((p) => {
        // Gravitate toward center
        const dx = centerX - p.x;
        const dy = centerY - p.y;
        p.x += dx * 0.02 + p.speedX;
        p.y += dy * 0.02 + p.speedY;

        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        pCtx.fillStyle = `rgba(244, 211, 107, ${p.alpha})`;
        pCtx.shadowColor = '#D4AF37';
        pCtx.shadowBlur = 8;
        pCtx.fill();
      });

      if (document.body.classList.contains('loading-state')) {
        pAnimId = requestAnimationFrame(renderPreloaderParticles);
      }
    }
    pAnimId = requestAnimationFrame(renderPreloaderParticles);

    function dismissPreloader() {
      if (!document.body.classList.contains('loading-state')) return;
      preloadProgress = 100;
      if (preloaderBar) preloaderBar.style.width = '100%';
      clearInterval(preloadInterval);
      document.body.classList.remove('loading-state');
      if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.pointerEvents = 'none';
        setTimeout(() => {
          preloader.style.display = 'none';
          if (pAnimId) cancelAnimationFrame(pAnimId);
        }, 400);
      }
    }

    const preloadInterval = setInterval(() => {
      preloadProgress += 10;
      if (preloaderBar) preloaderBar.style.width = `${Math.min(100, preloadProgress)}%`;

      if (preloadProgress >= 100) {
        dismissPreloader();
      }
    }, 35);

    // Instant completion on window load or document ready
    if (document.readyState === 'complete') {
      setTimeout(dismissPreloader, 350);
    } else {
      window.addEventListener('load', () => setTimeout(dismissPreloader, 250), { once: true });
    }
    // Hard ceiling safety timeout: max 1.2s ensures user never waits
    setTimeout(dismissPreloader, 1200);
  }

  // ==========================================================================
  // 2. DESKTOP CUSTOM MAGNETIC GOLD CURSOR (Section 34)
  // ==========================================================================
  const cursor = document.getElementById('custom-cursor');
  const cursorText = document.getElementById('cursor-text');
  let mouseX = -100, mouseY = -100;
  let cursorX = -100, cursorY = -100;

  if (window.matchMedia('(pointer: fine)').matches && cursor) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateCursor() {
      cursorX += (mouseX - cursorX) * 0.22;
      cursorY += (mouseY - cursorY) * 0.22;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);

    function attachCursorHover(elements, label = '') {
      elements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('hovering');
          if (cursorText && label) {
            cursorText.textContent = label;
            cursorText.style.display = 'block';
          }
        });
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('hovering');
          if (cursorText) {
            cursorText.textContent = '';
            cursorText.style.display = 'none';
          }
        });
      });
    }

    attachCursorHover(document.querySelectorAll('.btn-primary-gold, .header-cta-btn, .hero-stream-btn'), 'GO');
    attachCursorHover(document.querySelectorAll('.pin-pill'), 'METRIC');
    attachCursorHover(document.querySelectorAll('.award-card'), 'VERIFY');
    attachCursorHover(document.querySelectorAll('.case-card'), 'VIEW');
    attachCursorHover(document.querySelectorAll('.cap-selector-btn'), 'SELECT');
    attachCursorHover(document.querySelectorAll('.ind-tab'), 'EXPLORE');
    attachCursorHover(document.querySelectorAll('.tech-canvas-container'), 'DRAG');
  }

  // ==========================================================================
  // 3. AMBIENT GOLDEN ENERGY LINE (CANVAS - Section 33)
  // ==========================================================================
  const energyCanvas = document.getElementById('energy-line-canvas');
  if (energyCanvas) {
    const eCtx = energyCanvas.getContext('2d');
    let width = (energyCanvas.width = window.innerWidth);
    let height = (energyCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = energyCanvas.width = window.innerWidth;
      height = energyCanvas.height = window.innerHeight;
    });

    let waveStep = 0;
    function drawEnergyLine() {
      eCtx.clearRect(0, 0, width, height);

      waveStep += 0.012;
      eCtx.beginPath();
      eCtx.moveTo(0, height * 0.45);

      for (let x = 0; x < width; x += 16) {
        const y =
          height * 0.45 +
          Math.sin(x * 0.0025 + waveStep) * 80 +
          Math.cos(x * 0.0012 - waveStep * 0.6) * 40;
        eCtx.lineTo(x, y);
      }

      eCtx.strokeStyle = 'rgba(212, 175, 55, 0.18)';
      eCtx.lineWidth = 1.6;
      eCtx.shadowColor = '#F4D36B';
      eCtx.shadowBlur = 10;
      eCtx.stroke();

      requestAnimationFrame(drawEnergyLine);
    }
    requestAnimationFrame(drawEnergyLine);
  }

  // ==========================================================================
  // 4. LENIS BUTTERY SMOOTH MOMENTUM SCROLL ENGINE
  // ==========================================================================
  let lenisInstance = null;
  if (typeof Lenis !== 'undefined') {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0
    });
    window.lenis = lenisInstance;

    function lenisRaf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(lenisRaf);
    }
    requestAnimationFrame(lenisRaf);

    // Smooth Anchor Navigation
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenisInstance.scrollTo(targetEl, { duration: 1.4, offset: -40 });
          }
        }
      });
    });
  }

  // ==========================================================================
  // 4B. FALL SCROLL-DOWN CANVAS SCRUBBER (191 FRAMES ACROSS SECTIONS 1 TO 3)
  // ==========================================================================
  const fallCanvas = document.getElementById('fall-canvas');
  const fallViewport = document.getElementById('fall-bg-viewport');
  const heroSection = document.getElementById('hero');
  const awardsSection = document.getElementById('awards');
  const aboutSection = document.getElementById('about');

  if (fallCanvas && fallViewport && heroSection && aboutSection) {
    const fallCtx = fallCanvas.getContext('2d', { alpha: false });
    const TOTAL_FRAMES = 191;
    const fallFrames = new Array(TOTAL_FRAMES);
    const fallLoaded = new Array(TOTAL_FRAMES).fill(false);
    const fallLoadingPromises = new Map();
    let targetFrameFloat = 0;
    let currentFrameFloat = 0;
    let isFallVisible = true;
    let initialFrameRendered = false;

    // Elements for Hero scroll exit parallax
    const heroCenterContent = document.getElementById('hero-text-content');
    const heroSpatialPins = document.querySelector('.hero-spatial-pins');
    const heroTrustBar = document.querySelector('.hero-bottom-trust-bar');
    const heroScrollCue = document.getElementById('hero-scroll-cue');

    // Click handler for Hero scroll cue (scroll smoothly to Awards)
    if (heroScrollCue) {
      heroScrollCue.addEventListener('click', (e) => {
        e.preventDefault();
        const awardsEl = document.getElementById('awards');
        if (awardsEl) {
          const targetY = awardsEl.getBoundingClientRect().top + window.scrollY - 20;
          if (lenisInstance && typeof lenisInstance.scrollTo === 'function') {
            try {
              lenisInstance.scrollTo(targetY, { duration: 1.2 });
            } catch (err) {
              window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
          } else {
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
        }
      });
    }

    function getFramePath(idx) {
      const padded = String(idx + 1).padStart(3, '0');
      return `fall/ezgif-frame-${padded}.webp`;
    }

    let cW = 0;
    let cH = 0;
    function resizeFallCanvas() {
      cW = fallCanvas.width = window.innerWidth;
      cH = fallCanvas.height = window.innerHeight;
      renderFallFrame();
    }
    window.addEventListener('resize', resizeFallCanvas);

    function drawCover(img) {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const iW = img.naturalWidth;
      const iH = img.naturalHeight;
      const scale = Math.max(cW / iW, cH / iH);
      const dW = iW * scale;
      const dH = iH * scale;
      const oX = (cW - dW) / 2;
      const oY = (cH - dH) / 2;
      fallCtx.drawImage(img, oX, oY, dW, dH);
    }

    function renderFallFrame() {
      const desiredIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameFloat)));

      // Eagerly trigger on-demand load if not yet in memory
      if (!fallLoaded[desiredIdx]) {
        loadFrame(desiredIdx);
      }
      for (let s = 1; s <= 3; s++) {
        if (desiredIdx + s < TOTAL_FRAMES && !fallLoaded[desiredIdx + s]) loadFrame(desiredIdx + s);
        if (desiredIdx - s >= 0 && !fallLoaded[desiredIdx - s]) loadFrame(desiredIdx - s);
      }

      let frameToDraw = null;
      if (fallLoaded[desiredIdx] && fallFrames[desiredIdx]) {
        frameToDraw = fallFrames[desiredIdx];
      } else {
        // Nearest-neighbor fallback search
        for (let d = 1; d < TOTAL_FRAMES; d++) {
          const prev = desiredIdx - d;
          const next = desiredIdx + d;
          if (prev >= 0 && fallLoaded[prev] && fallFrames[prev]) {
            frameToDraw = fallFrames[prev];
            break;
          }
          if (next < TOTAL_FRAMES && fallLoaded[next] && fallFrames[next]) {
            frameToDraw = fallFrames[next];
            break;
          }
        }
      }

      if (frameToDraw) {
        drawCover(frameToDraw);
      }
    }

    function loadFrame(idx) {
      if (idx < 0 || idx >= TOTAL_FRAMES) return Promise.resolve(null);
      if (fallFrames[idx]) return Promise.resolve(fallFrames[idx]);
      if (fallLoadingPromises.has(idx)) return fallLoadingPromises.get(idx);

      const p = new Promise((resolve) => {
        const img = new Image();
        img.src = getFramePath(idx);
        img.onload = () => {
          fallFrames[idx] = img;
          fallLoaded[idx] = true;
          fallLoadingPromises.delete(idx);
          if (!initialFrameRendered) {
            initialFrameRendered = true;
            resizeFallCanvas();
            renderFallFrame();
          } else if (isFallVisible) {
            renderFallFrame();
          }
          resolve(img);
        };
        img.onerror = () => {
          fallLoadingPromises.delete(idx);
          resolve(null);
        };
      });

      fallLoadingPromises.set(idx, p);
      return p;
    }

    async function preloadFallSequence() {
      // 1. Immediately load Frame 0 and paint instantly
      await loadFrame(0);
      if (!initialFrameRendered) {
        initialFrameRendered = true;
        resizeFallCanvas();
        renderFallFrame();
      }

      // 2. Preload keyframes across entire sequence so scrubbing is always immediate
      const keyframes = [];
      for (let i = 2; i < TOTAL_FRAMES; i += 4) {
        keyframes.push(i);
      }
      if (!keyframes.includes(TOTAL_FRAMES - 1)) {
        keyframes.push(TOTAL_FRAMES - 1);
      }

      for (let i = 0; i < keyframes.length; i += 6) {
        const chunk = keyframes.slice(i, i + 6);
        chunk.forEach(loadFrame);
        await new Promise((r) => setTimeout(r, 35));
      }
    }

    function updateHeroParallax(scrollY, heroHeight) {
      if (scrollY > heroHeight * 1.3) return;

      const ratio = Math.min(1, Math.max(0, scrollY / Math.max(1, heroHeight * 0.85)));

      // Center hero headline & CTAs: upward translation and elegant fade
      if (heroCenterContent) {
        const ty = -10 - scrollY * 0.35;
        const scale = 1 - ratio * 0.05;
        const op = Math.max(0, 1 - ratio * 1.3);
        heroCenterContent.style.transform = `translate3d(0, ${ty}px, 0) scale(${scale})`;
        heroCenterContent.style.opacity = op;
      }

      // Spatial Pins: float outwards and fade
      if (heroSpatialPins) {
        heroSpatialPins.style.opacity = Math.max(0, 1 - ratio * 1.4);
      }

      // Trust bar: soft fade
      if (heroTrustBar) {
        heroTrustBar.style.opacity = Math.max(0, 1 - ratio * 2.0);
      }

      // Bottom scroll cue: fade out as soon as scroll starts
      if (heroScrollCue) {
        heroScrollCue.style.opacity = Math.max(0, 1 - ratio * 3.5);
      }
    }

    function updateFallProgress(e) {
      const scrollY = (e && typeof e.scroll === 'number') ? e.scroll : (window.lenis && typeof window.lenis.scroll === 'number' ? window.lenis.scroll : window.scrollY);
      const heroHeight = heroSection.offsetHeight || window.innerHeight;
      const aRect = aboutSection.getBoundingClientRect();
      const aboutBottom = aRect.bottom + scrollY;
      const winH = window.innerHeight;

      // Range for Sections 1, 2, and 3:
      // Section 1: Hero (top: 0)
      // Section 2: Awards (top: ~804)
      // Section 3: About / Trust (top: ~1750, bottom: aboutBottom ~2903)
      // Fall animation stays active and visible across ALL 3 sections!
      // It smoothly fades out at the bottom of Section 3 as Section 4 (Services) enters.
      const fadeStart = Math.max(1, aboutBottom - winH * 0.7);
      const fadeEnd = aboutBottom;

      if (scrollY <= fadeStart) {
        fallViewport.style.opacity = '1';
        fallViewport.style.visibility = 'visible';
        isFallVisible = true;
      } else if (scrollY > fadeStart && scrollY < fadeEnd) {
        const fadeRatio = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
        fallViewport.style.opacity = String(Math.max(0, Math.min(1, fadeRatio)));
        fallViewport.style.visibility = 'visible';
        isFallVisible = true;
      } else {
        fallViewport.style.opacity = '0';
        fallViewport.style.visibility = 'hidden';
        isFallVisible = false;
      }

      // Scroll Down Animation across all 3 sections (Hero, Awards, About):
      // At scrollY === 0: stationary at Frame 0 (NO video autoplay whatsoever).
      // As user scrolls down across Sections 1, 2, 3: scrubs frames 0 to 190 in direct sync with scroll.
      const scrubRange = Math.max(1, fadeStart);
      const progress = Math.min(1, Math.max(0, scrollY / scrubRange));
      targetFrameFloat = progress * (TOTAL_FRAMES - 1);

      // Update Hero exit parallax
      updateHeroParallax(scrollY, heroHeight);
    }

    function fallAnimLoop() {
      if (isFallVisible) {
        // ONLY updates when user scroll position changes targetFrameFloat. Completely static when resting.
        const diff = targetFrameFloat - currentFrameFloat;
        if (Math.abs(diff) > 0.005) {
          currentFrameFloat += diff * 0.25;
          renderFallFrame();
        }
      }
      requestAnimationFrame(fallAnimLoop);
    }

    window.addEventListener('scroll', updateFallProgress, { passive: true });
    if (lenisInstance) {
      lenisInstance.on('scroll', updateFallProgress);
    }

    resizeFallCanvas();
    updateFallProgress();
    preloadFallSequence();
    requestAnimationFrame(fallAnimLoop);
  }

  // ==========================================================================
  // 4C. LIFT SCROLL-DOWN CANVAS SCRUBBER (192 FRAMES ACROSS SECTIONS 4 TO 6)
  // (04 - SERVICES, 05 - GUARDIAN, 06 - PORTFOLIO)
  // ==========================================================================
  const liftCanvas = document.getElementById('lift-canvas');
  const liftViewport = document.getElementById('lift-bg-viewport');
  const servicesSection = document.getElementById('services');
  const guardianSection = document.getElementById('guardian');
  const portfolioSection = document.getElementById('portfolio');

  if (liftCanvas && liftViewport && servicesSection && portfolioSection) {
    const liftCtx = liftCanvas.getContext('2d', { alpha: false });
    const TOTAL_LIFT_FRAMES = 192;
    const liftFrames = new Array(TOTAL_LIFT_FRAMES);
    const liftLoaded = new Array(TOTAL_LIFT_FRAMES).fill(false);
    const liftLoadingPromises = new Map();
    let liftTargetFrameFloat = 0;
    let liftCurrentFrameFloat = 0;
    let isLiftVisible = false;
    let initialLiftRendered = false;
    let hasDrawnLiftVisible = false;

    function getLiftFramePath(idx) {
      const padded = String(idx + 1).padStart(3, '0');
      return `lift/ezgif-frame-${padded}.webp`;
    }

    let lW = (liftCanvas.width = window.innerWidth);
    let lH = (liftCanvas.height = window.innerHeight);

    function resizeLiftCanvas() {
      lW = liftCanvas.width = window.innerWidth;
      lH = liftCanvas.height = window.innerHeight;
      renderLiftFrame();
    }
    window.addEventListener('resize', resizeLiftCanvas);

    function drawLiftCover(img) {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const iW = img.naturalWidth;
      const iH = img.naturalHeight;
      const scale = Math.max(lW / iW, lH / iH);
      const dW = iW * scale;
      const dH = iH * scale;
      const oX = (lW - dW) / 2;
      const oY = (lH - dH) / 2;
      liftCtx.drawImage(img, oX, oY, dW, dH);
      hasDrawnLiftVisible = true;
    }

    function renderLiftFrame() {
      const desiredIdx = Math.max(0, Math.min(TOTAL_LIFT_FRAMES - 1, Math.round(liftCurrentFrameFloat)));

      // Speculative neighbor prefetch around current scrubber index
      if (!liftLoaded[desiredIdx]) {
        loadLiftFrame(desiredIdx);
      }
      for (let s = 1; s <= 4; s++) {
        if (desiredIdx + s < TOTAL_LIFT_FRAMES && !liftLoaded[desiredIdx + s]) loadLiftFrame(desiredIdx + s);
        if (desiredIdx - s >= 0 && !liftLoaded[desiredIdx - s]) loadLiftFrame(desiredIdx - s);
      }

      let frameToDraw = null;
      if (liftLoaded[desiredIdx] && liftFrames[desiredIdx]) {
        frameToDraw = liftFrames[desiredIdx];
      } else {
        // Nearest-neighbor fallback search so canvas is NEVER blank
        for (let d = 1; d < TOTAL_LIFT_FRAMES; d++) {
          const prev = desiredIdx - d;
          const next = desiredIdx + d;
          if (prev >= 0 && liftLoaded[prev] && liftFrames[prev]) {
            frameToDraw = liftFrames[prev];
            break;
          }
          if (next < TOTAL_LIFT_FRAMES && liftLoaded[next] && liftFrames[next]) {
            frameToDraw = liftFrames[next];
            break;
          }
        }
      }

      if (frameToDraw) {
        drawLiftCover(frameToDraw);
      }
    }

    function loadLiftFrame(idx) {
      if (idx < 0 || idx >= TOTAL_LIFT_FRAMES) return Promise.resolve(null);
      if (liftFrames[idx]) return Promise.resolve(liftFrames[idx]);
      if (liftLoadingPromises.has(idx)) return liftLoadingPromises.get(idx);

      const p = new Promise((resolve) => {
        const img = new Image();
        img.src = getLiftFramePath(idx);
        img.onload = () => {
          liftFrames[idx] = img;
          liftLoaded[idx] = true;
          liftLoadingPromises.delete(idx);
          if (isLiftVisible || !initialLiftRendered) {
            initialLiftRendered = true;
            renderLiftFrame();
          } else {
            const curIdx = Math.round(liftCurrentFrameFloat);
            if (Math.abs(curIdx - idx) <= 3) {
              renderLiftFrame();
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          liftLoadingPromises.delete(idx);
          resolve(null);
        };
      });

      liftLoadingPromises.set(idx, p);
      return p;
    }

    async function preloadLiftSequence() {
      // 1. Immediate priority: First frame painted instantly so canvas is NEVER empty
      await loadLiftFrame(0);
      if (!initialLiftRendered) {
        initialLiftRendered = true;
        resizeLiftCanvas();
        renderLiftFrame();
      }

      // 2. Preload keyframes spaced every 4 frames
      const keyframes = [];
      for (let i = 2; i < TOTAL_LIFT_FRAMES; i += 4) {
        keyframes.push(i);
      }
      if (!keyframes.includes(TOTAL_LIFT_FRAMES - 1)) keyframes.push(TOTAL_LIFT_FRAMES - 1);

      for (let i = 0; i < keyframes.length; i += 6) {
        const chunk = keyframes.slice(i, i + 6);
        chunk.forEach(loadLiftFrame);
        await new Promise((r) => setTimeout(r, 35));
      }
    }

    function updateLiftProgress(e) {
      const scrollY = (e && typeof e.scroll === 'number') ? e.scroll : (window.lenis && typeof window.lenis.scroll === 'number' ? window.lenis.scroll : window.scrollY);
      const winH = window.innerHeight;

      const sRect = servicesSection.getBoundingClientRect();
      const pRect = portfolioSection.getBoundingClientRect();
      const servicesTop = sRect.top + scrollY;
      const portfolioBottom = pRect.bottom + scrollY;

      // Range where Lift is active:
      // Fade in starts when Section 4 (Services) is coming into view
      const fadeInStart = Math.max(0, servicesTop - winH);
      const fadeInEnd = servicesTop;
      // Fade out starts when reaching the bottom of Section 6 (Portfolio)
      const fadeOutStart = Math.max(servicesTop, portfolioBottom - winH);
      const fadeOutEnd = portfolioBottom;

      const wasVisible = isLiftVisible;

      if (scrollY < fadeInStart) {
        liftViewport.style.opacity = '0';
        liftViewport.style.visibility = 'hidden';
        isLiftVisible = false;
        hasDrawnLiftVisible = false;
      } else if (scrollY >= fadeInStart && scrollY < fadeInEnd) {
        const ratio = (scrollY - fadeInStart) / (fadeInEnd - fadeInStart);
        liftViewport.style.opacity = String(Math.max(0, Math.min(1, ratio)));
        liftViewport.style.visibility = 'visible';
        isLiftVisible = true;
      } else if (scrollY >= fadeInEnd && scrollY <= fadeOutStart) {
        liftViewport.style.opacity = '1';
        liftViewport.style.visibility = 'visible';
        isLiftVisible = true;
      } else if (scrollY > fadeOutStart && scrollY < fadeOutEnd) {
        const ratio = 1 - (scrollY - fadeOutStart) / (fadeOutEnd - fadeOutStart);
        liftViewport.style.opacity = String(Math.max(0, Math.min(1, ratio)));
        liftViewport.style.visibility = 'visible';
        isLiftVisible = true;
      } else {
        liftViewport.style.opacity = '0';
        liftViewport.style.visibility = 'hidden';
        isLiftVisible = false;
        hasDrawnLiftVisible = false;
      }

      // Compute frame progression across the 3 sections (Services, Guardian, Portfolio)
      const scrubRange = Math.max(1, fadeOutStart - servicesTop);
      const progress = Math.min(1, Math.max(0, (scrollY - servicesTop) / scrubRange));
      liftTargetFrameFloat = progress * (TOTAL_LIFT_FRAMES - 1);

      // Render immediately upon entering visibility or if canvas hasn't drawn
      if (isLiftVisible && (!wasVisible || !hasDrawnLiftVisible)) {
        renderLiftFrame();
      }
    }

    function liftAnimLoop() {
      if (isLiftVisible) {
        const diff = liftTargetFrameFloat - liftCurrentFrameFloat;
        if (Math.abs(diff) > 0.005) {
          liftCurrentFrameFloat += diff * 0.2;
          renderLiftFrame();
        } else if (!hasDrawnLiftVisible) {
          renderLiftFrame();
        }
      }
      requestAnimationFrame(liftAnimLoop);
    }

    window.addEventListener('scroll', updateLiftProgress, { passive: true });
    if (lenisInstance) {
      lenisInstance.on('scroll', updateLiftProgress);
    }

    resizeLiftCanvas();
    updateLiftProgress();
    preloadLiftSequence();
    requestAnimationFrame(liftAnimLoop);
  }

  // ==========================================================================
  // 4D. BUILD SCROLL-DOWN CANVAS SCRUBBER (200 FRAMES ACROSS SECTIONS 7 TO 9)
  // (07 - RESULTS, 08 - INDUSTRIES, 09 - STORY)
  // ==========================================================================
  const buildCanvas = document.getElementById('build-canvas');
  const buildViewport = document.getElementById('build-bg-viewport');
  const resultsSection = document.getElementById('results');
  const industriesSection = document.getElementById('industries');
  const storySection = document.getElementById('story');

  if (buildCanvas && buildViewport && resultsSection && storySection) {
    const buildCtx = buildCanvas.getContext('2d', { alpha: false });
    const TOTAL_BUILD_FRAMES = 200;
    const buildFrames = new Array(TOTAL_BUILD_FRAMES);
    const buildLoaded = new Array(TOTAL_BUILD_FRAMES).fill(false);
    const buildLoadingPromises = new Map();
    let buildTargetFrameFloat = 0;
    let buildCurrentFrameFloat = 0;
    let isBuildVisible = false;
    let initialBuildRendered = false;
    let hasDrawnVisible = false;

    function getBuildFramePath(idx) {
      const padded = String(idx + 1).padStart(3, '0');
      return `build/ezgif-frame-${padded}.webp`;
    }

    let bW = (buildCanvas.width = window.innerWidth);
    let bH = (buildCanvas.height = window.innerHeight);

    function resizeBuildCanvas() {
      bW = buildCanvas.width = window.innerWidth;
      bH = buildCanvas.height = window.innerHeight;
      renderBuildFrame();
    }
    window.addEventListener('resize', resizeBuildCanvas);

    function drawBuildCover(img) {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const iW = img.naturalWidth;
      const iH = img.naturalHeight;
      const scale = Math.max(bW / iW, bH / iH);
      const dW = iW * scale;
      const dH = iH * scale;
      const oX = (bW - dW) / 2;
      const oY = (bH - dH) / 2;
      buildCtx.drawImage(img, oX, oY, dW, dH);
      hasDrawnVisible = true;
    }

    function renderBuildFrame() {
      const desiredIdx = Math.max(0, Math.min(TOTAL_BUILD_FRAMES - 1, Math.round(buildCurrentFrameFloat)));

      // Speculative neighbor prefetch around current scrubber index
      if (!buildLoaded[desiredIdx]) {
        loadBuildFrame(desiredIdx);
      }
      for (let s = 1; s <= 4; s++) {
        if (desiredIdx + s < TOTAL_BUILD_FRAMES && !buildLoaded[desiredIdx + s]) loadBuildFrame(desiredIdx + s);
        if (desiredIdx - s >= 0 && !buildLoaded[desiredIdx - s]) loadBuildFrame(desiredIdx - s);
      }

      let frameToDraw = null;
      if (buildLoaded[desiredIdx] && buildFrames[desiredIdx]) {
        frameToDraw = buildFrames[desiredIdx];
      } else {
        // Nearest-neighbor fallback search so canvas is never blank
        for (let d = 1; d < TOTAL_BUILD_FRAMES; d++) {
          const prev = desiredIdx - d;
          const next = desiredIdx + d;
          if (prev >= 0 && buildLoaded[prev] && buildFrames[prev]) {
            frameToDraw = buildFrames[prev];
            break;
          }
          if (next < TOTAL_BUILD_FRAMES && buildLoaded[next] && buildFrames[next]) {
            frameToDraw = buildFrames[next];
            break;
          }
        }
      }

      if (frameToDraw) {
        drawBuildCover(frameToDraw);
      }
    }

    function loadBuildFrame(idx) {
      if (idx < 0 || idx >= TOTAL_BUILD_FRAMES) return Promise.resolve(null);
      if (buildFrames[idx]) return Promise.resolve(buildFrames[idx]);
      if (buildLoadingPromises.has(idx)) return buildLoadingPromises.get(idx);

      const p = new Promise((resolve) => {
        const img = new Image();
        img.src = getBuildFramePath(idx);
        img.onload = () => {
          buildFrames[idx] = img;
          buildLoaded[idx] = true;
          buildLoadingPromises.delete(idx);
          if (isBuildVisible || !initialBuildRendered) {
            initialBuildRendered = true;
            renderBuildFrame();
          } else {
            const curIdx = Math.round(buildCurrentFrameFloat);
            if (Math.abs(curIdx - idx) <= 2) {
              renderBuildFrame();
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          buildLoadingPromises.delete(idx);
          resolve(null);
        };
      });

      buildLoadingPromises.set(idx, p);
      return p;
    }

    async function preloadBuildSequence() {
      // 1. Immediate priority: First frame painted instantly
      await loadBuildFrame(0);
      if (!initialBuildRendered) {
        initialBuildRendered = true;
        resizeBuildCanvas();
        renderBuildFrame();
      }

      // 2. Preload keyframes spaced every 4 frames
      const keyframes = [];
      for (let i = 2; i < TOTAL_BUILD_FRAMES; i += 4) {
        keyframes.push(i);
      }
      if (!keyframes.includes(TOTAL_BUILD_FRAMES - 1)) {
        keyframes.push(TOTAL_BUILD_FRAMES - 1);
      }

      for (let i = 0; i < keyframes.length; i += 6) {
        const chunk = keyframes.slice(i, i + 6);
        chunk.forEach(loadBuildFrame);
        await new Promise((r) => setTimeout(r, 35));
      }
    }

    function updateBuildProgress(e) {
      const scrollY = (e && typeof e.scroll === 'number') ? e.scroll : (window.lenis && typeof window.lenis.scroll === 'number' ? window.lenis.scroll : window.scrollY);
      const winH = window.innerHeight;

      const rRect = resultsSection.getBoundingClientRect();
      const sRect = storySection.getBoundingClientRect();
      const resultsTop = rRect.top + scrollY;
      const storyBottom = sRect.bottom + scrollY;

      // Range where Build animation is active:
      // Fade in starts when Section 7 (Results) is coming into view
      const fadeInStart = Math.max(0, resultsTop - winH);
      const fadeInEnd = resultsTop;
      // Fade out starts when reaching the bottom of Section 9 (Story)
      const fadeOutStart = Math.max(resultsTop, storyBottom - winH);
      const fadeOutEnd = storyBottom;

      const wasVisible = isBuildVisible;

      if (scrollY < fadeInStart) {
        buildViewport.style.opacity = '0';
        buildViewport.style.visibility = 'hidden';
        isBuildVisible = false;
        hasDrawnVisible = false;
      } else if (scrollY >= fadeInStart && scrollY < fadeInEnd) {
        const ratio = (scrollY - fadeInStart) / (fadeInEnd - fadeInStart);
        buildViewport.style.opacity = String(Math.max(0, Math.min(1, ratio)));
        buildViewport.style.visibility = 'visible';
        isBuildVisible = true;
      } else if (scrollY >= fadeInEnd && scrollY <= fadeOutStart) {
        buildViewport.style.opacity = '1';
        buildViewport.style.visibility = 'visible';
        isBuildVisible = true;
      } else if (scrollY > fadeOutStart && scrollY < fadeOutEnd) {
        const ratio = 1 - (scrollY - fadeOutStart) / (fadeOutEnd - fadeOutStart);
        buildViewport.style.opacity = String(Math.max(0, Math.min(1, ratio)));
        buildViewport.style.visibility = 'visible';
        isBuildVisible = true;
      } else {
        buildViewport.style.opacity = '0';
        buildViewport.style.visibility = 'hidden';
        isBuildVisible = false;
        hasDrawnVisible = false;
      }

      // Compute frame progression across the 3 sections (Results, Industries, Story)
      const scrubRange = Math.max(1, fadeOutStart - resultsTop);
      const progress = Math.min(1, Math.max(0, (scrollY - resultsTop) / scrubRange));
      buildTargetFrameFloat = progress * (TOTAL_BUILD_FRAMES - 1);

      // Render immediately upon entering visibility or if canvas hasn't drawn
      if (isBuildVisible && (!wasVisible || !hasDrawnVisible)) {
        renderBuildFrame();
      }
    }

    function buildAnimLoop() {
      if (isBuildVisible) {
        const diff = buildTargetFrameFloat - buildCurrentFrameFloat;
        if (Math.abs(diff) > 0.001) {
          buildCurrentFrameFloat += diff * 0.2;
          renderBuildFrame();
        } else if (!hasDrawnVisible) {
          renderBuildFrame();
        }
      }
      requestAnimationFrame(buildAnimLoop);
    }

    window.addEventListener('scroll', updateBuildProgress, { passive: true });
    if (lenisInstance) {
      lenisInstance.on('scroll', updateBuildProgress);
    }

    resizeBuildCanvas();
    updateBuildProgress();
    preloadBuildSequence();
    requestAnimationFrame(buildAnimLoop);
  }

  // ==========================================================================
  // 4E. HAND SCROLL-DOWN CANVAS SCRUBBER (192 FRAMES ACROSS SECTIONS 10 TO 12)
  // (10 - TECH ECOSYSTEM, 11 - AI FUTURE, 12 - TESTIMONIALS)
  // ==========================================================================
  const handCanvas = document.getElementById('hand-canvas');
  const handViewport = document.getElementById('hand-bg-viewport');
  const techSection = document.getElementById('tech-ecosystem');
  const aiSection = document.getElementById('ai-future');
  const testimonialsSection = document.getElementById('testimonials');

  if (handCanvas && handViewport && techSection && testimonialsSection) {
    const handCtx = handCanvas.getContext('2d', { alpha: false });
    const TOTAL_HAND_FRAMES = 192;
    const handFrames = new Array(TOTAL_HAND_FRAMES);
    const handLoaded = new Array(TOTAL_HAND_FRAMES).fill(false);
    const handLoadingPromises = new Map();
    let handTargetFrameFloat = 0;
    let handCurrentFrameFloat = 0;
    let isHandVisible = false;
    let initialHandRendered = false;
    let hasDrawnHandVisible = false;

    function getHandFramePath(idx) {
      const padded = String(idx + 1).padStart(3, '0');
      return `hand/ezgif-frame-${padded}.webp`;
    }

    let hW = (handCanvas.width = window.innerWidth);
    let hH = (handCanvas.height = window.innerHeight);

    function resizeHandCanvas() {
      hW = handCanvas.width = window.innerWidth;
      hH = handCanvas.height = window.innerHeight;
      renderHandFrame();
    }
    window.addEventListener('resize', resizeHandCanvas);

    function drawHandCover(img) {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const iW = img.naturalWidth;
      const iH = img.naturalHeight;
      const scale = Math.max(hW / iW, hH / iH);
      const dW = iW * scale;
      const dH = iH * scale;
      const oX = (hW - dW) / 2;
      const oY = (hH - dH) / 2;
      handCtx.drawImage(img, oX, oY, dW, dH);
      hasDrawnHandVisible = true;
    }

    function renderHandFrame() {
      const desiredIdx = Math.max(0, Math.min(TOTAL_HAND_FRAMES - 1, Math.round(handCurrentFrameFloat)));

      // Speculative neighbor prefetch around current scrubber index
      if (!handLoaded[desiredIdx]) {
        loadHandFrame(desiredIdx);
      }
      for (let s = 1; s <= 4; s++) {
        if (desiredIdx + s < TOTAL_HAND_FRAMES && !handLoaded[desiredIdx + s]) loadHandFrame(desiredIdx + s);
        if (desiredIdx - s >= 0 && !handLoaded[desiredIdx - s]) loadHandFrame(desiredIdx - s);
      }

      let frameToDraw = null;
      if (handLoaded[desiredIdx] && handFrames[desiredIdx]) {
        frameToDraw = handFrames[desiredIdx];
      } else {
        // Nearest-neighbor fallback search so canvas is never blank
        for (let d = 1; d < TOTAL_HAND_FRAMES; d++) {
          const prev = desiredIdx - d;
          const next = desiredIdx + d;
          if (prev >= 0 && handLoaded[prev] && handFrames[prev]) {
            frameToDraw = handFrames[prev];
            break;
          }
          if (next < TOTAL_HAND_FRAMES && handLoaded[next] && handFrames[next]) {
            frameToDraw = handFrames[next];
            break;
          }
        }
      }

      if (frameToDraw) {
        drawHandCover(frameToDraw);
      }
    }

    function loadHandFrame(idx) {
      if (idx < 0 || idx >= TOTAL_HAND_FRAMES) return Promise.resolve(null);
      if (handFrames[idx]) return Promise.resolve(handFrames[idx]);
      if (handLoadingPromises.has(idx)) return handLoadingPromises.get(idx);

      const p = new Promise((resolve) => {
        const img = new Image();
        img.src = getHandFramePath(idx);
        img.onload = () => {
          handFrames[idx] = img;
          handLoaded[idx] = true;
          handLoadingPromises.delete(idx);
          if (isHandVisible || !initialHandRendered) {
            initialHandRendered = true;
            renderHandFrame();
          } else {
            const curIdx = Math.round(handCurrentFrameFloat);
            if (Math.abs(curIdx - idx) <= 2) {
              renderHandFrame();
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          handLoadingPromises.delete(idx);
          resolve(null);
        };
      });

      handLoadingPromises.set(idx, p);
      return p;
    }

    async function preloadHandSequence() {
      // 1. Immediate priority: First frame painted instantly so canvas is never blank
      await loadHandFrame(0);
      if (!initialHandRendered) {
        initialHandRendered = true;
        resizeHandCanvas();
        renderHandFrame();
      }

      // 2. Preload keyframes spaced every 4 frames
      const keyframes = [];
      for (let i = 2; i < TOTAL_HAND_FRAMES; i += 4) {
        keyframes.push(i);
      }
      if (!keyframes.includes(TOTAL_HAND_FRAMES - 1)) {
        keyframes.push(TOTAL_HAND_FRAMES - 1);
      }

      for (let i = 0; i < keyframes.length; i += 6) {
        const chunk = keyframes.slice(i, i + 6);
        chunk.forEach(loadHandFrame);
        await new Promise((r) => setTimeout(r, 35));
      }
    }

    function updateHandProgress(e) {
      const scrollY = (e && typeof e.scroll === 'number') ? e.scroll : (window.lenis && typeof window.lenis.scroll === 'number' ? window.lenis.scroll : window.scrollY);
      const winH = window.innerHeight;

      const tRect = techSection.getBoundingClientRect();
      const testRect = testimonialsSection.getBoundingClientRect();
      const techTop = tRect.top + scrollY;
      const testiBottom = testRect.bottom + scrollY;

      // Range where Hand animation is active:
      // Fade in starts when Section 10 (Tech Ecosystem) is coming into view
      const fadeInStart = Math.max(0, techTop - winH);
      const fadeInEnd = techTop;
      // Fade out starts when reaching the bottom of Section 12 (Testimonials)
      const fadeOutStart = Math.max(techTop, testiBottom - winH);
      const fadeOutEnd = testiBottom;

      const wasVisible = isHandVisible;

      if (scrollY < fadeInStart) {
        handViewport.style.opacity = '0';
        handViewport.style.visibility = 'hidden';
        isHandVisible = false;
        hasDrawnHandVisible = false;
      } else if (scrollY >= fadeInStart && scrollY < fadeInEnd) {
        const ratio = (scrollY - fadeInStart) / (fadeInEnd - fadeInStart);
        handViewport.style.opacity = String(Math.max(0, Math.min(1, ratio)));
        handViewport.style.visibility = 'visible';
        isHandVisible = true;
      } else if (scrollY >= fadeInEnd && scrollY <= fadeOutStart) {
        handViewport.style.opacity = '1';
        handViewport.style.visibility = 'visible';
        isHandVisible = true;
      } else if (scrollY > fadeOutStart && scrollY < fadeOutEnd) {
        const ratio = 1 - (scrollY - fadeOutStart) / (fadeOutEnd - fadeOutStart);
        handViewport.style.opacity = String(Math.max(0, Math.min(1, ratio)));
        handViewport.style.visibility = 'visible';
        isHandVisible = true;
      } else {
        handViewport.style.opacity = '0';
        handViewport.style.visibility = 'hidden';
        isHandVisible = false;
        hasDrawnHandVisible = false;
      }

      // Compute frame progression across the 3 sections (Tech Ecosystem, AI Future, Testimonials)
      const scrubRange = Math.max(1, fadeOutStart - techTop);
      const progress = Math.min(1, Math.max(0, (scrollY - techTop) / scrubRange));
      handTargetFrameFloat = progress * (TOTAL_HAND_FRAMES - 1);

      // Render immediately upon entering visibility or if canvas hasn't drawn
      if (isHandVisible && (!wasVisible || !hasDrawnHandVisible)) {
        renderHandFrame();
      }
    }

    function handAnimLoop() {
      if (isHandVisible) {
        const diff = handTargetFrameFloat - handCurrentFrameFloat;
        if (Math.abs(diff) > 0.001) {
          handCurrentFrameFloat += diff * 0.2;
          renderHandFrame();
        } else if (!hasDrawnHandVisible) {
          renderHandFrame();
        }
      }
      requestAnimationFrame(handAnimLoop);
    }

    window.addEventListener('scroll', updateHandProgress, { passive: true });
    if (lenisInstance) {
      lenisInstance.on('scroll', updateHandProgress);
    }

    resizeHandCanvas();
    updateHandProgress();
    preloadHandSequence();
    requestAnimationFrame(handAnimLoop);
  }

  // ==========================================================================
  // 4F. RADIO SCROLL-DOWN CANVAS SCRUBBER (200 FRAMES ACROSS SECTIONS 13 TO 15)
  // (13 - ESTIMATOR, 14 - CONTACT, 15 - FOOTER)
  // ==========================================================================
  const radioCanvas = document.getElementById('radio-canvas');
  const radioViewport = document.getElementById('radio-bg-viewport');
  const estimatorSection = document.getElementById('estimator');
  const contactSection = document.getElementById('contact');
  const footerSection = document.getElementById('footer') || document.querySelector('.site-footer');

  if (radioCanvas && radioViewport && estimatorSection && footerSection) {
    const radioCtx = radioCanvas.getContext('2d', { alpha: false });
    const TOTAL_RADIO_FRAMES = 200;
    const radioFrames = new Array(TOTAL_RADIO_FRAMES);
    const radioLoaded = new Array(TOTAL_RADIO_FRAMES).fill(false);
    const radioLoadingPromises = new Map();
    let radioTargetFrameFloat = 0;
    let radioCurrentFrameFloat = 0;
    let isRadioVisible = false;
    let initialRadioRendered = false;
    let hasDrawnRadioVisible = false;

    function getRadioFramePath(idx) {
      const padded = String(idx + 1).padStart(3, '0');
      return `radio/ezgif-frame-${padded}.webp`;
    }

    let rW = (radioCanvas.width = window.innerWidth);
    let rH = (radioCanvas.height = window.innerHeight);

    function resizeRadioCanvas() {
      rW = radioCanvas.width = window.innerWidth;
      rH = radioCanvas.height = window.innerHeight;
      renderRadioFrame();
    }
    window.addEventListener('resize', resizeRadioCanvas);

    function drawRadioCover(img) {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const iW = img.naturalWidth;
      const iH = img.naturalHeight;
      const scale = Math.max(rW / iW, rH / iH);
      const dW = iW * scale;
      const dH = iH * scale;
      const oX = (rW - dW) / 2;
      const oY = (rH - dH) / 2;
      radioCtx.drawImage(img, oX, oY, dW, dH);
      hasDrawnRadioVisible = true;
    }

    function renderRadioFrame() {
      const desiredIdx = Math.max(0, Math.min(TOTAL_RADIO_FRAMES - 1, Math.round(radioCurrentFrameFloat)));

      // Speculative neighbor prefetch around current scrubber index
      if (!radioLoaded[desiredIdx]) {
        loadRadioFrame(desiredIdx);
      }
      for (let s = 1; s <= 4; s++) {
        if (desiredIdx + s < TOTAL_RADIO_FRAMES && !radioLoaded[desiredIdx + s]) loadRadioFrame(desiredIdx + s);
        if (desiredIdx - s >= 0 && !radioLoaded[desiredIdx - s]) loadRadioFrame(desiredIdx - s);
      }

      let frameToDraw = null;
      if (radioLoaded[desiredIdx] && radioFrames[desiredIdx]) {
        frameToDraw = radioFrames[desiredIdx];
      } else {
        // Nearest-neighbor fallback search so canvas is never blank
        for (let d = 1; d < TOTAL_RADIO_FRAMES; d++) {
          const prev = desiredIdx - d;
          const next = desiredIdx + d;
          if (prev >= 0 && radioLoaded[prev] && radioFrames[prev]) {
            frameToDraw = radioFrames[prev];
            break;
          }
          if (next < TOTAL_RADIO_FRAMES && radioLoaded[next] && radioFrames[next]) {
            frameToDraw = radioFrames[next];
            break;
          }
        }
      }

      if (frameToDraw) {
        drawRadioCover(frameToDraw);
      }
    }

    function loadRadioFrame(idx) {
      if (idx < 0 || idx >= TOTAL_RADIO_FRAMES) return Promise.resolve(null);
      if (radioFrames[idx]) return Promise.resolve(radioFrames[idx]);
      if (radioLoadingPromises.has(idx)) return radioLoadingPromises.get(idx);

      const p = new Promise((resolve) => {
        const img = new Image();
        img.src = getRadioFramePath(idx);
        img.onload = () => {
          radioFrames[idx] = img;
          radioLoaded[idx] = true;
          radioLoadingPromises.delete(idx);
          if (isRadioVisible || !initialRadioRendered) {
            initialRadioRendered = true;
            renderRadioFrame();
          } else {
            const curIdx = Math.round(radioCurrentFrameFloat);
            if (Math.abs(curIdx - idx) <= 2) {
              renderRadioFrame();
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          radioLoadingPromises.delete(idx);
          resolve(null);
        };
      });

      radioLoadingPromises.set(idx, p);
      return p;
    }

    async function preloadRadioSequence() {
      // 1. Immediate priority: First frame painted instantly so canvas is never blank
      await loadRadioFrame(0);
      if (!initialRadioRendered) {
        initialRadioRendered = true;
        resizeRadioCanvas();
        renderRadioFrame();
      }

      // 2. Preload keyframes spaced every 4 frames
      const keyframes = [];
      for (let i = 2; i < TOTAL_RADIO_FRAMES; i += 4) {
        keyframes.push(i);
      }
      if (!keyframes.includes(TOTAL_RADIO_FRAMES - 1)) {
        keyframes.push(TOTAL_RADIO_FRAMES - 1);
      }

      for (let i = 0; i < keyframes.length; i += 6) {
        const chunk = keyframes.slice(i, i + 6);
        chunk.forEach(loadRadioFrame);
        await new Promise((r) => setTimeout(r, 35));
      }
    }

    function updateRadioProgress(e) {
      const scrollY = (e && typeof e.scroll === 'number') ? e.scroll : (window.lenis && typeof window.lenis.scroll === 'number' ? window.lenis.scroll : window.scrollY);
      const winH = window.innerHeight;

      const estRect = estimatorSection.getBoundingClientRect();
      const footRect = footerSection.getBoundingClientRect();
      const estimatorTop = estRect.top + scrollY;
      const footerBottom = footRect.bottom + scrollY;

      // Range where Radio animation is active:
      // Fade in starts when Section 13 (Estimator) is coming into view
      const fadeInStart = Math.max(0, estimatorTop - winH);
      const fadeInEnd = estimatorTop;
      const maxScroll = Math.max(estimatorTop, footerBottom - winH);

      const wasVisible = isRadioVisible;

      if (scrollY < fadeInStart) {
        radioViewport.style.opacity = '0';
        radioViewport.style.visibility = 'hidden';
        isRadioVisible = false;
        hasDrawnRadioVisible = false;
      } else if (scrollY >= fadeInStart && scrollY < fadeInEnd) {
        const ratio = (scrollY - fadeInStart) / (fadeInEnd - fadeInStart);
        radioViewport.style.opacity = String(Math.max(0, Math.min(1, ratio)));
        radioViewport.style.visibility = 'visible';
        isRadioVisible = true;
      } else {
        // Active and fully visible across Section 13 (Estimator), Section 14 (Contact), Section 15 (Footer)
        radioViewport.style.opacity = '1';
        radioViewport.style.visibility = 'visible';
        isRadioVisible = true;
      }

      // Compute frame progression across the final 3 sections (Estimator, Contact, Footer)
      const scrubRange = Math.max(1, maxScroll - estimatorTop);
      const progress = Math.min(1, Math.max(0, (scrollY - estimatorTop) / scrubRange));
      radioTargetFrameFloat = progress * (TOTAL_RADIO_FRAMES - 1);

      // Render immediately upon entering visibility or if canvas hasn't drawn
      if (isRadioVisible && (!wasVisible || !hasDrawnRadioVisible)) {
        renderRadioFrame();
      }
    }

    function radioAnimLoop() {
      if (isRadioVisible) {
        const diff = radioTargetFrameFloat - radioCurrentFrameFloat;
        if (Math.abs(diff) > 0.001) {
          radioCurrentFrameFloat += diff * 0.2;
          renderRadioFrame();
        } else if (!hasDrawnRadioVisible) {
          renderRadioFrame();
        }
      }
      requestAnimationFrame(radioAnimLoop);
    }

    window.addEventListener('scroll', updateRadioProgress, { passive: true });
    if (lenisInstance) {
      lenisInstance.on('scroll', updateRadioProgress);
    }

    resizeRadioCanvas();
    updateRadioProgress();
    preloadRadioSequence();
    requestAnimationFrame(radioAnimLoop);
  }

  // ==========================================================================
  // 5. FLOATING HEADER & MOBILE DRAWER (Section 5)
  // ==========================================================================
  const siteHeader = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (siteHeader) {
      if (currentScrollY > 80) {
        siteHeader.classList.add('header-scrolled');
      } else {
        siteHeader.classList.remove('header-scrolled');
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        siteHeader.classList.add('header-hidden');
      } else {
        siteHeader.classList.remove('header-hidden');
      }
    }
    lastScrollY = currentScrollY;
  }, { passive: true });

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileDrawer.querySelectorAll('.mobile-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active Navigation Dot Highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header-nav .nav-item');

  window.addEventListener('scroll', () => {
    let currentId = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 180;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('data-nav') === currentId) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // ==========================================================================
  // 6. HERO 3D EXPERIENCE: THREE.JS METALLIC RIYADVI EMBLEM (Sections 7 & 8)
  // ==========================================================================
  const heroCanvas = document.getElementById('hero-webgl-canvas');
  if (heroCanvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      canvas: heroCanvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Lighting (Section 7)
    const ambientLight = new THREE.AmbientLight(0x111111, 1.5);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.PointLight(0xF4D36B, 4.5, 60);
    goldKeyLight.position.set(10, 12, 15);
    scene.add(goldKeyLight);

    const champagneFillLight = new THREE.PointLight(0xE8C875, 3.0, 50);
    champagneFillLight.position.set(-12, -8, 12);
    scene.add(champagneFillLight);

    const cyanEdgeLight = new THREE.PointLight(0x00FFCC, 2.0, 40);
    cyanEdgeLight.position.set(0, -10, -5);
    scene.add(cyanEdgeLight);

    // Create 3D Metallic Riyadvi Emblem Group
    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);

    // Metallic Gold Material
    const metallicGoldMat = new THREE.MeshStandardMaterial({
      color: 0xF4D36B,
      metalness: 0.95,
      roughness: 0.22,
      emissive: 0x332200,
      emissiveIntensity: 0.15
    });

    const darkCoreMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.8,
      roughness: 0.3
    });

    // Outer Geometric Ring
    const ringGeo = new THREE.TorusGeometry(4.8, 0.28, 16, 64);
    const ringMesh = new THREE.Mesh(ringGeo, metallicGoldMat);
    emblemGroup.add(ringMesh);

    // Inner Concentric Ring
    const innerRingGeo = new THREE.TorusGeometry(3.6, 0.14, 16, 48);
    const innerRingMesh = new THREE.Mesh(innerRingGeo, metallicGoldMat);
    emblemGroup.add(innerRingMesh);

    // Central Metallic Riyadvi Logo Plates (Section 7)
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('assets/riyadvilogo.png', (logoTex) => {
      logoTex.generateMipmaps = true;
      logoTex.minFilter = THREE.LinearMipmapLinearFilter;
      
      const logoMat = new THREE.MeshStandardMaterial({
        map: logoTex,
        transparent: true,
        alphaTest: 0.05,
        roughness: 0.18,
        metalness: 0.95,
        emissive: 0x443300,
        emissiveIntensity: 0.25,
        side: THREE.DoubleSide
      });

      const logoGeo = new THREE.PlaneGeometry(5.2, 5.2);
      const frontLogo = new THREE.Mesh(logoGeo, logoMat);
      frontLogo.position.z = 0.18;
      emblemGroup.add(frontLogo);

      const backLogo = new THREE.Mesh(logoGeo, logoMat);
      backLogo.position.z = -0.18;
      backLogo.rotation.y = Math.PI;
      emblemGroup.add(backLogo);
    });

    // Floating Geometric Satellites
    const satelliteMat = new THREE.MeshStandardMaterial({
      color: 0xE8C875,
      metalness: 0.9,
      roughness: 0.2
    });

    const satellites = [];
    for (let i = 0; i < 4; i++) {
      const satGeo = new THREE.TetrahedronGeometry(0.55);
      const satMesh = new THREE.Mesh(satGeo, satelliteMat);
      const angle = (i / 4) * Math.PI * 2;
      satMesh.position.set(Math.cos(angle) * 4.8, Math.sin(angle) * 4.8, 0);
      emblemGroup.add(satMesh);
      satellites.push({ mesh: satMesh, angle: angle });
    }

    // Floating Golden Particle Field
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 45;
      particlePositions[i + 1] = (Math.random() - 0.5) * 45;
      particlePositions[i + 2] = (Math.random() - 0.5) * 35;
    }
    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0xF4D36B,
      size: 0.12,
      transparent: true,
      opacity: 0.75
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Digital Grid Plane at Bottom (Section 7)
    const gridHelper = new THREE.GridHelper(60, 40, 0xD4AF37, 0x222222);
    gridHelper.position.y = -8;
    gridHelper.position.z = -5;
    gridHelper.visible = false;
    scene.add(gridHelper);

    // Keep emblem group hidden in hero so the waterfall takes center stage like Spotlight reference
    emblemGroup.visible = false;

    // Mouse Movement Parallax (Section 8)
    let targetRotX = 0, targetRotY = 0;
    let targetPosX = window.innerWidth > 1024 ? 4.8 : 0;
    let targetPosY = 0;

    window.addEventListener('mousemove', (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      targetRotY = normX * 0.45;
      targetRotX = -normY * 0.35;

      goldKeyLight.position.x = 10 + normX * 6;
      goldKeyLight.position.y = 12 + normY * 6;
    });

    // Resize Handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      targetPosX = window.innerWidth > 1024 ? 4.8 : 0;
    });

    // Render Loop
    let clock = new THREE.Clock();
    function animateHero3D() {
      requestAnimationFrame(animateHero3D);
      const elapsed = clock.getElapsedTime();

      // Floating oscillation
      emblemGroup.position.y = targetPosY + Math.sin(elapsed * 1.2) * 0.3;
      emblemGroup.position.x = targetPosX;

      // Smooth rotation with mouse lerp
      emblemGroup.rotation.y += (targetRotY - emblemGroup.rotation.y) * 0.05 + 0.003;
      emblemGroup.rotation.x += (targetRotX - emblemGroup.rotation.x) * 0.05;

      // Rotate satellites
      satellites.forEach((sat, idx) => {
        sat.angle += 0.015;
        sat.mesh.position.x = Math.cos(sat.angle) * 4.8;
        sat.mesh.position.y = Math.sin(sat.angle) * 4.8;
        sat.mesh.rotation.x += 0.02;
        sat.mesh.rotation.y += 0.02;
      });

      // Slowly rotate particle field
      particleSystem.rotation.y = elapsed * 0.02;

      // Scroll-based camera translation (Section 8)
      const scrollY = window.scrollY;
      emblemGroup.position.z = -scrollY * 0.018;
      camera.position.y = -scrollY * 0.004;

      renderer.render(scene, camera);
    }
    animateHero3D();
  }

  // ==========================================================================
  // 7. ANIMATED STATISTIC COUNTERS (Section 9)
  // ==========================================================================
  const counters = document.querySelectorAll('.counter-val');
  let countersAnimated = false;

  function runCounters() {
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      if (!target) return;
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 45));

      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          counter.textContent = `${target}+`;
          clearInterval(timer);
        } else {
          counter.textContent = `${count}+`;
        }
      }, 35);
    });
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          runCounters();
        }
      });
    },
    { threshold: 0.3 }
  );

  const heroStatsBlock = document.querySelector('.hero-verified-metrics-row');
  if (heroStatsBlock) counterObserver.observe(heroStatsBlock);

  // ==========================================================================
  // 8. DIGITAL CAPABILITY CONSOLE (Sections 12 & 13)
  // ==========================================================================
  const capabilitiesData = {
    web: {
      idx: '01',
      title: 'Web Development',
      tag: 'CAPABILITY // 01 • FULL-STACK WEB ARCHITECTURE',
      desc: 'Ultra-responsive full-stack web applications, Server Components, Headless architectures, and lightning-fast APIs engineered for high-concurrency enterprise workloads.',
      tech: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
      workflow: ['Strategy', 'UX', 'UI', 'Development', 'Testing', 'Deployment', 'Optimization', 'Maintenance'],
      modalHtml: `
        <h3 id="service-modal-title" style="font-family: var(--font-display); font-size: 26px; color: var(--gold-bright); margin-bottom: 12px;">Web Development Architecture</h3>
        <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 14px;">Our engineering framework for high-throughput, enterprise web applications and modern headless platforms.</p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: 12px; padding: 18px; margin-bottom: 20px;">
          <h4 style="color: var(--text-white); font-size: 15px; margin-bottom: 10px;">End-to-End Engineering Lifecycle:</h4>
          <ol style="color: #CCCCCC; padding-left: 20px; font-size: 13px; line-height: 1.8;">
            <li><strong>Strategy:</strong> Architectural planning, SLA benchmarking, and system topology.</li>
            <li><strong>UX:</strong> Information architecture, user flows, and wireframe prototypes.</li>
            <li><strong>UI:</strong> High-fidelity spatial design, accessible component design systems.</li>
            <li><strong>Development:</strong> Next.js Server Components, strict TypeScript, modular REST/GraphQL APIs.</li>
            <li><strong>Testing:</strong> Automated CI/CD unit testing, end-to-end Cypress audits.</li>
            <li><strong>Deployment:</strong> Containerized Docker clusters on AWS / Vercel Edge.</li>
            <li><strong>Optimization:</strong> Sub-second LCP caching, asset compression, dynamic tree-shaking.</li>
            <li><strong>Maintenance:</strong> 24/7 proactive incident response, zero downtime rolling updates.</li>
          </ol>
        </div>
        <a href="#contact" class="btn-primary-gold" onclick="closeModals()">INITIATE WEB PROJECT</a>
      `
    },
    mobile: {
      idx: '02',
      title: 'Mobile App Development',
      tag: 'CAPABILITY // 02 • NATIVE & CROSS-PLATFORM MOBILE',
      desc: 'Intuitive native iOS and Android experiences built with hardware acceleration, offline caching, and biometric enterprise security.',
      tech: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Firebase'],
      workflow: ['Discovery', 'Mobile UX', 'Design System', 'Native Build', 'TestFlight QA', 'Store Release', 'ASO', 'SLA Support'],
      modalHtml: `
        <h3 id="service-modal-title" style="font-family: var(--font-display); font-size: 26px; color: var(--gold-bright); margin-bottom: 12px;">Mobile Application Engineering</h3>
        <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 14px;">High-performance iOS and Android applications published globally with 99.9% crash-free sessions.</p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: 12px; padding: 18px; margin-bottom: 20px;">
          <h4 style="color: var(--text-white); font-size: 15px; margin-bottom: 10px;">Core Capabilities:</h4>
          <ul style="color: #CCCCCC; padding-left: 20px; font-size: 13px; line-height: 1.8;">
            <li>Cross-platform React Native & Flutter architectures sharing 90%+ code.</li>
            <li>Offline-first SQLite/WatermelonDB data synchronization.</li>
            <li>Native biometric authentication and secure enclave credential storage.</li>
            <li>Instant push notifications, deep linking, and automated App Store deployment.</li>
          </ul>
        </div>
        <a href="#contact" class="btn-primary-gold" onclick="closeModals()">INITIATE MOBILE APP</a>
      `
    },
    marketing: {
      idx: '03',
      title: 'Digital Marketing & Growth',
      tag: 'CAPABILITY // 03 • FULL-FUNNEL PERFORMANCE MARKETING',
      desc: 'High-ROI multi-channel performance advertising, Meta & Google Ads optimization, and precision conversion attribution.',
      tech: ['Google Ads', 'Meta Ads', 'GA4 Telemetry', 'UTM Tracking', 'HubSpot CRM', 'LeadSquared'],
      workflow: ['Audience Audit', 'Funnel Strategy', 'Creative Sprints', 'Campaign Setup', 'A/B Testing', 'CPA Scaling', 'LTV Expansion'],
      modalHtml: `
        <h3 id="service-modal-title" style="font-family: var(--font-display); font-size: 26px; color: var(--gold-bright); margin-bottom: 12px;">Performance Digital Marketing</h3>
        <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 14px;">Full-funnel customer acquisition with verified commercial attribution and sub-second CRM dispatch.</p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: 12px; padding: 18px; margin-bottom: 20px;">
          <h4 style="color: var(--text-white); font-size: 15px; margin-bottom: 10px;">Growth Deliverables:</h4>
          <ul style="color: #CCCCCC; padding-left: 20px; font-size: 13px; line-height: 1.8;">
            <li>High-intent Search Ads & Dynamic Product Ads on Google & Meta.</li>
            <li>Conversion Rate Optimization (CRO) on dedicated landing funnels.</li>
            <li>WhatsApp click-to-chat automation capturing qualified leads instantly.</li>
          </ul>
        </div>
        <a href="#contact" class="btn-primary-gold" onclick="closeModals()">SCHEDULE CAMPAIGN BRIEFING</a>
      `
    },
    design: {
      idx: '04',
      title: 'UI/UX Design Systems',
      tag: 'CAPABILITY // 04 • SPATIAL & LUXURY PRODUCT DESIGN',
      desc: 'Luxury human-centric interfaces, atomic design tokens, interactive WebGL prototypes, and behavioral engagement studies.',
      tech: ['Figma', 'Design Systems', 'Micro-Interactions', 'Spatial UX', 'Prototyping'],
      workflow: ['User Research', 'Information Arch', 'Wireframes', 'Design Tokens', 'Interactive Prototyping', 'Handoff'],
      modalHtml: `
        <h3 id="service-modal-title" style="font-family: var(--font-display); font-size: 26px; color: var(--gold-bright); margin-bottom: 12px;">UI/UX Design & Spatial Systems</h3>
        <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 14px;">Bespoke interfaces created to communicate authority, elegance, and effortless user flow.</p>
        <a href="#contact" class="btn-primary-gold" onclick="closeModals()">REQUEST DESIGN PROPOSAL</a>
      `
    },
    ecommerce: {
      idx: '05',
      title: 'E-Commerce Platforms',
      tag: 'CAPABILITY // 05 • HIGH-CONVERSION STOREFRONTS',
      desc: 'Scalable global storefronts with seamless payment gateways, automated subscriptions, cart optimization, and ERP inventory syncing.',
      tech: ['WooCommerce', 'Shopify Plus', 'Next.js Commerce', 'Stripe', 'Headless API'],
      workflow: ['Catalog Architecture', 'Checkout Flow', 'Payment Gateways', 'ERP Integration', 'Load Testing', 'Go-Live'],
      modalHtml: `
        <h3 id="service-modal-title" style="font-family: var(--font-display); font-size: 26px; color: var(--gold-bright); margin-bottom: 12px;">Enterprise E-Commerce Platforms</h3>
        <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 14px;">Powering multi-currency, high-volume retail stores with sub-second checkout speeds.</p>
        <a href="#contact" class="btn-primary-gold" onclick="closeModals()">LAUNCH E-COMMERCE</a>
      `
    },
    '3d': {
      idx: '06',
      title: '3D Modeling & WebGL',
      tag: 'CAPABILITY // 06 • IN-BROWSER 3D EXPERIENCES',
      desc: 'Interactive in-browser 3D product configurations, metallic material shaders, and cinematic brand digital universes.',
      tech: ['Three.js', 'WebGL', 'GLSL Shaders', 'Blender', '3D Optimizations'],
      workflow: ['3D Asset Prep', 'Shader Programming', 'Lighting Rig', 'Camera Controls', 'FPS Tuning', 'Production Embed'],
      modalHtml: `
        <h3 id="service-modal-title" style="font-family: var(--font-display); font-size: 26px; color: var(--gold-bright); margin-bottom: 12px;">3D WebGL & Spatial Interactive Solutions</h3>
        <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 14px;">Creating captivating web experiences where visitors explore 3D products directly in their browsers.</p>
        <a href="#contact" class="btn-primary-gold" onclick="closeModals()">COMMISSION 3D WORK</a>
      `
    },
    arvr: {
      idx: '07',
      title: 'AR/VR Spatial Computing',
      tag: 'CAPABILITY // 07 • IMMERSIVE SPATIAL EXPERIENCES',
      desc: 'Zero-install WebXR walkthroughs, architectural spatial visualizers, and mobile augmented reality customer experiences.',
      tech: ['WebXR', 'ARKit', 'ARCore', 'Three.js', 'Spatial UI'],
      workflow: ['Spatial Model Prep', 'Anchoring Geometry', 'Lighting Calibration', 'User Testing', 'Cloud Deployment'],
      modalHtml: `
        <h3 id="service-modal-title" style="font-family: var(--font-display); font-size: 26px; color: var(--gold-bright); margin-bottom: 12px;">AR/VR Spatial Computing</h3>
        <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 14px;">Enabling real estate, luxury retail, and engineering clients to preview digital twins in physical spaces.</p>
        <a href="#contact" class="btn-primary-gold" onclick="closeModals()">EXPLORE AR/VR</a>
      `
    },
    custom: {
      idx: '08',
      title: 'Custom Enterprise Software',
      tag: 'CAPABILITY // 08 • BESPOKE CLOUD ARCHITECTURES',
      desc: 'Tailored enterprise systems, API ecosystems, automated business workflows, and robust cloud microservices.',
      tech: ['Node.js', 'TypeScript', 'Docker', 'AWS Cloud', 'PostgreSQL', 'Redis'],
      workflow: ['Architecture Audit', 'Schema Design', 'Microservice Build', 'Security Hardening', 'SLA Deployment'],
      modalHtml: `
        <h3 id="service-modal-title" style="font-family: var(--font-display); font-size: 26px; color: var(--gold-bright); margin-bottom: 12px;">Custom Enterprise Software</h3>
        <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 14px;">Robust software engineered to resolve complex institutional bottlenecks and automate operations.</p>
        <a href="#contact" class="btn-primary-gold" onclick="closeModals()">DISCUSS CUSTOM SYSTEM</a>
      `
    },
    wordpress: {
      idx: '09',
      title: 'WordPress / WooCommerce',
      tag: 'CAPABILITY // 09 • TECHBEHEMOTHS 2025 AWARD-WINNING',
      desc: 'Bespoke high-performance WordPress architectures, custom Gutenberg blocks, and scalable WooCommerce storefronts.',
      tech: ['WordPress', 'WooCommerce', 'PHP 8.3', 'REST API', 'Redis Cache'],
      workflow: ['Theme Engineering', 'Block System', 'Database Tuning', 'Security Lockdown', 'Launch'],
      modalHtml: `
        <h3 id="service-modal-title" style="font-family: var(--font-display); font-size: 26px; color: var(--gold-bright); margin-bottom: 12px;">Award-Winning WordPress Engineering</h3>
        <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 14px;">Recognized globally at TechBehemoths Awards 2025 in Berlin for exceptional WordPress and WooCommerce solutions.</p>
        <a href="#contact" class="btn-primary-gold" onclick="closeModals()">UPGRADE WORDPRESS</a>
      `
    },
    seo: {
      idx: '10',
      title: 'SEO & Social Media Marketing',
      tag: 'CAPABILITY // 10 • ORGANIC SEARCH SUPREMACY',
      desc: 'Technical organic search supremacy, schema structured data, social media management, and sustained ranking growth.',
      tech: ['Technical SEO', 'JSON-LD Schema', 'Content Marketing', 'Meta Graph', 'Core Web Vitals'],
      workflow: ['Technical Audit', 'Schema Inject', 'Speed Tuning', 'Content Clustering', 'Monthly Telemetry'],
      modalHtml: `
        <h3 id="service-modal-title" style="font-family: var(--font-display); font-size: 26px; color: var(--gold-bright); margin-bottom: 12px;">SEO & Social Media Marketing</h3>
        <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 14px;">Dominating Google search results and building brand authority with high-converting social campaigns.</p>
        <a href="#contact" class="btn-primary-gold" onclick="closeModals()">AUDIT MY SEARCH RANKINGS</a>
      `
    }
  };

  const glyphMap = {
    web: '&lt;/&gt;',
    mobile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="30" height="30"><rect x="5" y="2" width="14" height="20" rx="3"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    marketing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="30" height="30"><path d="M3 11l18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
    design: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="30" height="30"><path d="M12 2C6.49 2 2 6.49 2 12a10 10 0 0 0 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.2-.64-1.67-.43-.49-.66-1.13-.66-1.83 0-1.38 1.12-2.5 2.5-2.5h1.9c3.31 0 6-2.69 6-6 0-5.51-4.49-9.5-9.6-9.5z"/><circle cx="7.5" cy="11.5" r="1.5"/><circle cx="10.5" cy="7.5" r="1.5"/><circle cx="14.5" cy="7.5" r="1.5"/><circle cx="17.5" cy="11.5" r="1.5"/></svg>',
    ecommerce: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="30" height="30"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    '3d': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="30" height="30"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    arvr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="30" height="30"><path d="M3 11a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-2.5a2 2 0 0 1-1.6-.8L12 14.8l-1.9 2.4a2 2 0 0 1-1.6.8H6a3 3 0 0 1-3-3v-4z"/><circle cx="8" cy="12" r="1.5"/><circle cx="16" cy="12" r="1.5"/></svg>',
    custom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="30" height="30"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    wordpress: '<svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.73-1.49l3.9-10.7 2.45 6.72a4.4 4.4 0 0 0-.15.82 2.62 2.62 0 0 0 .15.82l-1.62 3.83zm5.7-5.3a8.1 8.1 0 0 1-1.07 3.32l-2.47-7.23c.38-.02.72-.05.72-.05a.43.43 0 0 0 .38-.45.43.43 0 0 0-.45-.42s-1.12.09-1.84.09c-.68 0-1.81-.09-1.81-.09a.43.43 0 0 0-.44.42.43.43 0 0 0 .44.45s.32.03.67.05l1.01 2.78-2.6 7.74a8.15 8.15 0 0 1-4.66-3.86L9.4 8.78c-.37.02-.72.05-.72.05a.43.43 0 0 0-.38.45.43.43 0 0 0 .45.42s1.12-.09 1.83-.09c.7 0 1.82.09 1.82.09a.43.43 0 0 0 .44-.42.43.43 0 0 0-.44-.45s-.33-.03-.68-.05l-1.01-2.77 3.65 10.87zm-11.9-4.7a8.1 8.1 0 0 1 1.77-5.02L4.08 15.1A8.2 8.2 0 0 1 5.8 10.2zm6.2-6.4a8.17 8.17 0 0 1 5.58 2.24l-3.35 9.7-2.23-11.94z"/></svg>',
    seo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="30" height="30"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/><line x1="18" y1="20" x2="18" y2="16"/><line x1="12" y1="20" x2="12" y2="13"/><line x1="6" y1="20" x2="6" y2="17"/></svg>'
  };

  let activeCapKey = 'web';
  const cockpitBadge = document.getElementById('cockpit-badge');
  const cockpitTitle = document.getElementById('cockpit-title');
  const cockpitDesc = document.getElementById('cockpit-desc');
  const cockpitTech = document.getElementById('cockpit-tech');
  const cockpitGlyph = document.getElementById('cockpit-glyph');

  function updateCapabilityDisplay(key) {
    const data = capabilitiesData[key];
    if (!data) return;
    activeCapKey = key;

    // Synchronize all V-wing pills
    const allPills = document.querySelectorAll('.vwing-pill');
    allPills.forEach((pill) => {
      pill.classList.remove('active');
      pill.setAttribute('aria-selected', 'false');
      if (pill.getAttribute('data-cap') === key) {
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');
      }
    });

    if (cockpitBadge) {
      cockpitBadge.textContent = `${data.idx}. ${data.title.toUpperCase()}`;
    }
    if (cockpitTitle) {
      cockpitTitle.textContent = data.title;
    }
    if (cockpitDesc) {
      cockpitDesc.textContent = data.desc;
    }
    if (cockpitTech) {
      cockpitTech.innerHTML = data.tech
        .slice(0, 4)
        .map((t) => `<span class="vwing-tech-tag">${t}</span>`)
        .join('');
    }
    if (cockpitGlyph && glyphMap[key]) {
      cockpitGlyph.innerHTML = glyphMap[key];
    }

    const content = document.querySelector('.vwing-cockpit-content');
    if (content) {
      content.classList.remove('vwing-content-fade');
      void content.offsetWidth;
      content.classList.add('vwing-content-fade');
    }
  }

  const capKeys = ['web', 'mobile', 'marketing', 'design', 'ecommerce', '3d', 'arvr', 'custom', 'wordpress', 'seo'];

  window.prevCapability = function () {
    const idx = capKeys.indexOf(activeCapKey);
    const prevIdx = (idx - 1 + capKeys.length) % capKeys.length;
    updateCapabilityDisplay(capKeys[prevIdx]);
  };

  window.nextCapability = function () {
    const idx = capKeys.indexOf(activeCapKey);
    const nextIdx = (idx + 1) % capKeys.length;
    updateCapabilityDisplay(capKeys[nextIdx]);
  };

  // Attach click listeners to all capability pills
  function attachCapabilityListeners() {
    const allPills = document.querySelectorAll('.vwing-pill');
    allPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const cap = pill.getAttribute('data-cap');
        if (cap) updateCapabilityDisplay(cap);
      });
    });
  }

  attachCapabilityListeners();

  window.openCurrentServiceModal = function () {
    const data = capabilitiesData[activeCapKey];
    if (!data) return;
    const modal = document.getElementById('service-modal');
    const content = document.getElementById('service-modal-content');
    if (modal && content) {
      content.innerHTML = data.modalHtml;
      modal.classList.remove('hidden');
    }
  };

  // ==========================================================================
  // 9. RIYADVI GUARDIAN 3D SHIELD CANVAS (Sections 14 & 15)
  // ==========================================================================
  const guardianCanvas = document.getElementById('guardian-3d-canvas');
  if (guardianCanvas && typeof THREE !== 'undefined') {
    const gScene = new THREE.Scene();
    const gCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    gCamera.position.set(0, 0, 11);

    const gRenderer = new THREE.WebGLRenderer({
      canvas: guardianCanvas,
      alpha: true,
      antialias: true
    });
    gRenderer.setSize(440, 440);
    gRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    // Lighting
    const gAmb = new THREE.AmbientLight(0xFFFFFF, 1.8);
    gScene.add(gAmb);

    const gGoldLight = new THREE.PointLight(0xF4D36B, 6.0, 30);
    gGoldLight.position.set(4, 5, 8);
    gScene.add(gGoldLight);

    const gFrontLight = new THREE.PointLight(0xFFE58F, 3.5, 20);
    gFrontLight.position.set(0, 0, 7);
    gScene.add(gFrontLight);

    const gCyanLight = new THREE.PointLight(0x00FFCC, 2.0, 25);
    gCyanLight.position.set(-6, -4, 6);
    gScene.add(gCyanLight);

    const shieldGroup = new THREE.Group();
    gScene.add(shieldGroup);

    // Load Official Riyadvi "R" Emblem Texture
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load('assets/riyadvilogo.png');
    logoTexture.generateMipmaps = true;
    logoTexture.minFilter = THREE.LinearMipmapLinearFilter;
    logoTexture.magFilter = THREE.LinearFilter;

    // Glowing Frosted Glass Disc Backplate with Gold Bezel
    const discGeo = new THREE.CylinderGeometry(2.6, 2.6, 0.08, 64);
    discGeo.rotateX(Math.PI / 2);
    const discMat = new THREE.MeshStandardMaterial({
      color: 0x0A0A0A,
      roughness: 0.35,
      metalness: 0.8,
      transparent: true,
      opacity: 0.72
    });
    const discMesh = new THREE.Mesh(discGeo, discMat);
    shieldGroup.add(discMesh);

    const bezelGeo = new THREE.TorusGeometry(2.6, 0.06, 16, 64);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0xF4D36B,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x553C00,
      emissiveIntensity: 0.35
    });
    const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
    shieldGroup.add(bezelMesh);

    // Official Riyadvi "R" Logo Floating Emblem
    const logoGeo = new THREE.PlaneGeometry(4.4, 4.4);
    const logoMat = new THREE.MeshStandardMaterial({
      map: logoTexture,
      transparent: true,
      alphaTest: 0.02,
      roughness: 0.15,
      metalness: 0.75,
      emissive: 0xD4AF37,
      emissiveIntensity: 0.35,
      side: THREE.DoubleSide
    });
    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoMesh.position.z = 0.06;
    shieldGroup.add(logoMesh);

    // Concentric Telemetry Orbit Rings
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xD4AF37,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.04, 8, 48), ringMat);
    ring1.rotation.x = Math.PI * 0.4;
    shieldGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.04, 8, 48), ringMat);
    ring2.rotation.x = -Math.PI * 0.35;
    shieldGroup.add(ring2);

    function animateGuardian() {
      requestAnimationFrame(animateGuardian);
      const time = performance.now() * 0.001;

      shieldGroup.rotation.y = Math.sin(time * 0.8) * 0.25;
      shieldGroup.rotation.x = Math.cos(time * 0.6) * 0.15;
      shieldGroup.position.y = Math.sin(time * 1.5) * 0.15;

      ring1.rotation.z += 0.01;
      ring2.rotation.z -= 0.008;

      gRenderer.render(gScene, gCamera);
    }
    animateGuardian();
  }

  // Telemetry Sequence Steps highlight animation
  const chips = [
    document.getElementById('chip-1'),
    document.getElementById('chip-2'),
    document.getElementById('chip-3'),
    document.getElementById('chip-4'),
    document.getElementById('chip-5')
  ];
  let curChip = 0;
  setInterval(() => {
    chips.forEach((c) => c && c.classList.remove('active'));
    if (chips[curChip]) chips[curChip].classList.add('active');
    curChip = (curChip + 1) % chips.length;
  }, 2200);

  // ==========================================================================
  // 10. IMMERSIVE CASE STUDY MODAL (Section 19)
  // ==========================================================================
  const casesData = {
    studio11: {
      title: 'Studio 11 Salon & Spa — Multi-Location Booking & SMM Engine',
      client: 'Studio 11 Salon & Spa Chain',
      industry: 'Retail, Beauty & Wellness',
      challenge: 'Fragmented multi-city booking, slow phone scheduling, and low localized advertising conversion rates across 50+ franchise salons.',
      solution: 'Engineered a unified Next.js multi-location appointment engine with real-time stylist availability, SMS confirmations, and automated geo-targeted Meta performance campaigns.',
      technology: 'React, Next.js, Node.js, PostgreSQL, Twilio SMS API, Meta Ads Graph API',
      result: '+140% Increase in online bookings, 4.8/5 Verified Customer Rating, 2.8x ROAS on digital advertising campaigns.',
      duration: '8 Weeks to Production Launch'
    },
    puratap: {
      title: 'Puratap Australia — High-Performance Commerce & IoT Subscription',
      client: 'Puratap Water Filters Australia',
      industry: 'E-Commerce, Manufacturing & Smart IoT',
      challenge: 'Legacy eCommerce platform suffered 4+ second load times and lost filter cartridge repeat orders due to lack of automated subscription reminders.',
      solution: 'Built a sub-second headless commerce application integrated with Australian payment rails (Stripe, Afterpay) and an automated recurring filter replacement lifecycle system.',
      technology: 'Next.js, WooCommerce Headless, Node.js, Stripe, AWS Sydney Region',
      result: '+85% Increase in direct checkouts, <0.8s Page Load Speed, 99.98% Monitored Uptime across Australian mainland.',
      duration: '12 Weeks'
    },
    tng: {
      title: 'TNG Global Real Estate — Immersive 3D Property Showcase',
      client: 'TNG Global Developments',
      industry: 'Luxury Real Estate & Spatial Visualization',
      challenge: 'International property investors lacked realistic visualization of premium high-rise developments prior to physical construction completion.',
      solution: 'Developed an interactive WebGL 3D property explorer allowing investors to inspect floor plans, view angles, and finishings in real time with direct VIP consultation triggers.',
      technology: 'Three.js, WebGL, GLSL Shaders, React, HubSpot Enterprise CRM',
      result: '3.2x Higher lead inquiry conversion, 4.5 minutes average dwell time per prospect, 100% browser compatibility without plugins.',
      duration: '10 Weeks'
    }
  };

  window.openCaseModal = function (caseKey) {
    const data = casesData[caseKey];
    if (!data) return;
    const modal = document.getElementById('case-modal');
    const content = document.getElementById('case-modal-content');
    if (modal && content) {
      content.innerHTML = `
        <h3 id="case-modal-title" style="font-family: var(--font-display); font-size: 24px; color: var(--gold-bright); margin-bottom: 8px;">${data.title}</h3>
        <span style="font-family: var(--font-mono); font-size: 11px; color: var(--gold-champagne); letter-spacing: 1.5px; margin-bottom: 20px; display: block;">CLIENT: ${data.client} • ${data.industry}</span>
        
        <div style="display: flex; flex-direction: column; gap: 14px; font-size: 13px; line-height: 1.6; color: #CCCCCC; margin-bottom: 24px;">
          <div><strong style="color: var(--text-white);">The Challenge:</strong> ${data.challenge}</div>
          <div><strong style="color: var(--text-white);">The Solution:</strong> ${data.solution}</div>
          <div><strong style="color: var(--gold-bright);">Technology Stack:</strong> ${data.technology}</div>
          <div><strong style="color: #4ECCA3);">Commercial Result:</strong> ${data.result}</div>
          <div><strong style="color: var(--text-white);">Project Duration:</strong> ${data.duration}</div>
        </div>
        <a href="#contact" class="btn-primary-gold" onclick="closeModals()">REQUEST SIMILAR ARCHITECTURE</a>
      `;
      modal.classList.remove('hidden');
    }
  };

  // ==========================================================================
  // 10B. STORY SCROLL (FlowArt & FlowSection) FOR IMMERSIVE CASE STUDIES
  // ==========================================================================
  function initCaseStudiesStoryScroll() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const container = document.getElementById('story-scroll-main');
    if (!container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 900;
    if (reducedMotion) return;

    const sections = Array.from(container.querySelectorAll('[data-flow-section]'));
    if (sections.length === 0) return;

    sections.forEach((section, i) => {
      gsap.set(section, { zIndex: i + 1 });

      const inner = section.querySelector('.flow-art-container');
      if (!inner) return;

      if (i > 0) {
        gsap.set(inner, { rotation: 30, transformOrigin: 'bottom left' });
        gsap.to(inner, {
          rotation: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top 25%',
            scrub: true,
          },
        });
      }

      if (i < sections.length - 1) {
        ScrollTrigger.create({
          trigger: section,
          start: 'bottom bottom',
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
        });
      }
    });

    if (typeof lenisInstance !== 'undefined' && lenisInstance) {
      lenisInstance.on('scroll', () => ScrollTrigger.update());
    }

    ScrollTrigger.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCaseStudiesStoryScroll);
  } else {
    setTimeout(initCaseStudiesStoryScroll, 100);
  }

  // ==========================================================================
  // 11. INDUSTRIES EXPANDING STRIPS ACCORDION (08 — DOMAIN EXCELLENCE)
  // ==========================================================================
  const industriesStripsData = [
    {
      id: 'realestate',
      num: '01',
      name: 'Real Estate',
      tag: 'SECTOR FOCUS // REAL ESTATE',
      headline: 'High-Impact Spatial Visualization & Lead Capture',
      desc: 'From interactive WebGL 3D property tours to automated WhatsApp lead qualification funnels, we help real estate developers sell premium developments faster.',
      chips: [
        '3D Virtual Walkthroughs',
        'Interactive Floorplans',
        'CRM Sync (Salesforce, HubSpot, LeadSquared)',
        'Meta & Google Ad Funnels'
      ],
      stats: [
        { val: '3.2X', lbl: 'Lead Conversion Jump' },
        { val: '< 2s', lbl: 'Instant Brochure Delivery' },
        { val: '100%', lbl: 'GDPR / RERA Compliance' }
      ]
    },
    {
      id: 'healthcare',
      num: '02',
      name: 'Healthcare',
      tag: 'SECTOR FOCUS // HEALTHCARE & MEDTECH',
      headline: 'HIPAA-Compliant Telehealth & Clinical Patient Systems',
      desc: 'Secure patient intake workflows, real-time doctor consultation scheduling, and sub-second encrypted telemetry engineered for healthcare providers.',
      chips: [
        'HIPAA & HL7 Cloud Compliance',
        'Automated Appointment Nurturing',
        'Doctor Consultation Portals',
        'Sub-Second Bed & Staff Dashboards'
      ],
      stats: [
        { val: '99.99%', lbl: 'High-Availability SLA' },
        { val: '< 45ms', lbl: 'Real-Time Telemetry' },
        { val: '0', lbl: 'Data Leakages Audited' }
      ]
    },
    {
      id: 'education',
      num: '03',
      name: 'Education',
      tag: 'SECTOR FOCUS // EDUCATION & EDTECH',
      headline: 'Interactive LMS & High-Yield Admissions Funnels',
      desc: 'Custom EdTech architectures, scalable live-streaming virtual lecture halls, and automated student enrollment nurturing pipelines with credential verification.',
      chips: [
        'Live WebRTC Classrooms',
        'Admissions CRM & Verification',
        'Interactive Gamification Engine',
        'Automated Certification Badges'
      ],
      stats: [
        { val: '400k+', lbl: 'Active Learners Served' },
        { val: '+65%', lbl: 'Admissions Yield Increase' },
        { val: '4.9★', lbl: 'Platform Experience Rating' }
      ]
    },
    {
      id: 'retail',
      num: '04',
      name: 'Retail',
      tag: 'SECTOR FOCUS // RETAIL & FRANCHISES',
      headline: 'Omnichannel Multi-Store Presence & Foot Traffic Growth',
      desc: 'Synchronizing multi-branch retail inventories with hyper-local foot-traffic advertising funnels, instant in-store pick-up, and loyalty WhatsApp integration.',
      chips: [
        'Centralized Branch Inventory',
        'Hyper-Local Google Maps SEO',
        'WhatsApp Loyalty Automations',
        'Click-and-Collect POS Sync'
      ],
      stats: [
        { val: '+140%', lbl: 'Store Inbound Volume' },
        { val: '50+', lbl: 'Retail Locations Unified' },
        { val: '2.8X', lbl: 'ROAS on Local Campaigns' }
      ]
    },
    {
      id: 'ecommerce',
      num: '05',
      name: 'E-Commerce',
      tag: 'SECTOR FOCUS // E-COMMERCE & D2C',
      headline: 'Sub-Second Headless Storefronts Engineered for Scale',
      desc: 'Next.js headless eCommerce storefronts designed for instantaneous browsing, frictionless one-click global checkouts, and automated real-time ERP sync.',
      chips: [
        'Next.js Headless Architecture',
        '1-Click Multi-Currency Checkout',
        'Automated Abandoned Cart Funnels',
        'Real-Time ERP & WMS Inventory Sync'
      ],
      stats: [
        { val: '< 0.8s', lbl: 'Storefront Load Time' },
        { val: '+85%', lbl: 'Checkout Completion Rate' },
        { val: '99.98%', lbl: 'Payment Gateway Uptime' }
      ]
    },
    {
      id: 'sports',
      num: '06',
      name: 'Sports & Fitness',
      tag: 'SECTOR FOCUS // SPORTS & FITNESS',
      headline: 'Member Retention Ecosystems & Dynamic Class Booking',
      desc: 'Mobile-first fitness club applications featuring friction-free class schedules, automated recurring subscriptions, and personalized workout telemetry.',
      chips: [
        'iOS & Android Member Apps',
        'Frictionless Class Scheduling',
        'Automated Recurring Billing',
        'Trainer & Nutrition Tracking'
      ],
      stats: [
        { val: '+92%', lbl: 'Annual Member Retention' },
        { val: '15k+', lbl: 'Monthly Class Bookings' },
        { val: '4.8★', lbl: 'App Store & Play Store Rating' }
      ]
    },
    {
      id: 'profservices',
      num: '07',
      name: 'Professional Services',
      tag: 'SECTOR FOCUS // PROFESSIONAL SERVICES',
      headline: 'High-Authority B2B Client Portals & Retainer Funnels',
      desc: 'Empowering corporate law, accounting, and management consulting firms to win enterprise mandates with secure document vaults and authority-building web platforms.',
      chips: [
        'Encrypted Client Document Vaults',
        'Automated NDA & E-Sign Flow',
        'Executive Inbound Authority Engine',
        'Secure Onboarding Pipelines'
      ],
      stats: [
        { val: '3.4X', lbl: 'Corporate Retainer Velocity' },
        { val: '100%', lbl: 'Strict Client Confidentiality' },
        { val: '24h', lbl: 'Digital Client Onboarding' }
      ]
    },
    {
      id: 'startups',
      num: '08',
      name: 'Startups',
      tag: 'SECTOR FOCUS // STARTUPS & SCALEUPS',
      headline: '4-Week MVP Acceleration & Cloud Elastic Scalability',
      desc: 'Transforming venture-backed ideas into production-ready web apps within weeks, coupled with elastic microservices architecture ready for rapid user growth.',
      chips: [
        '4-Week Full-Stack MVP Launch',
        'Serverless Auto-Scaling Topology',
        'Investor-Grade KPI Telemetry',
        'CI/CD Rapid Deployment Pipeline'
      ],
      stats: [
        { val: '4 Wks', lbl: 'Idea to Live Market' },
        { val: '10X', lbl: 'Traffic Surge Elasticity' },
        { val: '100+', lbl: 'Commercial Inbounds Day 1' }
      ]
    },
    {
      id: 'smes',
      num: '09',
      name: 'SMEs',
      tag: 'SECTOR FOCUS // SMALL & MEDIUM ENTERPRISES',
      headline: 'Legacy System Modernization & Autonomous Growth Loops',
      desc: 'Eliminating spreadsheet bottlenecks and fragmented systems with unified cloud management portals and automated customer inquiry dispatch systems.',
      chips: [
        'Legacy Architecture Modernization',
        'Automated Lead Routing Funnels',
        'Centralized Business Dashboard',
        '24/7 Monitored Infrastructure'
      ],
      stats: [
        { val: '-70%', lbl: 'Manual Operational Overhead' },
        { val: '+210%', lbl: 'Customer Pipeline Growth' },
        { val: '24/7', lbl: 'Guaranteed System Uptime' }
      ]
    },
    {
      id: 'enterprise',
      num: '10',
      name: 'Enterprise',
      tag: 'SECTOR FOCUS // GLOBAL ENTERPRISES',
      headline: 'High-Concurrency Cloud Infrastructure & Global SLAs',
      desc: 'Mission-critical digital architectures engineered for zero-latency transaction throughput, multi-region failover protection, and enterprise SSO compliance.',
      chips: [
        'Multi-Region Cloud Failover',
        'Zero-Trust SSO & Audit Logging',
        'Custom High-Throughput APIs',
        'Dedicated 24/7/365 NOC Support'
      ],
      stats: [
        { val: '99.999%', lbl: 'Audited Service SLA' },
        { val: '< 35ms', lbl: 'Global Edge Latency' },
        { val: '15 Min', lbl: 'Guaranteed Incident Response' }
      ]
    }
  ];

  function renderIndustryStrips() {
    const container = document.getElementById('ind-strips-wrapper');
    if (!container) return;

    container.innerHTML = industriesStripsData
      .map((ind, idx) => {
        const isActive = idx === 0;
        const chipsHtml = ind.chips
          .map((c) => `<span class="ind-chip"><span class="ind-chip-dot"></span>${c}</span>`)
          .join('');

        const statsHtml = ind.stats
          .map((s, sIdx) => {
            const divider = sIdx < ind.stats.length - 1 ? '<div class="ind-stat-divider"></div>' : '';
            return `
              <div class="ind-stat-col">
                <span class="ind-stat-val">${s.val}</span>
                <span class="ind-stat-lbl">${s.lbl}</span>
              </div>
              ${divider}
            `;
          })
          .join('');

        return `
          <div class="ind-strip ${isActive ? 'active' : ''}"
               data-strip-index="${idx}"
               role="tab"
               tabindex="0"
               aria-selected="${isActive}"
               aria-expanded="${isActive}"
               aria-label="${ind.name} Industry Strip">
            <div class="ind-strip-collapsed-bar" aria-hidden="${isActive}">
              <span class="ind-collapsed-num">${ind.num}</span>
              <span class="ind-collapsed-name">${ind.name}</span>
              <span class="ind-collapsed-dot"></span>
            </div>
            <div class="ind-strip-expanded-wrap" aria-hidden="${!isActive}">
              <div class="ind-deco-number" aria-hidden="true">${ind.num}</div>
              <div class="ind-expanded-content">
                <div class="ind-expanded-header">
                  <span class="ind-sector-tag">${ind.tag}</span>
                  <h3 class="ind-expanded-heading">${ind.headline}</h3>
                  <p class="ind-expanded-desc">${ind.desc}</p>
                </div>
                <div class="ind-chips-row">
                  ${chipsHtml}
                </div>
                <div class="ind-footer-row">
                  <div class="ind-stats-group">
                    ${statsHtml}
                  </div>
                  <a href="#contact" class="btn-ind-cta" aria-label="Deploy Riyadvi systems for ${ind.name}">
                    <span>DEPLOY FOR MY INDUSTRY</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    attachIndustryStripEvents();
  }

  function activateIndustryStrip(targetStrip) {
    if (!targetStrip || targetStrip.classList.contains('active')) return;
    const allStrips = document.querySelectorAll('.ind-strip');
    allStrips.forEach((strip) => {
      const isTarget = strip === targetStrip;
      strip.classList.toggle('active', isTarget);
      strip.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      strip.setAttribute('aria-expanded', isTarget ? 'true' : 'false');

      const collapsedBar = strip.querySelector('.ind-strip-collapsed-bar');
      if (collapsedBar) collapsedBar.setAttribute('aria-hidden', isTarget ? 'true' : 'false');

      const expandedWrap = strip.querySelector('.ind-strip-expanded-wrap');
      if (expandedWrap) expandedWrap.setAttribute('aria-hidden', isTarget ? 'false' : 'true');
    });
  }

  function attachIndustryStripEvents() {
    const strips = Array.from(document.querySelectorAll('.ind-strip'));
    if (!strips.length) return;

    strips.forEach((strip, index) => {
      // Click event
      strip.addEventListener('click', (e) => {
        // If clicking inside the CTA button or links, don't interfere with navigation
        if (e.target.closest('a') || e.target.closest('button')) return;
        activateIndustryStrip(strip);
      });

      // Keyboard accessibility (Enter, Space, Arrows)
      strip.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.target.closest('a') || e.target.closest('button')) return;
          e.preventDefault();
          activateIndustryStrip(strip);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = (index + 1) % strips.length;
          strips[nextIndex].focus();
          activateIndustryStrip(strips[nextIndex]);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = (index - 1 + strips.length) % strips.length;
          strips[prevIndex].focus();
          activateIndustryStrip(strips[prevIndex]);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderIndustryStrips);
  } else {
    renderIndustryStrips();
  }

  // ==========================================================================
  // 12. CONNECTED TECHNOLOGY GRAPH CANVAS (Section 23)
  // ==========================================================================
  const techCanvas = document.getElementById('tech-nodes-canvas');
  if (techCanvas) {
    const tCtx = techCanvas.getContext('2d');
    let tW = (techCanvas.width = techCanvas.parentElement.clientWidth);
    let tH = (techCanvas.height = 480);

    window.addEventListener('resize', () => {
      if (techCanvas.parentElement) {
        tW = techCanvas.width = techCanvas.parentElement.clientWidth;
        tH = techCanvas.height = 480;
      }
    });

    const techNames = [
      'React 19', 'Next.js', 'Node.js', 'TypeScript', 'Three.js',
      'WebGL', 'Flutter', 'React Native', 'Expo', 'Figma',
      'AI Agents', 'Docker', 'AWS Cloud', 'WordPress', 'WooCommerce',
      'Technical SEO', 'Meta Ads', 'Google Ads'
    ];

    const nodes = techNames.map((name, i) => {
      const angle = (i / techNames.length) * Math.PI * 2;
      const radius = 130 + Math.random() * 80;
      return {
        name: name,
        x: tW / 2 + Math.cos(angle) * radius,
        y: tH / 2 + Math.sin(angle) * (radius * 0.75),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: name === 'Next.js' || name === 'React 19' || name === 'Three.js' ? 26 : 20,
        isMajor: name === 'Next.js' || name === 'React 19' || name === 'Three.js'
      };
    });

    let hoveredNode = null;
    let draggedNode = null;

    techCanvas.addEventListener('mousemove', (e) => {
      const rect = techCanvas.getBoundingClientRect();
      const mX = e.clientX - rect.left;
      const mY = e.clientY - rect.top;

      if (draggedNode) {
        draggedNode.x = mX;
        draggedNode.y = mY;
        return;
      }

      hoveredNode = null;
      nodes.forEach((n) => {
        const dist = Math.hypot(n.x - mX, n.y - mY);
        if (dist < n.radius + 10) {
          hoveredNode = n;
        }
      });
    });

    techCanvas.addEventListener('mousedown', () => {
      if (hoveredNode) draggedNode = hoveredNode;
    });

    window.addEventListener('mouseup', () => {
      draggedNode = null;
    });

    function renderTechGraph() {
      tCtx.clearRect(0, 0, tW, tH);

      // Draw physics connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.35;
            tCtx.beginPath();
            tCtx.moveTo(nodes[i].x, nodes[i].y);
            tCtx.lineTo(nodes[j].x, nodes[j].y);
            tCtx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            tCtx.lineWidth = 1.2;
            tCtx.stroke();
          }
        }
      }

      // Draw and update nodes
      nodes.forEach((n) => {
        if (n !== draggedNode) {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < n.radius || n.x > tW - n.radius) n.vx *= -1;
          if (n.y < n.radius || n.y > tH - n.radius) n.vy *= -1;
        }

        const isHover = n === hoveredNode;

        tCtx.beginPath();
        tCtx.arc(n.x, n.y, isHover ? n.radius + 4 : n.radius, 0, Math.PI * 2);
        tCtx.fillStyle = isHover ? '#F4D36B' : (n.isMajor ? '#D4AF37' : '#171717');
        tCtx.strokeStyle = isHover ? '#FFFFFF' : '#D4AF37';
        tCtx.lineWidth = isHover ? 2.5 : 1.5;
        tCtx.shadowColor = '#D4AF37';
        tCtx.shadowBlur = isHover ? 18 : 6;
        tCtx.fill();
        tCtx.stroke();

        // Label
        tCtx.shadowBlur = 0;
        tCtx.fillStyle = isHover ? '#050505' : '#FFFFFF';
        tCtx.font = `600 ${isHover ? 11 : 10}px 'Space Grotesk', sans-serif`;
        tCtx.textAlign = 'center';
        tCtx.textBaseline = 'middle';
        tCtx.fillText(n.name, n.x, n.y);
      });

      requestAnimationFrame(renderTechGraph);
    }
    renderTechGraph();
  }

  // ==========================================================================
  // 12B. ORBIT-HUB FUTURE HORIZONS CONTROLLER (Section 11 — Future Horizons)
  // ==========================================================================
  const orbitCapabilitiesData = [
    {
      id: 'ai-agents',
      num: '01 / 06',
      icon: '🧠',
      shortName: 'AI & AGENTS',
      title: 'Autonomous AI & Agents',
      desc: 'Retrieval-augmented conversational bots and workflow agents that automate sales qualification and 24/7 client triage.',
      tags: ['RAG ARCHITECTURE', 'AUTONOMOUS WORKFLOWS', '24/7 TRIAGE BOT'],
      angle: -90
    },
    {
      id: 'analytics',
      num: '02 / 06',
      icon: '📈',
      shortName: 'ANALYTICS',
      title: 'Predictive Revenue Analytics',
      desc: 'Real-time cohort telemetry forecasting pipeline velocity and eliminating customer churn before it occurs.',
      tags: ['COHORT TELEMETRY', 'CHURN PREDICTION', 'PIPELINE VELOCITY'],
      angle: -30
    },
    {
      id: 'adaptive-ux',
      num: '03 / 06',
      icon: '✨',
      shortName: 'ADAPTIVE UX',
      title: 'Intelligent Adaptive UX',
      desc: 'Dynamic web interfaces that personalize layouts, messaging, and CTAs in real-time according to visitor intent.',
      tags: ['INTENT PERSONALIZATION', 'REAL-TIME LAYOUTS', 'DYNAMIC CTAS'],
      angle: 30
    },
    {
      id: '3d-webgl',
      num: '04 / 06',
      icon: '🌐',
      shortName: '3D & WEBGL',
      title: '3D Modeling & WebGL',
      desc: 'Photorealistic interactive product customizers and architectural walkthroughs directly in standard browsers.',
      tags: ['THREE.JS SHADERS', 'PRODUCT CONFIGURATORS', 'BROWSER WEBGL'],
      angle: 90
    },
    {
      id: 'ar-vr',
      num: '05 / 06',
      icon: '🥽',
      shortName: 'AR / VR',
      title: 'WebXR & AR/VR',
      desc: 'Zero-install mobile AR enabling retail and industrial customers to visualize products in their physical environment.',
      tags: ['ZERO-INSTALL AR', 'MOBILE WEBXR', 'SPATIAL PREVIEWS'],
      angle: 150
    },
    {
      id: 'growth-loops',
      num: '06 / 06',
      icon: '⚡',
      shortName: 'GROWTH LOOPS',
      title: 'Omnichannel Growth Loops',
      desc: 'Automated attribution pipelines connecting search ads, social campaigns, and CRM conversions into one unified telemetry stream.',
      tags: ['MULTI-TOUCH ATTRIBUTION', 'CRM CONVERSION SYNC', 'UNIFIED TELEMETRY'],
      angle: 210
    }
  ];

  function initOrbitHub() {
    const hubWrapper = document.getElementById('orbit-hub-wrapper');
    const spokesSvg = document.getElementById('orbit-spokes-svg');
    const nodesLayer = document.getElementById('orbit-nodes-layer');
    const cardInner = document.getElementById('orbit-card-inner');
    const progressBar = document.getElementById('orbit-progress-bar');
    if (!hubWrapper || !spokesSvg || !nodesLayer || !cardInner) return;

    let currentOrbitIndex = 0;
    const CYCLE_DURATION = 6000;
    let cycleStartTime = performance.now();
    let pausedAt = null;
    let isPaused = false;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Render Spokes and Node Buttons
    const CX = 290;
    const CY = 290;
    const R_PX = 220.4;
    const R_PCT = 38;

    let spokesHtml = '';
    let nodesHtml = '';

    orbitCapabilitiesData.forEach((cap, i) => {
      const rad = (cap.angle * Math.PI) / 180;
      const nx = CX + R_PX * Math.cos(rad);
      const ny = CY + R_PX * Math.sin(rad);

      const leftPct = 50 + R_PCT * Math.cos(rad);
      const topPct = 50 + R_PCT * Math.sin(rad);

      const isActive = i === 0;

      spokesHtml += `
        <line x1="${CX}" y1="${CY}" x2="${nx.toFixed(2)}" y2="${ny.toFixed(2)}"
              class="orbit-spoke ${isActive ? 'active' : ''}"
              data-spoke-index="${i}" />
      `;

      nodesHtml += `
        <button type="button"
                class="orbit-node-btn ${isActive ? 'active' : ''}"
                data-index="${i}"
                role="tab"
                id="orbit-node-${i}"
                aria-selected="${isActive ? 'true' : 'false'}"
                aria-controls="orbit-detail-card"
                aria-label="Capability ${i + 1}: ${cap.title}"
                style="left: ${leftPct.toFixed(2)}%; top: ${topPct.toFixed(2)}%;">
          <span class="orbit-node-icon" aria-hidden="true">${cap.icon}</span>
          <span class="orbit-node-label" aria-hidden="true">${cap.shortName}</span>
        </button>
      `;
    });

    spokesSvg.innerHTML = spokesHtml;
    nodesLayer.innerHTML = nodesHtml;

    function renderCard(index) {
      const cap = orbitCapabilitiesData[index];
      cardInner.innerHTML = `
        <div class="orbit-card-animated-wrap">
          <div class="orbit-card-top">
            <span class="orbit-card-index">${cap.num}</span>
            <span class="orbit-card-emoji" aria-hidden="true">${cap.icon}</span>
          </div>
          <div class="orbit-card-body">
            <h3 class="orbit-card-title">${cap.title}</h3>
            <p class="orbit-card-desc">${cap.desc}</p>
            <div class="orbit-card-tags">
              ${cap.tags.map((t) => `<span class="orbit-card-tag">${t}</span>`).join('')}
            </div>
          </div>
          <div class="orbit-card-footer">
            <a href="#contact" class="orbit-card-link" aria-label="Explore ${cap.title} solutions">
              <span>EXPLORE CAPABILITY</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      `;
    }

    renderCard(0);

    const nodeButtons = Array.from(nodesLayer.querySelectorAll('.orbit-node-btn'));
    const spokeLines = Array.from(spokesSvg.querySelectorAll('.orbit-spoke'));

    function selectCapability(index, restartTimer = true) {
      currentOrbitIndex = (index + orbitCapabilitiesData.length) % orbitCapabilitiesData.length;

      nodeButtons.forEach((btn, i) => {
        const active = i === currentOrbitIndex;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      spokeLines.forEach((line, i) => {
        line.classList.toggle('active', i === currentOrbitIndex);
      });

      renderCard(currentOrbitIndex);

      if (restartTimer) {
        cycleStartTime = performance.now();
        pausedAt = null;
        if (progressBar) progressBar.style.width = '0%';
      }
    }

    // Attach Click and Keyboard listeners
    nodeButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        selectCapability(index, true);
      });

      btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = (index + 1) % nodeButtons.length;
          nodeButtons[nextIndex].focus();
          selectCapability(nextIndex, true);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = (index - 1 + nodeButtons.length) % nodeButtons.length;
          nodeButtons[prevIndex].focus();
          selectCapability(prevIndex, true);
        }
      });
    });

    // Pause on hover over orbit hub or section
    const sectionContainer = document.getElementById('ai-future') || hubWrapper;
    sectionContainer.addEventListener('mouseenter', () => {
      if (isReducedMotion) return;
      isPaused = true;
      pausedAt = performance.now();
    });

    sectionContainer.addEventListener('mouseleave', () => {
      if (isReducedMotion) return;
      if (isPaused && pausedAt) {
        cycleStartTime += performance.now() - pausedAt;
      }
      isPaused = false;
      pausedAt = null;
    });

    // Animation frame auto-cycle loop
    function loop(now) {
      if (!isReducedMotion) {
        if (!isPaused) {
          const elapsed = now - cycleStartTime;
          const progress = Math.min(1, Math.max(0, elapsed / CYCLE_DURATION));
          if (progressBar) {
            progressBar.style.width = (progress * 100).toFixed(1) + '%';
          }
          if (elapsed >= CYCLE_DURATION) {
            selectCapability(currentOrbitIndex + 1, true);
          }
        }
      }
      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOrbitHub);
  } else {
    initOrbitHub();
  }

  // ==========================================================================
  // 13. 7-STEP INTERACTIVE PROJECT ESTIMATOR (Section 28)
  // ==========================================================================
  const wizardSteps = [
    {
      title: 'What type of solution do you need?',
      options: [
        'Web Application & Headless Platform',
        'Mobile App (iOS & Android)',
        'Riyadvi Guardian Growth System',
        '3D Modeling & WebGL Experience',
        'E-Commerce & Storefront Architecture',
        'Custom Enterprise Software'
      ]
    },
    {
      title: 'What is your business type?',
      options: [
        'Early-Stage Startup',
        'Growing SME / Scaleup',
        'Established Corporate Enterprise',
        'Franchise / Multi-Location Brand'
      ]
    },
    {
      title: 'What is the anticipated project scale?',
      options: [
        'MVP / Prototype Launch',
        'Complete Ground-Up Redesign',
        'Multi-Phase Enterprise Platform',
        'Existing System Modernization'
      ]
    },
    {
      title: 'Select priority technical features (Choose primary):',
      options: [
        'High-Converting Sales Funnel & WhatsApp',
        'Photorealistic 3D / WebGL Customizer',
        'AI Conversational Assistant & Triage',
        'Multi-Region Cloud Hosting & SLAs',
        'Stripe / Multi-Currency Payment Rail',
        'Enterprise Single Sign-On (SSO)'
      ]
    },
    {
      title: 'What is your target launch timeline?',
      options: [
        'Urgent (2 to 4 Weeks)',
        'Standard (1 to 2 Months)',
        'Quarterly Roadmap (3+ Months)',
        'Flexible Strategic Partnership'
      ]
    },
    {
      title: 'What is your planned investment bracket?',
      options: [
        '$2,000 – $5,000',
        '$5,000 – $15,000',
        '$15,000 – $50,000',
        '$50,000+ (Enterprise Scope)'
      ]
    },
    {
      title: 'Enter your contact details to generate profile:',
      isContactStep: true
    }
  ];

  let currentWizardStep = 0;
  const userEstimatorSelections = [];

  const wizardStepIndicator = document.getElementById('wizard-step-indicator');
  const wizardStepTitle = document.getElementById('wizard-step-title');
  const wizardStepBody = document.getElementById('wizard-step-body');
  const wizardProgressFill = document.getElementById('wizard-progress-fill');
  const wizardNextBtn = document.getElementById('wizard-next-btn');
  const wizardBackBtn = document.getElementById('wizard-back-btn');

  function renderWizardStep() {
    if (!wizardStepBody) return;
    const step = wizardSteps[currentWizardStep];

    if (wizardStepIndicator) {
      wizardStepIndicator.textContent = `STEP ${currentWizardStep + 1} OF ${wizardSteps.length}`;
    }
    if (wizardStepTitle) {
      wizardStepTitle.textContent = step.title;
    }
    if (wizardProgressFill) {
      wizardProgressFill.style.width = `${((currentWizardStep + 1) / wizardSteps.length) * 100}%`;
    }

    if (wizardBackBtn) {
      if (currentWizardStep === 0) wizardBackBtn.classList.add('hidden');
      else wizardBackBtn.classList.remove('hidden');
    }

    if (step.isContactStep) {
      wizardStepBody.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 14px; max-width: 480px; margin: 0 auto;">
          <input type="text" id="w-name" placeholder="Full Name *" required style="background: rgba(5,5,5,0.6); border: 1px solid var(--border-glass); padding: 12px; border-radius: 8px; color: #fff;">
          <input type="email" id="w-email" placeholder="Work Email *" required style="background: rgba(5,5,5,0.6); border: 1px solid var(--border-glass); padding: 12px; border-radius: 8px; color: #fff;">
          <input type="tel" id="w-phone" placeholder="Phone / WhatsApp *" required style="background: rgba(5,5,5,0.6); border: 1px solid var(--border-glass); padding: 12px; border-radius: 8px; color: #fff;">
        </div>
      `;
      if (wizardNextBtn) wizardNextBtn.textContent = 'GENERATE PROJECT PROFILE';
      return;
    }

    if (wizardNextBtn) wizardNextBtn.textContent = 'Next Step →';

    const grid = document.createElement('div');
    grid.className = 'wizard-options-grid';

    step.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'wizard-option-btn';
      if (userEstimatorSelections[currentWizardStep] === opt) {
        btn.classList.add('selected');
      }
      btn.innerHTML = `<span>✓</span><span>${opt}</span>`;
      btn.addEventListener('click', () => {
        grid.querySelectorAll('.wizard-option-btn').forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
        userEstimatorSelections[currentWizardStep] = opt;
      });
      grid.appendChild(btn);
    });

    wizardStepBody.innerHTML = '';
    wizardStepBody.appendChild(grid);
  }

  if (wizardNextBtn) {
    wizardNextBtn.addEventListener('click', () => {
      const step = wizardSteps[currentWizardStep];

      if (step.isContactStep) {
        const name = document.getElementById('w-name')?.value;
        const email = document.getElementById('w-email')?.value;
        const phone = document.getElementById('w-phone')?.value;

        if (!name || !email || !phone) {
          alert('Please fill in your name, email, and phone number.');
          return;
        }

        // Final Profile Complete
        wizardStepBody.innerHTML = `
          <div style="text-align: center; padding: 20px;">
            <span style="font-family: var(--font-mono); font-size: 13px; color: #4ECCA3; letter-spacing: 2px;">✓ ESTIMATION COMPLETE</span>
            <h3 style="font-family: var(--font-display); font-size: 26px; color: var(--gold-bright); margin: 12px 0;">YOUR PROJECT PROFILE IS READY.</h3>
            <p style="color: var(--text-secondary); font-size: 14px; max-width: 520px; margin: 0 auto 24px;">
              Thank you, ${name}! We have qualified your requirements for <strong>${userEstimatorSelections[0] || 'Digital Platform'}</strong> (${userEstimatorSelections[5] || 'Tailored Budget'}).
            </p>
            <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--gold-border); border-radius: 12px; padding: 18px; max-width: 440px; margin: 0 auto 24px; text-align: left; font-size: 13px; color: #DDD;">
              <div>• Solution: <strong>${userEstimatorSelections[0] || 'N/A'}</strong></div>
              <div>• Business Type: <strong>${userEstimatorSelections[1] || 'N/A'}</strong></div>
              <div>• Scale: <strong>${userEstimatorSelections[2] || 'N/A'}</strong></div>
              <div>• Priority: <strong>${userEstimatorSelections[3] || 'N/A'}</strong></div>
              <div>• Timeline: <strong>${userEstimatorSelections[4] || 'N/A'}</strong></div>
            </div>
            <a href="https://wa.me/918072487427?text=${encodeURIComponent('Hello Riyadvi Team, I completed the project estimator for ' + (userEstimatorSelections[0] || 'Web Platform') + '. Can we discuss a consultation?')}" target="_blank" rel="noopener" class="btn-primary-gold">REQUEST CONSULTATION ON WHATSAPP</a>
          </div>
        `;
        wizardStepIndicator.textContent = 'COMPLETE';
        wizardStepTitle.textContent = 'Profile Ready';
        wizardNextBtn.classList.add('hidden');
        wizardBackBtn.classList.add('hidden');
        return;
      }

      if (!userEstimatorSelections[currentWizardStep]) {
        userEstimatorSelections[currentWizardStep] = step.options[0];
      }

      currentWizardStep++;
      renderWizardStep();
    });
  }

  if (wizardBackBtn) {
    wizardBackBtn.addEventListener('click', () => {
      if (currentWizardStep > 0) {
        currentWizardStep--;
        renderWizardStep();
      }
    });
  }

  renderWizardStep();

  // ==========================================================================
  // 14. CONTACT FORM & UTM TRACKING (Sections 29 & 30)
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  // Extract UTM parameters
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source') || 'direct';
  const utmCampaign = urlParams.get('utm_campaign') || 'website_redesign';

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value;
      const company = document.getElementById('form-company')?.value;
      const phone = document.getElementById('form-phone')?.value;
      const email = document.getElementById('form-email')?.value;
      const service = document.getElementById('form-service')?.value;
      const budget = document.getElementById('form-budget')?.value;
      const message = document.getElementById('form-message')?.value;

      if (formFeedback) {
        formFeedback.className = 'form-feedback-msg success';
        formFeedback.innerHTML = `
          Thank you, <strong>${name}</strong>! Your consultation request for <strong>${service}</strong> has been transmitted. An executive brief has been dispatched to <strong>${email}</strong> and our team will connect via WhatsApp at <strong>${phone}</strong> within 24 hours. (Campaign: ${utmSource})
        `;
        formFeedback.classList.remove('hidden');
      }

      contactForm.reset();
    });
  }

  window.fillConsultationRequest = function () {
    const serviceSelect = document.getElementById('form-service');
    if (serviceSelect) serviceSelect.value = 'guardian';
    const msg = document.getElementById('form-message');
    if (msg) msg.value = 'Requesting a free 30-minute growth consultation regarding the Riyadvi Guardian system.';
    const submitBtn = document.getElementById('form-submit-btn');
    if (submitBtn) submitBtn.scrollIntoView({ behavior: 'smooth' });
  };

  // ==========================================================================
  // 15. RIYADVI AI ASSISTANT WIDGET (Section 31)
  // ==========================================================================
  const assistantToggle = document.getElementById('assistant-toggle');
  const assistantModal = document.getElementById('assistant-modal');
  const assistantClose = document.getElementById('assistant-close');
  const aiInput = document.getElementById('ai-input');
  const aiSendBtn = document.getElementById('ai-send-btn');
  const chatMessages = document.getElementById('chat-messages');
  const sugChips = document.querySelectorAll('.sug-chip');

  if (assistantToggle && assistantModal) {
    assistantToggle.addEventListener('click', () => {
      assistantModal.classList.toggle('hidden');
    });

    if (assistantClose) {
      assistantClose.addEventListener('click', () => {
        assistantModal.classList.add('hidden');
      });
    }
  }

  const aiKnowledge = {
    services: 'Riyadvi delivers Full-Stack Web Development (Next.js/React), Native Mobile Apps (React Native/Flutter), 3D WebGL & Three.js Experiences, the proprietary Riyadvi Guardian Growth Ecosystem, E-Commerce platforms, and Award-Winning WordPress/WooCommerce architectures.',
    website: 'We engineer ultra-responsive Next.js web applications with sub-second LCP speeds, bespoke luxury design, and high-conversion sales funnels. Would you like to schedule an exploratory call?',
    marketing: 'Our digital marketing methodology combines Google Ads, Meta Ads, and automated WhatsApp lead qualification funnels designed to achieve predictable customer acquisition with high ROAS.',
    mobile: 'We develop native iOS and Android applications with cross-platform efficiency, biometric security, and offline data sync. Delivery timescales range from 6 to 12 weeks.',
    guardian: 'Riyadvi Guardian is our proprietary business-growth protector. It connects marketing traffic, telemetry analytics, and automated conversion funnels into an autonomous client revenue engine.',
    consultation: 'You can schedule a free 30-minute strategic consultation with our senior architects right now by submitting our contact form or messaging directly on WhatsApp at +91 8072487427.'
  };

  function appendAiMessage(sender, text) {
    if (!chatMessages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'ai' ? 'ai-msg' : 'user-msg';
    msgDiv.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleAiQuery(queryText, queryKey = '') {
    appendAiMessage('user', queryText);

    setTimeout(() => {
      let reply = '';
      const lower = queryText.toLowerCase();

      if (queryKey && aiKnowledge[queryKey]) {
        reply = aiKnowledge[queryKey];
      } else if (lower.includes('service') || lower.includes('offer')) {
        reply = aiKnowledge.services;
      } else if (lower.includes('website') || lower.includes('web')) {
        reply = aiKnowledge.website;
      } else if (lower.includes('guardian') || lower.includes('growth')) {
        reply = aiKnowledge.guardian;
      } else if (lower.includes('consult') || lower.includes('call') || lower.includes('hire')) {
        reply = aiKnowledge.consultation;
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('budget')) {
        reply = 'Our project tiers range from $2,000 for foundational web builds to $15,000+ for enterprise platforms. You can scope your exact requirements using our interactive Project Estimator section!';
      } else {
        reply = 'Thank you for reaching out! Riyadvi specializes in engineering digital advantage for businesses ready to move forward. You can connect directly with our engineering team on WhatsApp at +91 8072487427.';
      }

      appendAiMessage('ai', reply);
    }, 450);
  }

  if (aiSendBtn && aiInput) {
    aiSendBtn.addEventListener('click', () => {
      const val = aiInput.value.trim();
      if (val) {
        handleAiQuery(val);
        aiInput.value = '';
      }
    });

    aiInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = aiInput.value.trim();
        if (val) {
          handleAiQuery(val);
          aiInput.value = '';
        }
      }
    });
  }

  sugChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const queryKey = chip.getAttribute('data-query');
      handleAiQuery(chip.textContent, queryKey);
    });
  });

  // ==========================================================================
  // 16. MODALS MANAGEMENT (Award, Story, Legal)
  // ==========================================================================
  window.closeModals = function () {
    document.querySelectorAll('.modal-backdrop').forEach((m) => m.classList.add('hidden'));
  };

  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModals();
    });
  });

  window.openAwardModal = function (awardKey) {
    const modal = document.getElementById('award-modal');
    const content = document.getElementById('award-modal-content');
    if (!modal || !content) return;

    if (awardKey === 'techbehemoths') {
      content.innerHTML = `
        <h3 id="award-modal-title" style="font-family: var(--font-display); font-size: 24px; color: var(--gold-bright); margin-bottom: 6px;">TechBehemoths Global Awards 2025</h3>
        <span style="font-family: var(--font-mono); font-size: 12px; color: var(--gold-champagne); letter-spacing: 1.5px; display: block; margin-bottom: 16px;">LOCATION: BERLIN, GERMANY • VERIFIED RECIPIENT</span>
        <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
          Riyadvi Software Technologies Pvt. Ltd. was officially recognized as a Global Winner in Berlin for outstanding technical excellence across ReactJS, WordPress, and Social Media Marketing (SMM).
        </p>
        <div style="background: rgba(212,175,55,0.08); border: 1px solid var(--gold-border); border-radius: 12px; padding: 18px; margin-bottom: 24px;">
          <div style="font-family: var(--font-mono); font-size: 12px; color: var(--text-white); margin-bottom: 8px;">Official Certificate ID: <strong>6a58f7e3-4772-4971-823c-5b6350c91308</strong></div>
          <div style="color: #4ECCA3; font-size: 12px;">✓ Verified Global Agency Accreditation</div>
        </div>
        <div style="display: flex; gap: 14px; flex-wrap: wrap;">
          <a href="https://techbehemoths.com/awards-2025/certificates/6a58f7e3-4772-4971-823c-5b6350c91308" target="_blank" rel="noopener" class="btn-primary-gold">VIEW OFFICIAL CERTIFICATE ↗</a>
          <button class="btn-secondary-gold" onclick="closeModals()">Close</button>
        </div>
      `;
    } else if (awardKey === 'designrush') {
      content.innerHTML = `
        <h3 id="award-modal-title" style="font-family: var(--font-display); font-size: 24px; color: var(--gold-bright); margin-bottom: 6px;">DesignRush Recognition</h3>
        <span style="font-family: var(--font-mono); font-size: 12px; color: var(--gold-champagne); letter-spacing: 1.5px; display: block; margin-bottom: 16px;">TOP WEB DEVELOPMENT COMPANY 2025</span>
        <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
          DesignRush accredited Riyadvi Software Technologies as a premier web engineering and spatial UI partner acknowledged for enterprise delivery and commercial growth.
        </p>
        <button class="btn-primary-gold" onclick="closeModals()">ACKNOWLEDGED</button>
      `;
    } else if (awardKey === 'starexcellence') {
      content.innerHTML = `
        <h3 id="award-modal-title" style="font-family: var(--font-display); font-size: 24px; color: var(--gold-bright); margin-bottom: 6px;">Star Excellence Awards 2021</h3>
        <span style="font-family: var(--font-mono); font-size: 12px; color: var(--gold-champagne); letter-spacing: 1.5px; display: block; margin-bottom: 16px;">NATIONAL INTEGRITY CULTURAL ACADEMY</span>
        <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
          Conferred in 2021 honoring Riyadvi Software Technologies for ethical business innovation and high-standard technological services.
        </p>
        <button class="btn-primary-gold" onclick="closeModals()">ACKNOWLEDGED</button>
      `;
    }
    modal.classList.remove('hidden');
  };

  window.openStoryModal = function () {
    const modal = document.getElementById('story-modal');
    if (modal) modal.classList.remove('hidden');
  };

  window.openLegalModal = function (type) {
    const modal = document.getElementById('legal-modal');
    const content = document.getElementById('legal-modal-content');
    if (!modal || !content) return;

    if (type === 'privacy') {
      content.innerHTML = `
        <h3 style="font-family: var(--font-display); font-size: 24px; color: var(--gold-bright); margin-bottom: 12px;">Privacy Policy</h3>
        <p style="color: var(--text-secondary); font-size: 13px; line-height: 1.7; margin-bottom: 16px;">
          Riyadvi Software Technologies Pvt. Ltd. is committed to protecting your confidential data. Form transmissions are encrypted in transit. We never sell, lease, or distribute enterprise contact data to third parties.
        </p>
        <button class="btn-primary-gold" onclick="closeModals()">CLOSE</button>
      `;
    } else {
      content.innerHTML = `
        <h3 style="font-family: var(--font-display); font-size: 24px; color: var(--gold-bright); margin-bottom: 12px;">Terms & Conditions</h3>
        <p style="color: var(--text-secondary); font-size: 13px; line-height: 1.7; margin-bottom: 16px;">
          All intellectual property, proprietary 3D shaders, and custom development deliverables are governed by formal bilateral client service agreements and NDA frameworks.
        </p>
        <button class="btn-primary-gold" onclick="closeModals()">CLOSE</button>
      `;
    }
    modal.classList.remove('hidden');
  };

})();
