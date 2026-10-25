/* The store switch. When a store opens, set live to true and fill in its url:
   the badges, the main button, the FAQ and /get all follow from this one object.
   iOS: paste the App Store link (https://apps.apple.com/app/id...) once the app is approved. */
window.STORES = {
  ios: { live: false, url: '' },
  android: { live: false, url: 'https://play.google.com/store/apps/details?id=com.hugosheehan.atlasapp' }
};
