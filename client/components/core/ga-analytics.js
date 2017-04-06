module.exports = (eventCategory, eventAction, eventLabel) => {
  if (!window.ga) return;
  ga('send', {
    hitType: 'event',
    eventCategory,
    eventAction,
    eventLabel,
    transport: 'beacon',
  });
};
