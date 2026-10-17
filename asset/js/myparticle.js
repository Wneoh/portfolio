// Connected particles inspired by the portfolio's original spider-web animation.
(() => {
  const canvas = document.querySelector('#canvas');
  const hero = document.querySelector('.hero-background');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, particles = [], frame = 0, previous = 0;
  let visible = true;
  const mouse = { x: -1000, y: -1000 };

  function resize() {
    width = hero.clientWidth;
    height = hero.clientHeight;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    particles = Array.from({ length: Math.min(150, Math.max(45, Math.round(width * height / 6500))) }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      vx: (Math.random() - .5) * .75, vy: (Math.random() - .5) * .75
    }));
    draw(0);
  }
  function connect(a, b, range, opacity) {
    const distance = Math.hypot(a.x - b.x, a.y - b.y);
    if (distance >= range) return;
    ctx.strokeStyle = `rgba(151, 190, 211, ${opacity * (1 - distance / range)})`;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  function draw(step) {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p, index) => {
      p.x += p.vx * step;
      p.y += p.vy * step;
      if (p.x < 0 || p.x > width) { p.vx *= -1; p.x = Math.max(0, Math.min(width, p.x)); }
      if (p.y < 0 || p.y > height) { p.vy *= -1; p.y = Math.max(0, Math.min(height, p.y)); }
      ctx.fillStyle = 'rgba(212, 231, 255, .65)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
      for (let j = index + 1; j < particles.length; j++) connect(p, particles[j], 135, .5);
      if (!reducedMotion.matches) connect(p, mouse, 180, .9);
    });
  }
  function animate(time) {
    draw(previous ? Math.min((time - previous) / 16.67, 2) : 1);
    previous = time;
    frame = requestAnimationFrame(animate);
  }
  function sync() {
    cancelAnimationFrame(frame);
    previous = 0;
    if (visible && !document.hidden && !reducedMotion.matches) frame = requestAnimationFrame(animate);
    else draw(0);
  }
  hero.addEventListener('pointermove', event => {
    const rect = hero.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
  });
  hero.addEventListener('pointerleave', () => { mouse.x = mouse.y = -1000; });
  new ResizeObserver(resize).observe(hero);
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }).observe(hero);
  reducedMotion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  resize();
})();
