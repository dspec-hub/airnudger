(function () {
  'use strict';
  var key = 'airnudger.analytics.v1';
  var banner = document.getElementById('analytics-choice');
  var settings = document.querySelector('[data-analytics-settings]');
  var loaded = false;
  var production = /^(www\.)?airnudger\.com$/.test(location.hostname);
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('consent', 'default', {analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  gtag('set', {allow_google_signals:false,allow_ad_personalization_signals:false});
  function readChoice() { try { return localStorage.getItem(key); } catch (_) { return null; } }
  function remember(value) { try { localStorage.setItem(key, value); } catch (_) {} }
  function enable() {
    if (!production || loaded) return;
    loaded = true;
    gtag('consent', 'update', {analytics_storage:'granted'});
    window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-5352PP36';
    document.head.appendChild(script);
  }
  function clearAnalyticsCookies() {
    document.cookie.split(';').forEach(function (cookie) {
      var name = cookie.split('=')[0].trim();
      if (/^_ga(?:_|$)|^_gid$|^_gat/.test(name)) {
        ['', '; domain=' + location.hostname, '; domain=.airnudger.com'].forEach(function (domain) {
          document.cookie = name + '=; Max-Age=0; path=/' + domain + '; SameSite=Lax';
        });
      }
    });
  }
  if (readChoice() === 'allow') enable();
  else if (!readChoice() && production && banner) banner.hidden = false;
  if (settings) settings.addEventListener('click', function () { banner.hidden = false; banner.querySelector('button').focus(); });
  document.querySelectorAll('[data-analytics-choice]').forEach(function (button) {
    button.addEventListener('click', function () {
      var choice = button.getAttribute('data-analytics-choice');
      remember(choice);
      banner.hidden = true;
      if (choice === 'allow') enable();
      else {
        gtag('consent','update',{analytics_storage:'denied'});
        clearAnalyticsCookies();
        if (loaded) location.reload();
      }
    });
  });
}());
