# PWA Installation Guide

## What is PWA?
Progressive Web App (PWA) allows users to install Droplink as a native app on their devices.

## Features
- ✅ Install app on mobile and desktop
- ✅ Offline functionality with service worker
- ✅ App-like experience with standalone display
- ✅ Fast loading with caching
- ✅ Push notifications ready (can be added later)

## How to Install

### For Users:

#### On Android (Chrome/Edge):
1. Click the "Get App" button in the sidebar
2. Or tap the menu (⋮) → "Install app" or "Add to Home screen"
3. Confirm the installation

#### On iOS (Safari):
1. Tap the Share button (square with arrow)
2. Scroll down and tap "Add to Home Screen"
3. Name the app and tap "Add"

#### On Desktop (Chrome/Edge):
1. Click the "Get App" button in the sidebar
2. Or click the install icon in the address bar
3. Click "Install" in the popup

### For Developers:

#### Files Created:
1. **`/public/manifest.json`** - PWA manifest with app metadata
2. **`/public/sw.js`** - Service worker for offline functionality
3. **`/hooks/usePWAInstall.ts`** - Custom hook for install prompt
4. **`/components/PWARegister.tsx`** - Service worker registration component

#### How It Works:
1. The manifest.json defines app metadata (name, icons, colors, display mode)
2. Service worker (sw.js) caches resources for offline use
3. PWARegister component registers the service worker on app load
4. usePWAInstall hook captures the beforeinstallprompt event
5. "Get App" button triggers the install prompt

#### Testing PWA:
1. Build the app: `npm run build`
2. Start production server: `npm start`
3. Open in browser and test installation
4. Use Chrome DevTools → Application → Manifest to verify
5. Test offline mode by disabling network in DevTools

#### Customization:
- Update icons in `/public/images/` (recommended sizes: 192x192, 512x512)
- Modify manifest.json for different theme colors or app name
- Extend service worker for custom caching strategies
- Add push notification support if needed

## Browser Support
- ✅ Chrome (Android & Desktop)
- ✅ Edge (Android & Desktop)
- ✅ Safari (iOS 11.3+)
- ✅ Firefox (Android)
- ⚠️ iOS Safari has limited PWA features

## Notes
- HTTPS is required for PWA (works on localhost for development)
- Icons should be square and at least 192x192 and 512x512
- Service worker updates automatically when sw.js changes
