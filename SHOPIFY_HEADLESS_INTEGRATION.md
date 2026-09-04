# Shopify Headless Integration

This document outlines how the T-Core frontend integrates with Shopify as a headless commerce backend using the Storefront GraphQL API.

## Environment Variables
The following environment variables must be configured locally in your `.env` file and added to your Vercel project settings for the production deployment:

```env
VITE_SHOPIFY_STORE_DOMAIN=ptvhp5-sb.myshopify.com
VITE_SHOPIFY_API_VERSION=2025-01
VITE_SHOPIFY_STOREFRONT_TOKEN=f9dbfaee98fc4e9322849ef80d320cb5
```

> [!WARNING]
> **SECURITY WARNING:** NEVER expose a Shopify Admin API token in your frontend code or environment variables. The `VITE_SHOPIFY_STOREFRONT_TOKEN` is a PUBLIC token designed for client-side use. Admin API tokens carry read/write permissions for your entire store and must only be used securely on a backend server.

## Shopify Product Configuration
- **Product Handle:** `t-core`
- The UI options currently map strictly to three specific variants in Shopify:
  - `tcore-1-bottle` -> `Entry System | 1 Bottle` (ID: `gid://shopify/ProductVariant/47444059881647`)
  - `tcore-2-bottles` -> `Consistency System | 2 Bottles` (ID: `gid://shopify/ProductVariant/47444059914415`)
  - `tcore-3-bottles` -> `Full Reset System | 3 Bottles` (ID: `gid://shopify/ProductVariant/47444059947183`)

## Architecture & Flow
1. **Product Fetching:** In `HeroBuyBox.jsx`, the frontend queries Shopify for the `t-core` product. It maps the returned Variant IDs to the existing UI bundles.
2. **Cart State (Zustand):** `useCartStore.js` manages state and persists it to `localStorage` using the `biomen-shopify-cart` key. 
3. **Cart API:** When a user clicks "Add to Cart", the store calls `cartCreate` (if no cart exists) or `cartLinesAdd` (if a cart ID is already stored).
4. **Checkout URL Redirect:** When a user completes their shipping details on the `Checkout.jsx` page (or bypasses it via the Cart Drawer), they are redirected to Shopify's `checkoutUrl`, generated dynamically via the Cart API.

## Legacy MERN Backend
To safely maintain rollback capability, we did not delete the existing backend logic. The following routes and functionalities are preserved but disconnected from the frontend:
- `/orders` and `/orders/verify-payment` endpoints in the Express server.
- The Razorpay payment initialization flow inside `Checkout.jsx` (commented out).
- The `/products` catalog endpoint (the frontend now fetches straight from Shopify).

## How to Test
1. Make sure your local `.env` is configured.
2. Run the frontend `npm run dev`.
3. Add a bundle to the cart. Verify the Cart Drawer opens and reflects the item and price correctly.
4. Click **Secure Checkout**. You should be redirected directly to Shopify's checkout page for the store.

## What Works Before Payment Gateway Setup
- The frontend will load product availability and prices.
- You can add items to the cart, update quantities, and remove items.
- You can click checkout and reach the Shopify checkout page.
- At the Shopify checkout page, you will see a notice that payments are not yet available (unless you enable "Bogus Gateway" for testing).

## Required Shopify Configuration Before Launch
Before this integration can accept real orders:
1. **Payment Gateway:** Set up a payment provider (like Razorpay, Stripe, or Shopify Payments) in the Shopify Admin.
2. **Shipping Profiles:** Configure shipping rates and zones so customers can select shipping at checkout.
3. **Legal Pages:** Ensure policies (Refunds, Privacy, Terms) are linked in Shopify's checkout.

## Optional Future Webhook Integration
Currently, Shopify handles the checkout and order creation entirely. If your business requires the MERN backend to know when an order is placed (e.g., to sync with a custom CRM or send WhatsApp notifications):
- **Do not poll Shopify.** 
- Instead, configure a Shopify Webhook for `orders/create` in your Shopify Admin.
- Point the webhook to a secure Express endpoint (e.g., `POST /api/webhooks/shopify`).
- That endpoint must verify the Shopify HMAC signature using your Shopify App Secret to ensure the payload is authentic before syncing it to your database.
