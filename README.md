# Food Sharing App — Client Side

## Overview

This is the frontend of the Food Sharing platform built using React and Vite. It allows users to donate food, browse available items, and request food securely.

---

## Live Site

**Frontend:** [https://food-sharing-app-client-side.netlify.app](https://food-sharing-app-client-side.netlify.app)
**Backend API:** [https://b11a11-server-side-tsgm1257.vercel.app](https://b11a11-server-side-tsgm1257.vercel.app)

---

## Purpose

To reduce food waste and connect donors with individuals in need by enabling users to share excess food and allow others to request it.

---

## Key Features

- Firebase authentication (Email & Google)
- JWT token-based secure API communication
- Add, update, and delete donated food items
- View available food with search and sort options
- Request food and view your own requests
- Responsive layout with mobile support
- Protected routes for authenticated users

---

## Tech Stack

- **Frontend:** React + Vite
- **Routing:** React Router
- **Styling:** Tailwind CSS + DaisyUI
- **State/Data:** TanStack React Query
- **Auth:** Firebase Authentication
- **Animations:** motion/react
- **Alerts:** SweetAlert2

---

## Screenshots

### Home
![Home](public/screenshots/home.png)
### Food Details
![Food Details](public/screenshots/food-details.png)

## Environment Variables

Create a `.env` file in the root of your client project:

VITE_API_BASE_URL=https://b11a11-server-side-tsgm1257.vercel.app

Firebase Configuration

- VITE_FIREBASE_API_KEY=
- VITE_FIREBASE_AUTH_DOMAIN=
- VITE_FIREBASE_PROJECT_ID=
- VITE_FIREBASE_STORAGE_BUCKET=
- VITE_FIREBASE_MESSAGING_SENDER_ID=
- VITE_FIREBASE_APP_ID=

---

## Installation

1. Clone the repository
2. Run `npm install`
3. Add the `.env` file with the correct backend URL
4. Run the app locally:

```
npm run dev
```

---

## Developed by

Tanzeem Siddique
