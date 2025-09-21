# Rapidex E‑Commerce

A full‑stack e‑commerce application built with Next.js (App Router), MongoDB, Redux Toolkit, and modern UI components. It includes an admin panel, product catalog, cart/checkout with Razorpay, authentication with email OTP verification, SEO tooling, and more.

## Features

- **Next.js App Router** with SSR/ISR for SEO‑friendly pages
- **Authentication** with email + OTP verification and JWT cookies
- **30‑day session** persistence (JWT and cookie configured)
- **Admin Panel** for managing products, categories, media, orders, coupons
- **Cart & Checkout** with coupon support and **Razorpay** payments
- **Order management** and order confirmation emails
- **SEO**: dynamic metadata, sitemap, robots.txt, Open Graph, analytics
- **Theming** with dark mode support in admin UI
- **File uploads** via Cloudinary (or your configured storage)

## Tech Stack

- **Frontend**: Next.js 14, React 18
- **State**: Redux Toolkit + redux‑persist
- **UI**: Tailwind CSS, Shadcn components, MUI (for admin datatable)
- **Backend**: Next.js API Routes, Mongoose/MongoDB
- **Payments**: Razorpay
- **Email**: Nodemailer (templated HTML emails)
- **Auth**: `jose` for JWT signing/verification

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or cloud)
- Razorpay keys
- SMTP credentials for sending emails

### Installation

```bash
npm install
```

### Environment Variables

Copy `env-example.txt` to `.env` and fill in values:

```
# App/site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

# Security
SECRET_KEY=your_super_secret_key

# Analytics (optional)
GOOGLE_ANALYTICS_ID=
GOOGLE_TAG_MANAGER_ID=
FACEBOOK_PIXEL_ID=
GOOGLE_SITE_VERIFICATION=

# Database
MONGODB_URI=mongodb+srv://...

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Mail
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM_NAME=Rapidex Engg. Services
SMTP_FROM_EMAIL=no-reply@yourdomain.com
```

### Development

```bash
npm run dev
```

App will be available at http://localhost:3000

### Build & Start

```bash
npm run build
npm start
```

## Important Paths

- **Root layout**: `app/layout.jsx`
- **Website**: `app/(root)/(website)/`
- **Admin**: `app/(root)/(admin)/admin/`
- **Auth**: `app/(root)/auth/`
- **API Routes**: `app/api/**`
- **Email Templates**: `email/`
- **SEO Utilities**: `lib/seo.js`
- **Redux Store**: `store/store.js`

## Authentication & Session

- JWT created in `app/api/auth/verify-otp/route.js`:
  - `setExpirationTime('30d')` ensures a 30‑day token validity.
  - Cookie configured with `maxAge: 60 * 60 * 24 * 30`.
- Verification/guard helper: `lib/authentication.js`

## Payments (Razorpay)

- Checkout: `app/(root)/(website)/checkout/page.jsx`
- Order save + email: `app/api/payment/save-order/route.js`
- After a successful payment, an order confirmation email is sent using the `orderNotification` template.

## Emails

- Order confirmation template: `email/orderNotification.js`
  - Updated with Rapidex branding and CTA styles
- Email verification/OTP: `email/emailVerificationLink.js`, `email/otpEmail.js`
- Mail sender config: `lib/sendMail.js` (From name set to "Rapidex Engg. Services")

## SEO & Analytics

- Central SEO config: `lib/seo.js`
- Analytics components: `components/SEO/Analytics.jsx`
- Sitemap: `next-sitemap.config.js` and `app/sitemap.js`
- Robots: `app/robots.txt`

## Recent Customizations

- **Branding updates**: Replaced legacy names with Rapidex across placeholders, emails, admin footer, and Razorpay display name.
- **Order email**: Restyled `orderNotification.js` to match Rapidex theme.
- **Order pages**: Removed banners/breadcrumbs from order details pages.
- **Session length**: Extended to 30 days.
- **Hydration warning**: Added `suppressHydrationWarning` on `<body>` in `app/layout.jsx` to ignore benign extension‑injected attributes.

## Troubleshooting

- **Hydration mismatch warnings**: Often caused by browser extensions injecting attributes. Suppressed at the layout level; if you see new mismatches, check for `Date.now()`, `Math.random()`, or locale‑dependent rendering in Client Components.
- **Auth issues**: Ensure `SECRET_KEY` is set and consistent between sign and verify; verify cookies are present.
- **Emails not sending**: Check SMTP credentials in `.env`. Review `lib/sendMail.js` logs and template usage.
- **Razorpay errors**: Validate `NEXT_PUBLIC_RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.

## Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## License

This project is private and proprietary to Rapidex. All rights reserved.
