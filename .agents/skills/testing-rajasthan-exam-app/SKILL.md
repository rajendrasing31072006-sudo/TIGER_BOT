# Testing: Rajasthan Exam Preparation App

## App Overview
React 18 + Vite PWA for Rajasthan competitive exam preparation (BSTC/REET/Patwari). Firebase Authentication with Google Sign-In and Phone OTP. Admin role system based on email whitelist.

## Deployed App
- **Live URL:** https://dist-tkspaelv.devinapps.com
- **Repo:** `/home/ubuntu/repos/TIGER_BOT`
- **Branch:** `devin/1776055643-rajasthan-exam-app`
- **PR:** https://github.com/rajendrasing31072006-sudo/TIGER_BOT/pull/1

## Key Files
- `src/firebase.js` — Firebase config (real credentials for project `rajasthan-exam-app`)
- `src/context/AuthContext.jsx` — Auth logic, `ADMIN_EMAILS` whitelist, Google/Phone login functions
- `src/pages/Login.jsx` — Login page UI (Google button + Phone OTP form)
- `src/App.jsx` — Route protection (`ProtectedRoute`, `AdminRoute` wrappers)
- `src/pages/Home.jsx` — Admin card conditionally shown via `isAdmin`
- `src/components/Header.jsx` — Admin settings button conditionally shown via `isAdmin`

## Firebase Project
- **Project ID:** `rajasthan-exam-app`
- **Console:** https://console.firebase.google.com
- **Auth methods:** Google Sign-In (popup), Phone OTP (RecaptchaVerifier)
- **Authorized domains:** localhost, rajasthan-exam-app.firebaseapp.com, rajasthan-exam-app.web.app, devinapps.com

## Devin Secrets Needed
- `GOOGLE_PASSWORD` — User's Google account password (session-only, never save permanently)
- User's phone for 2FA approval (physical device, cannot be automated)

## Testing Procedures

### 1. Firebase Config Validation (No Login Required)
Verify Firebase initializes correctly without needing to complete login:
1. Navigate to the deployed app URL
2. Check browser console — should have NO `auth/invalid-api-key` or `auth/unauthorized-domain` errors
3. The `Failed to initialize reCAPTCHA Enterprise config` message is **expected** (Firebase falls back to reCAPTCHA v2)
4. Click "Google से लॉगिन करें" — a popup should open to `accounts.google.com` showing "to continue to rajasthan-exam-app.firebaseapp.com"
5. If the popup opens successfully, the Firebase apiKey, authDomain, and authorized domains are all valid

### 2. Route Protection (No Login Required)
1. Navigate directly to `/notes`, `/admin`, `/pdfs`, etc.
2. All should redirect to `/login`
3. The login page should render without Header or BottomNav

### 3. Phone Input Validation (No Login Required)
1. Type fewer than 10 digits — OTP button should be disabled (grayed out)
2. Type exactly 10 digits — OTP button should become enabled (blue)
3. Try typing letters or special characters — input should filter them out
4. Try typing more than 10 digits — input should cap at 10

### 4. Google Login + Admin Verification (Requires User's Phone)
**Constraint:** The user's Google account (`rajendrasing31072006@gmail.com`) has 2FA enabled on a Redmi Note 11S. You CANNOT complete Google login without the user physically approving on their phone.

**Workaround options:**
- Ask the user to log in themselves on the deployed app and share a screenshot
- Ask the user to approve the 2FA prompt while you drive the browser
- Verify the popup opens correctly (proves config is valid) without completing login

If you CAN complete login:
1. After Google login, verify redirect to home page (`/`)
2. Admin card "एडमिन" with ⚙️ icon should appear in category grid
3. Settings gear icon should appear in header
4. Navigate to `/admin` — should load the admin panel
5. Logout button should work and redirect to `/login`

### 5. Phone OTP Flow (May Have Limitations)
- Firebase Spark (free) plan may have SMS sending limits
- RecaptchaVerifier creates an invisible reCAPTCHA in `#recaptcha-container`
- After sending OTP, the form should switch to show a 6-digit OTP input
- Phone login does NOT grant admin access (no email to check against whitelist)

## Admin Role System
- Admin emails defined in `ADMIN_EMAILS` array in `src/context/AuthContext.jsx`
- Currently: `rajendrasing31072006@gmail.com`
- Admin-only UI: category card on Home, settings button in Header
- Admin-only route: `/admin` wrapped with `AdminRoute` (redirects non-admins to `/`)

## Build & Deploy
```bash
cd /home/ubuntu/repos/TIGER_BOT
npm install
npm run build
# Deploy uses: deploy tool with command="frontend" dir="dist"
```

## Common Issues
- **Google popup blocked:** Browser might block the popup if not triggered by a direct user click. Test on the deployed URL, not localhost.
- **reCAPTCHA errors on OTP:** If RecaptchaVerifier fails, check if the domain is in Firebase authorized domains.
- **Config placeholder values:** If login fails with `auth/invalid-api-key`, check `src/firebase.js` for placeholder values like `YOUR_API_KEY`.
- **Admin button visible to non-admins:** Fixed in commit f127162. Header.jsx now checks `isAdmin` before rendering the settings button.
