(() => {
  if (!('serviceWorker' in navigator) || !window.isSecureContext) return;
  if (['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname) && /^\/(?:index\.html)?$/.test(window.location.pathname)) return;
  const actions = document.querySelector('.topbar-actions');
  if (!actions) return;
  const install = document.createElement('button');
  install.className = 'icon-button hidden';
  install.type = 'button';
  install.title = 'Install LumaScale';
  install.setAttribute('aria-label', 'Install LumaScale');
  install.textContent = '\u21e9';
  const update = document.createElement('button');
  update.className = 'icon-button hidden';
  update.type = 'button';
  update.title = 'Update LumaScale and reload';
  update.setAttribute('aria-label', 'Update LumaScale and reload');
  update.textContent = '\u21bb';
  actions.prepend(install, update);
  let installPrompt = null;
  let registration = null;
  let updateRequested = false;
  let reloading = false;
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    installPrompt = event;
    install.classList.remove('hidden');
  });
  install.addEventListener('click', async () => {
    if (!installPrompt) return;
    const prompt = installPrompt;
    installPrompt = null;
    install.classList.add('hidden');
    await prompt.prompt();
    await prompt.userChoice;
  });
  window.addEventListener('appinstalled', () => {
    installPrompt = null;
    install.classList.add('hidden');
  });
  update.addEventListener('click', () => {
    if (!registration?.waiting) return;
    updateRequested = true;
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  });
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!updateRequested || reloading) return;
    reloading = true;
    window.location.reload();
  });
  async function register() {
    try {
      registration = await navigator.serviceWorker.register('./sw.js', { scope: './', updateViaCache: 'none' });
      const showUpdate = () => { if (registration.waiting && navigator.serviceWorker.controller) update.classList.remove('hidden'); };
      showUpdate();
      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;
        worker?.addEventListener('statechange', () => { if (worker.state === 'installed') showUpdate(); });
      });
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') registration.update().catch(() => {});
      });
    } catch (error) {
      console.warn('Offline installation is unavailable; the sanctuary still works online.', error);
    }
  }
  if (document.readyState === 'complete') register();
  else window.addEventListener('load', register, { once: true });
})();