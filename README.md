

# 🏦 PaisaHiPaisa – Digital Wallet System

**PaisaHiPaisa** is a **modern digital wallet (MFS) platform** inspired by services like bKash and Nagad. Built with **React, TypeScript, Vite, Redux Toolkit, and TailwindCSS**, it enables users to securely manage finances through role-based dashboards for **Users, Agents, and Admins**.

🌐 **Live Demo**: [https://paisa-hi-paisa-two.vercel.app/](https://paisa-hi-paisa-two.vercel.app/)

---

## ✨ Features

### 👤 **User**
- Register & login (email + password)
- Add money via payment gateway
- Withdraw funds through agents
- Send money to other users
- View wallet balance & transaction history
- Update profile & password
- Generate & download personal QR code for receiving payments

### 🧑‍💼 **Agent**
- Cash-in funds to user wallets
- Add money via payment gateway
- Send money to other agents
- View 30-day transaction summary charts
- Full wallet & transaction management

### 👨‍💻 **Admin / Super Admin**
- Verify new user registrations
- Manage all users & agents (update role, status, verification)
- View system-wide analytics:
  - User vs Agent distribution (Pie Chart)
  - Transaction type vs volume & amount (Bar Charts)
  - Total user & transaction summaries
- Refund completed transactions
- Full CRUD access to user data (Super Admin can manage Admins too)

### 🌐 **Public Pages**
- Home (Hero + Features + Testimonials)
- About Us (Mission, Team, Values)
- Features Overview
- FAQ
- Contact Form
- 404 Not Found fallback

---

## 🛠️ Tech Stack

| Category         | Technologies                                                                                     |
|------------------|--------------------------------------------------------------------------------------------------|
| **Core**         | React 19, TypeScript, Vite                                                                       |
| **State**        | Redux Toolkit, RTK Query                                                                         |
| **Styling**      | Tailwind CSS v4, `shadcn/ui` components                                                          |
| **Routing**      | React Router v7                                                                                  |
| **Forms**        | React Hook Form + Zod validation                                                                 |
| **UI Libraries** | Radix UI, Lucide Icons, Recharts, Embla Carousel                                                 |
| **Utils**        | `date-fns`, `clsx`, `tailwind-merge`, `next-themes`, `qrcode.react`, `sonner` (toasts)           |
| **Deployment**   | Vercel                                                                                           |

---

## 📂 Project Structure

```
sakincse21-paisahipaisa/
├── src/
│   ├── App.tsx                 # Main app wrapper with layout
│   ├── main.tsx                # Entry point (ReactDOM + Providers)
│   ├── assets/                 # Static assets (e.g., logo SVG)
│   ├── components/             # Reusable UI & layout components
│   │   ├── layout/             # Navbar, Footer, Sidebar, DashboardLayout
│   │   ├── modules/            # Feature modules grouped by role
│   │   ├── ui/                 # shadcn/ui components + customizations
│   │   └── providers/          # ThemeProvider
│   ├── pages/                  # Page-level components (role-scoped)
│   ├── redux/                  # RTK store + API slices (Auth, User, Transaction, Wallet)
│   ├── routes/                 # Role-based sidebar configs + router setup
│   ├── lib/                    # Utilities (auth HOC, sidebar generator, utils)
│   ├── hooks/                  # Custom hooks (e.g., use-mobile)
│   ├── config/                 # Environment config (backend URL)
│   ├── constants/              # App constants (e.g., Joyride tour steps)
│   ├── types/                  # TypeScript interfaces & enums
│   └── utils/                  # Helper functions (e.g., cx for class merging)
├── public/                     # Static files (e.g., favicon)
├── index.html                  # HTML entry
├── vite.config.ts              # Vite configuration
├── tailwind.config.ts          # Tailwind + shadcn setup
└── package.json                # Dependencies & scripts
```

---

## 🔐 Authentication & Authorization

- **JWT-based auth** (handled via HTTP-only cookies on backend)
- **Role-based access control** (`USER`, `AGENT`, `ADMIN`, `SUPER_ADMIN`)
- **Protected routes** using `WithAuth` HOC
- **Auto-redirect** to `/login` when unauthenticated
- **Logout** clears RTK cache and redirects

---

## 📊 Dashboards & Analytics

- **User Dashboard**: Wallet balance, quick actions, recent transactions
- **Agent Dashboard**: Wallet, quick actions, charts (30-day summary)
- **Admin Dashboard**: User management, system analytics, transaction oversight
- **Charts**: Built with **Recharts**, showing:
  - Transaction type vs amount/volume
  - User/Agent distribution
  - Performance trends

---

## 🧪 Form Validation

- **Zod schemas** for all forms (register, login, send money, profile update, etc.)
- **React Hook Form** for performant state management
- Real-time validation feedback & error handling

---

## 🎨 UI/UX Highlights

- **Dark/Light/System theme toggle**
- **Responsive sidebar** (collapsible on desktop, sheet on mobile)
- **Interactive tooltips & popovers**
- **QR code generation** with download support
- **Loading states** with `Loader2Icon`
- **Toast notifications** via `sonner`

---

## ⚙️ Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/sakincse21/paisahipaisa.git
   cd paisahipaisa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env` file in the root:
   ```env
   VITE_BACKEND_BASE_URL=https://your-backend-url.com
   ```

4. **Run dev server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 📜 License

MIT License © 2025 [Saleheen Uddin Sakin](https://github.com/sakincse21)

