# dzenCode Test Task — Orders & Products (INVENTORY SPA)

Full-stack Single Page Application (SPA) for inventory management, featuring Orders, Products, live WebSocket session tracking, multilingual localization, and responsive split-view master-detail panels.

---

## Tech Stack

### Front-End
- **Framework**: Next.js 16 (App Router, Server & Client Components)
- **Language**: TypeScript
- **State Management**:
  - **Redux Toolkit**: Client session state (JWT authentication, Socket.io active browser session counter)
  - **TanStack Query (React Query v5)**: Server state cache, deduplication, and optimistic cache invalidation
  - **TanStack Table v9**: Type-safe headless table columns and layouts
- **Styling & Motion**: Tailwind CSS v4, Animate.css, CSS Variables (Design Tokens)
- **Icons**: Lucide React
- **WebSockets**: Socket.io-client
- **Localization (i18n)**: English (`en`) & Russian (`ru`) with pluralization rules
- **Testing**: Vitest, React Testing Library, jsdom

### Back-End
- **Framework**: NestJS 12 (Modular architecture, Guards, Pipes, Gateways)
- **Language**: TypeScript
- **ORM & Database**: Prisma ORM with PostgreSQL 16
- **Real-Time Gateway**: Socket.io / WebSockets for live active session tracking
- **Authentication**: Passport JWT + bcrypt password hashing
- **Testing**: Vitest

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database Schema**: MySQL Workbench schema export (`database-schema.sql`) and PostgreSQL Prisma migrations

---

## Project Structure

```text
dzenCode-test-app/
├── back-end/               # NestJS REST API and Socket.io Gateway
│   ├── prisma/             # Database schema, seed data, and migrations
│   └── src/                # Auth, Orders, Products, Sessions, Users modules
├── front-end/              # Next.js SPA application
│   ├── src/app/            # App router pages (/orders, /products, etc.)
│   ├── src/components/     # Layout, common, orders, products components
│   ├── src/contexts/       # i18n context & provider
│   ├── src/hooks/          # TanStack query hooks (useOrders, useProducts)
│   ├── src/lib/            # Axios API client, formatting utilities
│   ├── src/store/          # Redux Toolkit store and slices
│   └── src/types/          # Shared domain TypeScript types
├── database-schema.sql     # MySQL Workbench compatible SQL schema
├── docker-compose.yml      # Multi-container orchestration
└── package.json            # Monorepo workspaces definition
```

---

## Quick Start (Docker)

The fastest way to launch the entire application (PostgreSQL, Backend API, and Frontend) is using Docker Compose:

```bash
docker compose up --build -d
```

### Accessing the App

| Service | URL | Notes |
| :--- | :--- | :--- |
| **Front-End UI** | `http://localhost:3001` | Main SPA application |
| **Back-End API** | `http://localhost:3000` | REST API & WebSocket server |
| **PostgreSQL** | `localhost:5432` | Database (`dzencode_db`) |

### Default Credentials

Use the following seeded credentials to log in:

- **Email**: `alex@dzencode.com`
- **Password**: `password123`

---

## Local Development (Without Docker)

### 1. Install Dependencies

From the project root:

```bash
npm install
```

### 2. Configure Environment

Create `.env` in `back-end`:
```env
PORT=3000
DATABASE_URL="postgresql://dzencode:dzencode_pass@localhost:5432/dzencode_db?schema=public"
JWT_SECRET="super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
CORS_ORIGIN="http://localhost:3001"
```

Create `.env.local` in `front-end`:
```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_WS_URL="http://localhost:3000"
```

### 3. Database Setup & Seeding

```bash
# Generate Prisma Client
npm run prisma:generate --workspace=back-end

# Apply schema migrations
npm run prisma:migrate --workspace=back-end

# Seed database with sample Orders and Products
npm run prisma:seed --workspace=back-end
```

### 4. Run Development Servers

```bash
# Start backend (NestJS dev mode)
npm run dev:back

# In a separate terminal, start frontend (Next.js dev mode)
npm run dev:front
```

---

## Running Tests

All unit and integration tests across both frontend and backend can be executed with a single command from the root:

```bash
# Run tests across all workspaces
npm test

# Run frontend tests only
npm run test --workspace=front-end

# Run backend tests only
npm run test --workspace=back-end
```

### Test Coverage Highlights:
- **Front-End**: Tests for date formatting, dual currency pricing aggregation (`getOrderTotalPrices`), Russian/English pluralization (`getProductsCountLabel`), common `Button` variants, `Select` dropdown, and `DeleteModal`.
- **Back-End**: Unit tests for `OrdersService`, `ProductsService`, `UsersService`, `AuthService`, and `SessionsGateway`.

---

## Implemented Specification Features

### 1. TopMenu Navigation & Real-time Metrics
- Real-time running clock (day of week, full date, hours and minutes).
- Real-time active browser sessions counter powered by Socket.io.
- Header search bar and instant language switcher (`RU` / `EN`).

### 2. Orders Page (`/orders`)
- Table list displaying Order title, item count with grammatical pluralization, dual creation dates (short & long), and total prices aggregated in USD and UAH.
- Interactive split view: clicking an order opens the side-by-side details card showing the full item list and "+ Add product" action.
- Floating round close button to collapse the details panel back to the full table.
- Delete confirmation modal displaying the order title and all included products.

### 3. Products Page (`/products`)
- Data table displaying status dot indicator (`FREE` / `IN_REPAIR`), serial number, guarantee dates (start & end), price in both currencies, and parent order name.
- Single select filter by product type (`Тип:`).
- Delete confirmation modal.

### 4. Database Schema
- File `database-schema.sql` can be opened directly in **MySQL Workbench** (`File -> Import -> Reverse Engineer MySQL Create Script...`) to inspect relational diagrams.

### 5. Progressive Web App (PWA)
- **Web App Manifest**: Auto-generated via `manifest.ts` with standalone display, theme color (`#8bc34a`), and multi-resolution icons (`192x192`, `512x512`, `512x512` maskable, SVG, Apple Touch Icon).
- **Service Worker (`sw.js`)**: Caches static assets, routes, and provides a customized offline fallback page (`offline.html`).
- **Offline UX**: Live network detection with an animated offline banner when internet connection is lost.

### 6. Responsive Adaptive Design
- **Mobile Navigation Drawer**: Off-canvas sliding sidebar menu with overlay backdrop and hamburger toggle button on viewports `< 1024px`.
- **Fluid TopMenu**: Adaptive search width, condensed time/session counters, and clean breakpoints.
- **Adaptive Split View**: Master-detail view smoothly transitions between full-screen order details on mobile (`< 768px`) and side-by-side split view on tablet/desktop (`>= 768px`).
- **Scrollable Data Tables**: Horizontal scroll wrapper for wide data tables on narrow mobile displays.

---

## Possible Improvements (Beyond Task Scope)

The following architectural and feature enhancements can be introduced for enterprise production readiness:

1. **Cloud Object Storage for Product Media**:
   - Replace placeholder icons with cloud storage (AWS S3, Cloudflare R2, or Google Cloud Storage).
   - Implement presigned upload URLs in NestJS and on-the-fly image optimization/thumbnail generation (e.g., using `sharp` or an image CDN).

2. **Dedicated Database Tables & Endpoints for Product Types & Specifications**:
   - Normalize product types (e.g., Monitors, Laptops, Phones) and specifications into standalone relational tables (`ProductType`, `ProductSpecification`) with full CRUD REST endpoints instead of hardcoded strings or enums.
   - Enable dynamic management of categories and custom attribute schemas per product type.

3. **Server-Side Pagination, Filtering & Full-Text Search**:
   - Introduce cursor-based or offset pagination on `/orders` and `/products` endpoints to efficiently handle large-scale datasets.
   - Add database-level indexing and full-text search (PostgreSQL `tsvector` or search engines like Meilisearch/Elasticsearch) for the top navigation search bar.

4. **Role-Based Access Control (RBAC) & Audit Logging**:
   - Introduce user roles (`Admin`, `Manager`, `Viewer`) with granular permission guards on sensitive endpoints (e.g., deleting orders or modifying inventory).
   - Track inventory alterations in an `AuditLog` table capturing timestamp, user ID, and diffs.

5. **End-to-End (E2E) Testing & CI/CD Pipeline**:
   - Implement Playwright or Cypress E2E test suites covering core user flows (login, split-view navigation, order deletion, filter switching, PWA offline behavior).
   - Set up GitHub Actions CI for automated linting, unit test execution, Docker container image builds, and automated deployments.

6. **Implementing Remaining Functional Stubs & CRUD Flows**:
   - **Order & Product Creation Forms**: Add interactive modals/drawers for the `+` button in the Orders header and the `+ Add product` button inside the split-view details panel, complete with client validation and backend creation endpoints.
   - **Additional Navigation Sections**: Build out full functionality for placeholder pages (`/groups` for inventory grouping, `/users` for team and profile management, and `/settings` for app configuration).
   - **Multi-Criteria Filtering**: Add the secondary `Спецификация:` dropdown filter indicated in the mockup designs for advanced product querying.

