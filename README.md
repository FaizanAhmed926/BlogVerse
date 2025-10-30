# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# BlogVerse - Modern Blogging Platform

A beautiful, responsive blogging platform built with React and Appwrite. Features user authentication, rich text editing, image management, and a stunning dark theme UI.

![BlogVerse](https://img.shields.io/badge/BlogVerse-Modern%20Blogging-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Appwrite](https://img.shields.io/badge/Appwrite-Backend-orange)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-purple)

## ✨ Features

- 🔐 **User Authentication** - Signup, Login, Logout with Appwrite Auth
- 📝 **Rich Text Editor** - TinyMCE integration for beautiful post creation
- 🖼️ **Image Management** - Upload and manage featured images
- 🎨 **Beautiful UI** - Dark theme with Pinterest-style layout
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Fast Performance** - Built with React and optimized components
- 🔒 **Protected Routes** - Authentication-based navigation
- 🗂️ **Post Management** - Create, read, update, delete posts

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Redux Toolkit (State Management)
- React Router DOM (Routing)
- React Hook Form (Form Handling)
- Tailwind CSS (Styling)
- HTML React Parser (Content Rendering)

**Backend & Database:**
- Appwrite (Backend-as-a-Service)
- Appwrite Auth (Authentication)
- Appwrite Database (Posts Storage)
- Appwrite Storage (File Management)

**Development:**
- Vite (Build Tool)
- JavaScript (Programming Language)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Appwrite account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/FaizanAhmed926/BlogVerse
cd blogverse