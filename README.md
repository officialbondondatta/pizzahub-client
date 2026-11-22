# PizzaHub

PizzaHub is a pizza marketplace where customers browse menus and request deliveries, vendors manage their menu items and customer orders, and administrators review listings, manage users, and view payment transactions.

This repository contains the Next.js frontend, authentication integration, server actions, and Stripe Checkout route. It connects to a separate backend API for menu items, orders, users, and payments.

## Project links

| Resource          | Link                                                   |
| ----------------- | ------------------------------------------------------ |
| Live website      | To be added                                            |
| Live backend API  | To be added                                            |
| Client repository | https://github.com/officialbondondatta/pizzahub-client |
| Server repository | To be added                                            |

## Features

- Homepage sections for six featured approved/active items, pizza categories, Why Choose PizzaHub, How PizzaHub Works, and Pizza Lovers’ Tips.
- Category links open filtered menu results; viewing individual item details requires sign-in.
- Email/password and Google authentication, with customer and vendor registration.
- Separate customer, vendor, and administrator dashboards.
- Menu browsing with name search, category and location filters, and ascending/descending price sorting.
- Item details with images, descriptions, prices, locations, and vendor business names.
- Delivery requests with a delivery date, address, and optional message.
- Customer order history, order details, and cancellation of pending orders.
- Vendor menu creation, image uploads, editing, deletion, and availability controls.
- Vendor order management with customer details and accept/reject actions for pending orders.
- Administrator menu approval/rejection, user search and role filtering, blocking/unblocking, and vendor profile dialogs.
- Free/premium plan UI, Stripe Checkout, payment verification, and an administrator transaction table.
- Newest-first menu and order lists; date/time displays use `Asia/Dhaka`.
- Responsive tables, loading/error/empty states, toast feedback, and theme support.

## Technology stack and packages

| Area            | Technologies / npm packages                                                              |
| --------------- | ---------------------------------------------------------------------------------------- |
| Application     | Next.js 16, React 19, React DOM, TypeScript                                              |
| Styling         | Tailwind CSS 4, `@tailwindcss/postcss`, `tw-animate-css`                                 |
| UI              | shadcn/ui components, `@base-ui/react`, `lucide-react`, `class-variance-authority`, `cn` |
| Authentication  | `better-auth`, `@better-auth/mongo-adapter`                                              |
| Database access | `mongodb`                                                                                |
| Payments        | `stripe`, `@stripe/stripe-js`                                                            |
| Themes          | `next-themes`                                                                            |
| Code quality    | ESLint, `eslint-config-next`, Prettier, `prettier-plugin-tailwindcss`                    |
| Image hosting   | ImgBB upload API                                                                         |

See `package.json` and `package-lock.json` for package versions.

## Installation and local development

### Prerequisites

- Node.js 20.9 or newer and npm.
- A MongoDB connection. The application uses the `pizzahub` database.
- The separate PizzaHub backend API, running locally or hosted.
- Google OAuth credentials, an ImgBB API key, and Stripe test credentials for those integrations.

### Setup

1. Clone the client repository and install dependencies:

   ```bash
   git clone https://github.com/officialbondondatta/pizzahub-client.git
   cd pizzahub-client
   npm install
   ```

2. Create `.env.local` in the project root using the variables below. Replace placeholder values with your own configuration.

3. Start the separate backend using its repository instructions. Set `NEXT_PUBLIC_BETTER_AUTH_URL` to that API's origin. The backend must be configured to work with the same authentication/session data and relevant MongoDB records.

4. Start the frontend:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000`. Register a customer or vendor to explore the corresponding dashboard. Administrator access requires an existing admin account; public registration does not offer the admin role.

For Google sign-in, configure the application's origin and the callback URL `http://localhost:3000/api/auth/callback/google` in your OAuth application. Use the deployed frontend origin when configuring production.

For payment testing, configure a Stripe Price ID compatible with the current one-time Checkout `payment` mode. The separate backend handles checkout verification and must have the matching payment configuration.

### Environment variables

```dotenv
# Frontend / authentication origin
NEXT_PUBLIC_BASE_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=replace-with-a-random-secret

# Separate backend API origin (despite the variable's name)
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8001

# Server-side MongoDB connection
MONGODB_URI=replace-with-your-mongodb-connection-string

# Google OAuth
GOOGLE_CLIENT_ID=replace-with-your-google-client-id
GOOGLE_CLIENT_SECRET=replace-with-your-google-client-secret

# Browser-side image upload key
NEXT_PUBLIC_IMGBB_API=replace-with-your-imgbb-key

# Server-side Stripe configuration
STRIPE_SECRET_KEY=replace-with-your-stripe-test-secret-key
STRIPE_PRICE_ID=replace-with-your-stripe-price-id
```

| Variable                                   | Purpose                                                                                                                      |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_BASE_URL`                     | Frontend origin referenced by the auth client configuration.                                                                 |
| `BETTER_AUTH_URL`                          | Authentication base URL for Better Auth. Auth endpoints are hosted by this Next.js application.                              |
| `BETTER_AUTH_SECRET`                       | Secret used by Better Auth.                                                                                                  |
| `NEXT_PUBLIC_BETTER_AUTH_URL`              | Base URL used by menu, order, user, and payment API calls. This points to the separate backend, not the frontend auth route. |
| `MONGODB_URI`                              | MongoDB access for authentication and vendor business-name lookups.                                                          |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google sign-in credentials.                                                                                                  |
| `NEXT_PUBLIC_IMGBB_API`                    | ImgBB key used by menu image upload forms.                                                                                   |
| `STRIPE_SECRET_KEY`                        | Creates and retrieves Stripe Checkout sessions on the server.                                                                |
| `STRIPE_PRICE_ID`                          | Price used when creating a premium-plan checkout session.                                                                    |

Keep `.env.local` out of version control. Variables prefixed with `NEXT_PUBLIC_` are available to browser code; database, auth, Google client secrets, and Stripe secret keys must remain server-side.

### Available commands

| Command             | Purpose                                        |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Start the development server.                  |
| `npm run build`     | Create a production build.                     |
| `npm start`         | Serve the production build after building.     |
| `npm run typecheck` | Check TypeScript types without emitting files. |
| `npm run lint`      | Run ESLint.                                    |
| `npm run format`    | Format TypeScript and TSX files with Prettier. |

## Implementation notes

### 1. Authentication, middleware, and role access

Authentication is configured in `app/lib/auth.ts` with Better Auth and its MongoDB adapter. `/api/auth/[...all]` exposes the auth handler. Additional user fields include role, plan, block status, and business name. A creation hook requires a business name for vendor registration, including Google registration.

The middleware flow is implemented with Next.js's `proxy.ts` convention:

1. Requests to matched protected paths, including dashboards, profiles, item details, and payment result pages, enter the proxy.
2. The proxy reads the current session with cookie caching disabled, so block-status checks use current account data.
3. Missing sessions redirect to `/sign-in?access=sign-in-required`; blocked accounts redirect to `/unauthorized?access=blocked`.
4. Allowed requests continue. Each role-specific dashboard layout then calls `requireRoleFromSession` to verify customer, vendor, or admin access.
5. `AccessToast` reads the `access` query parameter to display feedback and removes it from the URL afterward.

Server actions retrieve the session token and attach `Authorization: Bearer <token>` to protected backend requests. Backend endpoints must independently validate authorization; frontend filtering is not a security boundary.

### 2. Menu search, filters, sorting, and API parameters

The browse page loads `GET /menu-items`, keeps accepted and active items, and supplies them to `BrowseMenu`. Name search is case-insensitive; category and location use exact matches. These filters are combined locally in React, and price sorting applies a numeric comparator to the filtered array. Reset restores the filters and the default newest-first order.

Search, category, location, and price sorting currently do **not** send query parameters to the API. The menu API uses path parameters for vendor and item lookups:

| Method | Backend route                  | Purpose                      |
| ------ | ------------------------------ | ---------------------------- |
| GET    | `/menu-items`                  | Load menu items.             |
| GET    | `/menu-items/:vendorId`        | Load a vendor's menu items.  |
| GET    | `/menu-items/details/:id`      | Load one item's details.     |
| POST   | `/menu-items`                  | Create a menu item.          |
| PATCH  | `/menu-items/:id`              | Update editable item fields. |
| PATCH  | `/menu-items/availability/:id` | Update availability.         |
| PATCH  | `/menu-items/status/:id`       | Update the review status.    |
| DELETE | `/menu-items/:id`              | Delete an item.              |

Menu uploads use ImgBB's `/1/upload?key=...` endpoint with multipart form data. The returned image URL is included in the menu payload. Business names are joined to items through vendor IDs; admin vendor dialogs use matching users with the vendor role.

### 3. Delivery requests and order management

The order form sends the item, vendor, customer, delivery date, delivery address, and optional message to `POST /order`. Customer history loads `GET /order/:userId`. The vendor page loads `GET /order` and filters records by the signed-in vendor's ID.

Vendors update pending orders through `PATCH /order/:id`; customers cancel through `PATCH /order/cancel/:id`. Successful mutations refresh the route so server-rendered data updates. Clicking an item in the vendor's orders table navigates to `/browse-menu/:id`.

`deliveryDate` means the requested delivery day. `createdAt` means when the order was placed. Request dates show the date and time on separate lines.

### 4. Optional timestamps and backward compatibility

Menu items, orders, and transactions support optional `createdAt` timestamps from the API. Menu and order sorting uses those timestamps, falling back to the timestamp embedded in a valid MongoDB ObjectId for older records. Sorting operates on a copied or filtered array rather than mutating incoming data.

Missing or invalid displayed dates show “Not available.” Transaction dates prefer `createdAt`, with `payment_date` as a fallback for older responses. All displayed times use `Asia/Dhaka`. Add/edit menu forms do not set or overwrite creation timestamps.

### 5. Stripe Checkout and transaction history

The premium upgrade submits to the local `POST /api/checkout_sessions` route. It creates a Stripe Checkout session using the configured Price ID, the user's email, and user ID metadata, then redirects to Stripe.

Stripe returns to `/payment/success?session_id=...` or `/payment/cancel?session_id=...`. The success page validates the `session_id` query parameter and retrieves the session from Stripe. A completed, paid session is sent to the backend's `POST /payment/checkout-verify` with `{ sessionId }` for verification. Open or expired sessions follow the appropriate redirect flow.

The administrator transaction page loads `GET /transactions`, matches vendor IDs to user data, and displays the plan, amount, status, and transaction timestamp. Amounts are currently rendered in USD after converting from minor units. Checkout currently uses one-time `payment` mode, not recurring Stripe subscription mode.

### 6. User management and response feedback

The admin users page loads `GET /users` and passes selected profile fields to its client table. Search and role filtering run locally. Blocking/unblocking calls `PATCH /users/block/:id`; response messages such as “User not found” are displayed in a toast. Network failures receive fallback feedback, and successful updates refresh the view.

## Project structure

```text
app/
  (auth)/                  Sign-in and registration pages
  (site)/                  Public pages, menu details, profile, payment results
  api/                     Better Auth handler and Stripe Checkout route
  components/              Menu, order, user, transaction, and dashboard UI
  dashboard/
    admin/                 Users, menu review, and transactions
    customer/              Customer overview and order history
    vendor/                Menu management, customer orders, and plans
  lib/
    actions/               Backend API calls and server actions
    core/                  Session and role guards
  Types/                   Shared TypeScript interfaces
components/ui/             Reusable UI primitives
proxy.ts                   Protected-route session and block checks
```
