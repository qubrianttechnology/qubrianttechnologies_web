(() => {
  const notice = document.querySelector('.cookie-notice');
  if (!notice) return;

  const consentCookie = 'qubriant_cookie_consent';
  const acceptButton = notice.querySelector('.cookie-accept');
  const footerLinks = document.querySelector('.footer-bottom > div');
  const settingsButton = document.createElement('button');
  settingsButton.type = 'button';
  settingsButton.className = 'cookie-settings';
  settingsButton.textContent = 'Cookie settings';
  let returnFocusToSettings = false;

  function hasConsent() {
    return document.cookie.split(';').some(cookie => cookie.trim().split('=')[0] === consentCookie && cookie.trim().split('=').slice(1).join('=') === 'necessary');
  }

  function showNotice() {
    returnFocusToSettings = true;
    notice.hidden = false;
    acceptButton.focus();
  }

  function saveNecessaryOnly() {
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${consentCookie}=necessary; Max-Age=15552000; Path=/; SameSite=Lax${secure}`;
    notice.hidden = true;
    if (returnFocusToSettings) settingsButton.focus();
    returnFocusToSettings = false;
  }

  if (footerLinks) footerLinks.append(settingsButton);
  if (!hasConsent()) notice.hidden = false;
  acceptButton.addEventListener('click', saveNecessaryOnly);
  settingsButton.addEventListener('click', showNotice);
})();
