# ShopFlow E-Commerce

## Current State
New project. Empty Motoko backend and default React frontend scaffold.

## Requested Changes (Diff)

### Add
- Product catalog with categories, images, pricing, stock management
- Shopping cart (add/remove/update quantity)
- User authentication (login/register via Internet Identity)
- Product detail page
- Checkout flow with Stripe payment integration
- Order history for logged-in users
- Admin panel for managing products and orders
- Hero banner and featured products on homepage

### Modify
- Replace default frontend with full e-commerce UI

### Remove
- Default placeholder content

## Implementation Plan
1. Motoko backend: product CRUD, cart management, order storage, admin role check
2. Stripe integration for checkout payments
3. Authorization for user login and admin gating
4. React frontend: homepage, product grid, product detail, cart sidebar, checkout, order history, admin dashboard
