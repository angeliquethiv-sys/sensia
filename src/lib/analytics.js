/* ── Analytics SENSIA (Mixpanel) ── */
let mp = null;

try {
  const token = process.env.REACT_APP_MIXPANEL_TOKEN;
  if (token) {
    // eslint-disable-next-line
    const mixpanel = require('mixpanel-browser');
    mixpanel.init(token, { debug: false, track_pageview: true });
    mp = mixpanel;
  }
} catch (e) {
  // Mixpanel non disponible
}

const base = () => ({
  timestamp:  new Date().toISOString(),
  langue:     localStorage.getItem('i18nextLng') || 'fr',
  app:        'SENSIA',
});

export const track = (event, props = {}) => {
  if (!mp) return;
  try { mp.track(event, { ...base(), ...props }); } catch (e) {}
};

export const identify = (userId, traits = {}) => {
  if (!mp) return;
  try {
    mp.identify(userId);
    if (Object.keys(traits).length) mp.people.set(traits);
  } catch (e) {}
};

export const reset = () => {
  if (!mp) return;
  try { mp.reset(); } catch (e) {}
};

/* ── Events nommés ── */
export const Events = {
  ONBOARDING_STARTED:    'onboarding_started',
  PROFILE_SELECTED:      'profile_selected',
  SESSION_STARTED:       'session_started',
  SESSION_COMPLETED:     'session_completed',
  SESSION_ABANDONED:     'session_abandoned',
  PREMIUM_CLICKED:       'premium_clicked',
  PREMIUM_SUBSCRIBED:    'premium_subscribed',
  BELT_CONNECTED:        'belt_connected',
  MODULE_OPENED:         'module_opened',
  EXERCISE_VIEWED:       'exercise_viewed',
  AUTH_SIGNUP:           'auth_signup',
  AUTH_LOGIN:            'auth_login',
  AUTH_LOGOUT:           'auth_logout',
};
