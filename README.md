# PaisaHiPaisa

PaisaHiPaisa is a **digital wallet (MFS system like Bkash, Nagad and more)** built with **React, TypeScript, Vite, Redux Toolkit, and TailwindCSS**. It allows users to register, log in, manage wallets, send/receive money, request cash-in, withdraw funds, and view transaction history. The system supports multiple roles (**Admin, Agent, User**) with dashboards and analytics for each role.

**🌐 Live Demo**: [https://paisa-hi-paisa-two.vercel.app/](https://paisa-hi-paisa-two.vercel.app/)

---

## 🚀 Features

### 👤 User

* Register and log in securely
* View wallet balance
* Send and receive money
* Request money add (cash-in)
* Withdraw funds
* Update profile
* View transaction history

### 🧑‍💼 Agent

* Cash-in to users
* Send money to agents
* Process add money requests
* Dashboard with analytics and charts

### 👨‍💻 Admin

* Manage users (verify, approve, block, suspend)
* Monitor system transactions
* View overall analytics and charts
* Role-based access management

### 🌐 Public Pages

* Home, About, Features, FAQ, Contact Us
* Testimonials and feature highlights

---

## 🛠️ Tech Stack

* **Frontend Framework**: React + TypeScript + Vite
* **State Management**: Redux Toolkit + RTK Query
* **Styling**: TailwindCSS + shadcn/ui components
* **Routing**: React Router v7
* **UI Libraries**: Radix UI, Lucide Icons, Recharts (charts)
* **Form Handling**: React Hook Form + Zod for validation
* **Notifications**: Sonner

---

## 📂 Project Structure

```
sakincse21-paisahipaisa/
│── src/
│   ├── components/       # Reusable UI & layout components
│   ├── pages/            # Page-level components (Admin, Agent, User, Public)
│   ├── redux/            # Redux store, APIs, and features
│   ├── routes/           # Route configurations
│   ├── lib/              # Utility functions
│   ├── constants/        # App constants
│   └── types/            # TypeScript types
│
│── package.json          # Project dependencies & scripts
│── vite.config.ts        # Vite configuration
│── tsconfig.json         # TypeScript configuration
│── vercel.json           # Deployment configuration (Vercel)
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/sakincse21/paisahipaisa.git
   cd paisahipaisa
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

---

## 🔐 Authentication & Roles

* JWT-based authentication (frontend integration)
* Role-based access control (User, Agent, Admin)
* Unauthorized route handling

---

## 📊 Dashboards

* **User Dashboard** → Wallet, Quick Actions, Recent Transactions
* **Agent Dashboard** → Wallet, Quick Actions, Recent Transactions, Summary Chart
* **Admin Dashboard** → Manage Users and Transactions, Analytics, System Overview

---

## 📜 License

MIT License © 2025 [Saleheen Uddin Sakin](https://github.com/sakincse21)
