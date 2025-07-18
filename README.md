# Gemini Frontend Clone Assignment – Kuvaka Tech

![Gemini Clone Banner](public/assets/readme-banner.png)

A fully functional, responsive, and visually appealing frontend for a Gemini-style conversational AI chat application. Built as part of the Kuvaka Tech assignment.

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Setup & Run Instructions](#setup--run-instructions)
- [Folder & Component Structure](#folder--component-structure)
- [Implementation Details](#implementation-details)
- [Screenshots](#screenshots)

## Overview

This project simulates a Gemini-style conversational AI chat app with OTP-based authentication, chatroom management, AI messaging, image uploads, and modern UX/UI features. All data is managed client-side using Zustand and localStorage.

## Live Demo

[Live Site on Vercel](https://your-vercel-deployment-link)

## Features

- **OTP-based Login/Signup** with country code selector
- **Simulated OTP send/validation** (setTimeout)
- **Form validation** with React Hook Form + Zod
- **Chatroom management**: create, delete, search chatrooms
- **Toast notifications** for key actions
- **Chat UI** with user/AI messages, timestamps, typing indicator
- **Simulated AI reply** with throttling (setTimeout)
- **Reverse infinite scroll** and **pagination** (20 messages per page, dummy data)
- **Image upload** in chat (base64/preview URL)
- **Copy-to-clipboard** on message hover
- **Mobile responsive design**
- **Dark mode toggle**
- **Keyboard accessibility**
- **All data stored in localStorage** (no backend)
- **Loading skeletons** for chat messages

## Technology Stack

- **Framework**: Next.js (App Router)
- **State Management**: Zustand (with persist)
- **Form Validation**: React Hook Form + Zod
- **Styling**: Tailwind CSS
- **Notifications**: Sonner

## Setup & Run Instructions

```bash
# Clone the repository
git clone https://github.com/yourusername/dev-gemini-clone.git

# Navigate to the project directory
cd dev-gemini-clone

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Folder & Component Structure

- `src/app/` – Main app routes and pages
- `src/components/` – Reusable UI and feature components
  - `auth/` – OTP login, country selector
  - `chat-provider-components/` – Chat UI, loaders, actions
  - `sidebar-components/` – Chatroom list, search, management
  - `ui/` – Buttons, forms, inputs, toasts
- `src/utils/` – Zustand stores, helpers, localStorage logic
- `public/assets/` – Images and static assets

## Implementation Details

### Throttling

AI replies are simulated with `setTimeout` and throttled to mimic real AI response delays.

### Pagination & Infinite Scroll

Messages are paginated (20 per page). Reverse infinite scroll loads older messages (using dummy data for demo).

### Form Validation

All forms use React Hook Form + Zod for robust validation and error handling.

### LocalStorage

All chatrooms, messages, and auth state are stored in localStorage using Zustand's persist middleware.

## Screenshots

<!-- Add screenshots here if desired -->

---

**Assignment by Kuvaka Tech. Built by [Your Name].**
