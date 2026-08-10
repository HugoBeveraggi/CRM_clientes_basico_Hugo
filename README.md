# CRMPro — Visual Pipeline Manager 🚀

![CRMPro Preview](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

> **Live Demo:** 👉 [https://crm-basico-hugo.netlify.app/](https://crm-basico-hugo.netlify.app/) 👈

CRMPro is a modern mini-CRM web application built to manage sales pipelines and clients visually and intuitively using a Kanban board.

## ✨ Key Features

* **Drag & Drop Kanban Board**: Built with `@dnd-kit` to seamlessly drag clients across different stages (New, Contacted, Proposal, Won, Lost).
* **Real-time Statistics**: Dynamic KPIs calculating potential revenue, won/lost clients, and conversion rates.
* **Client Management (CRUD)**: Create and edit clients through accessible modal forms with data validation.
* **Search & Filters**: Instant global search and advanced filtering (by status, sorting, and revenue range).
* **Local Persistence**: Data is automatically saved to the browser's `localStorage` using custom React hooks.
* **Premium UI/UX**: Modern dark mode design featuring Glassmorphism, fully responsive layout, smooth animations, and micro-interactions.

## 🛠️ Tech Stack

* **Frontend**: React 19, TypeScript, Vite
* **Styling**: Tailwind CSS v4, Lucide Icons
* **Advanced Logic**: `@dnd-kit/core` and `@dnd-kit/sortable`
* **Deployment**: Configured for Netlify (`netlify.toml` included for SPA routing)

## 📦 Code Architecture

The project follows a clean and scalable architecture, separating concerns effectively:
* `/hooks`: Business logic (`useClients`) and data persistence.
* `/components`: Decoupled UI components (Kanban, Layout, generic UI base).
* `/types`: TypeScript interfaces for the domain model.
* `/utils`: Pure functions for data formatting and storage.

## 🚀 Local Development

To run this project locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
