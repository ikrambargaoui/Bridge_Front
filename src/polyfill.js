// Polyfills (CRA / React 16)
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

// --- CustomEvent polyfill (au cas où ton code en dépend) ---
(function () {
  if (typeof window.CustomEvent === "function") return;

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

