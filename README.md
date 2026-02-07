# EcoVerify 2026

## Quick Start

1. Install dependencies: `npm install`
2. (Optional) Create `.env` from `.env.example` and add your News API key.
3. Start the news API: `npm run dev:server`
4. Start the client: `npm run dev`

The frontend expects the news API on `http://localhost:8787` (proxied as `/api/news`).

## Routing

- `/` Marketing landing
- `/app` Application shell
- `/app/onboarding` Onboarding flow
- `/app/dashboard` Dashboard

## Stripe Setup (Production)

1. Create a Stripe account and copy your Publishable Key from the Stripe Dashboard.
2. Add the key to a `.env` file as `VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...` and restart the dev server.
3. Create a backend endpoint (for example `/api/create-checkout-session`) that calls Stripe to create a Checkout Session with your product and price IDs.
4. In `src/components/app/PricingModal.tsx`, replace the placeholder `Select plan` action with a call to your backend endpoint and redirect the user to the Stripe Checkout URL returned.
5. Configure Stripe webhooks for `checkout.session.completed` and store the resulting subscription or payment status in your database.

## Stack

- React + Vite + TypeScript
- Tailwind CSS
- Lucide React Icons
- Recharts
- Framer Motion
