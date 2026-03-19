## Source Map

- `src/app`
  - app bootstrap only
  - app shell and router setup
  - `app/App.jsx`: global shell, navbar/footer visibility, router mount
  - `app/routes`: route grouping for public, auth, buyer, dashboard, fallback

- `src/pages/public`
  - public website pages only
  - home, about, services, contact, and service detail pages

- `src/store`
  - all Redux files in one place
  - `store/index.js`: root store
  - `store/auth`: auth slice, thunks, selectors, storage
  - `store/ui`: global UI slices like toasts

- `src/features/auth`
  - authentication only
  - pages: login, register, OTP, password reset
  - api: backend auth requests
  - hook: `useAuth`
  - backend integration owned here:
    - register
    - login
    - logout
    - email/phone OTP verify and resend
    - forgot password
    - reset password

- `src/features/profile`
  - current authenticated user profile only
  - api:
    - `/api/v1/me`
    - `/api/v1/verification-status`
    - `/api/v1/change-password`
  - hook: `useCurrentProfile`
  - components:
    - `ProfileSettings`
    - `VerificationBadge`
  - utils:
    - normalize backend user shape
    - normalize verification-status response

- `src/features/buyer`
  - buyer-facing pages only
  - buyer profile UI lives here
  - buyer profile data comes from `features/profile`

- `src/features/kyc`
  - KYC pages and future KYC API/store code

- `src/features/listings`
  - listing-related feature state and future APIs

- `src/features/properties`
  - property pages, property UI components, property data

- `src/dashboards`
  - role dashboards only
  - `admin/pages`
  - `agent/pages`
  - `seller/pages`
  - `components`: dashboard-only shared UI

- `src/shared`
  - reusable cross-feature code only
  - `api/client.js`: shared fetch client
  - `components`: navbar, footer, protected route, toast container
  - `hooks`: cross-feature hooks like `useToast`
  - `layouts`: reusable layouts

## Rules

- If it is a public website page, put it in `src/pages/public`.
- If it is Redux state, put it in `src/store`.
- If code talks to login/register/OTP/session, put it in `features/auth`.
- If code talks to current-user profile state, verification status, or change-password, put it in `features/profile`.
- If code is only for buyer screens, put it in `features/buyer`.
- If code is only for a dashboard role, put it in `dashboards/<role>`.

## Current Patterns

- Auth pages do not own raw fetch calls. They go through:
  - page -> `useAuth` -> auth thunk -> auth API -> shared API client
- Profile pages do not call backend endpoints inline. They go through:
  - page -> `useCurrentProfile` / shared profile component -> profile API
- Navbar and footer are hidden on auth pages:
  - `/login`
  - `/register`
  - `/forgot-password`
  - `/reset-password`
