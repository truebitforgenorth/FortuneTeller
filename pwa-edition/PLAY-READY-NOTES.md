# Oracle of the Last Moon PWA Copy

This folder is the installable-web-app version of the project.

What's included:
- `manifest.webmanifest` for install metadata
- `sw.js` for offline caching
- `icons/` with app icons for install and maskable support
- updated `index.html` and `script.js` to register the PWA pieces

Recommended next steps:
1. Deploy this copy to Firebase Hosting or another HTTPS host.
2. Test installability in Chrome DevTools with Lighthouse.
3. Add screenshots and richer mobile UX if you want a stronger Play submission.
4. Wrap the hosted PWA in a Trusted Web Activity when you're ready for Android packaging.

Common path later:
1. Host the PWA
2. Verify the domain
3. Generate the Android wrapper
4. Build the Android App Bundle (`.aab`)
5. Upload to Play Console
