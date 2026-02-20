# CrestFoods - Restaurant Website with Admin Dashboard

A full-stack restaurant website built with Next.js, featuring a modern KFC-Australia-inspired design, online ordering, Stripe payment integration, and a complete WordPress-style admin dashboard.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js (JWT sessions)
- **Payments**: Stripe
- **State Management**: Zustand (cart)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your settings

# Generate Prisma client, create database, and seed data
npm run setup
```

### Development

```bash
npm run dev
```

Visit:
- **Frontend**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin

### Default Admin Credentials

- **Email**: admin@crestfoods.com.au
- **Password**: admin123

## Features

### Frontend
- **Home Page**: Hero banner, category cards, featured products, features section
- **Menu Page**: Category filtering, product grid with add-to-cart
- **Product Detail**: Full product info, size/flavor selectors, quantity picker
- **Cart**: Quantity editing, item removal, order summary
- **Checkout**: Contact info, delivery/pickup selection, payment method, order placement
- **Order Confirmation**: Order summary, receipt, next steps

### Admin Dashboard
- **Dashboard**: Stats overview (categories, products, orders, revenue), recent orders
- **Categories Management**: Add, edit, delete categories with custom colors and images
- **Products Management**: Full CRUD with category assignment, pricing, availability toggle
- **Orders Management**: View all orders, update status (pending/preparing/ready/completed), customer details
- **Site Settings**: Hero content, delivery fees, contact info, opening hours, about text

### Online Ordering
- Add to cart from menu or product detail page
- Choose delivery or store pickup
- Configurable delivery fees (set in admin)
- Stripe payment integration (card payments)
- PayPal and pay-on-collection options
- Order confirmation with receipt

## Project Structure

```
src/
├── app/
│   ├── admin/              # Admin dashboard pages
│   │   ├── login/          # Admin login
│   │   ├── dashboard/      # Stats overview
│   │   ├── categories/     # Category CRUD
│   │   ├── products/       # Product CRUD
│   │   ├── orders/         # Order management
│   │   └── settings/       # Site settings
│   ├── api/                # API routes
│   │   ├── auth/           # NextAuth.js
│   │   ├── categories/     # Category endpoints
│   │   ├── products/       # Product endpoints
│   │   ├── orders/         # Order endpoints
│   │   ├── settings/       # Settings endpoints
│   │   └── checkout/       # Checkout + payment
│   ├── menu/               # Menu page
│   ├── product/[slug]/     # Product detail
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout flow
│   ├── confirmation/       # Order confirmation
│   └── page.tsx            # Home page
├── components/             # Shared components
├── lib/                    # Utilities (prisma, auth, stripe)
└── store/                  # Zustand cart store
prisma/
├── schema.prisma           # Database schema
└── seed.ts                 # Seed data
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/categories | List all categories |
| POST | /api/categories | Create category (auth) |
| GET | /api/categories/[id] | Get category with products |
| PUT | /api/categories/[id] | Update category (auth) |
| DELETE | /api/categories/[id] | Delete category (auth) |
| GET | /api/products | List products (filter by category) |
| POST | /api/products | Create product (auth) |
| GET | /api/products/[id] | Get product by ID or slug |
| PUT | /api/products/[id] | Update product (auth) |
| DELETE | /api/products/[id] | Delete product (auth) |
| GET | /api/orders | List all orders (auth) |
| GET | /api/orders/[id] | Get order details |
| PUT | /api/orders/[id] | Update order status (auth) |
| POST | /api/checkout | Create order + payment |
| GET | /api/settings | Get all site settings |
| PUT | /api/settings | Update settings (auth) |

## Database Schema

- **User**: Admin users (email, hashed password, role)
- **Category**: Menu categories (name, slug, colors, image, sort order)
- **Product**: Menu items (name, price, description, image, ingredients, allergens, sizes, flavors)
- **Order**: Customer orders (contact info, delivery details, payment, status)
- **OrderItem**: Individual items in an order
- **SiteSetting**: Key-value pairs for site configuration

## Stripe Integration

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe dashboard
3. Add to `.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
4. Card payments will create Stripe PaymentIntents automatically

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Set environment variables in Vercel dashboard. For production, use PostgreSQL instead of SQLite:
1. Update `prisma/schema.prisma` provider to `"postgresql"`
2. Set `DATABASE_URL` to your PostgreSQL connection string

### Self-hosted

```bash
npm run build
npm start
```
