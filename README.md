# 🌿 AVM Ayurvedic - Holistic Ayurveda Health Care & Wellness

Welcome to **AVM Ayurvedic** – Your holistic health destination for Ayurvedic treatments and wellness. We offer online appointment booking, video consultations, and personalized care rooted in authentic Ayurveda. 🌱

[![Website](https://img.shields.io/badge/Website-Visit%20Our%20Site-brightgreen?style=flat&logo=web&logoColor=white)](https://avm-ayurvedic.online) 
[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-blue?style=flat&logo=vercel)](https://avm-ayurvedic.online) 

---

## 📜 Project Overview

**AVM Ayurvedic** provides users access to the ancient wisdom of Ayurveda through a modern and user-friendly web application. Our mission is to deliver natural, holistic health care by leveraging technology to offer video consultations and wellness tips that fit into the everyday lives of our users.

### Highlights:

- **Frontend**: Built using Next.js (React framework) and TailwindCSS.
- **Backend**: Node.js, Express, and MongoDB hosted on AWS with NGINX.
- **Real-time**: Real-time communication through Socket.io.
- **Payment**: Stripe integration for secure payments.
- **AI-powered**: Integration with Google Generative AI for personalized tips.

---

## 💻 Tech Stack

### Frontend:
![Next JS](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white) ![Radix UI](https://img.shields.io/badge/radix%20ui-%231A1A1A.svg?style=flat&logo=radix-ui&logoColor=white) ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=flat&logo=socket.io&badgeColor=white)

### Backend:
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=flat&logo=amazon-aws&logoColor=white) ![Stripe](https://img.shields.io/badge/stripe-%236464FF.svg?style=flat&logo=stripe&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=JSON%20web%20tokens) ![NGINX](https://img.shields.io/badge/nginx-%23009639.svg?style=flat&logo=nginx&logoColor=white)

---

## 🚀 Features

- 📅 **Online Appointments**: Book appointments with our Ayurvedic doctors online.
- 📹 **Video Consultations**: Enjoy personalized virtual consultations.
- 🏥 **Holistic Health Care**: Access to holistic treatments designed for mental, physical, and spiritual well-being.
- 💳 **Payment Integration**: Stripe payment gateway for secure transactions.
- 🧘 **Wellness Tips**: Learn about Ayurvedic lifestyle and practices to support your health.
- 🌿 **AI Ayurvedic Assistant**: Get wellness tips from our intelligent assistant powered by Google AI.
- 🔄 **Real-time Communication**: Real-time features using Socket.io for chats and notifications.

---

## 🛠️ Installation

To set up **AVM Ayurvedic** locally, follow these steps:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/sinanptm/avm-ayurvedic

# 2️⃣ Navigate to the project directory
cd avm-ayurvedic

# 3️⃣ Install dependencies
npm install

# 4️⃣ Install server-side dependencies
cd server
npm install

# 5️⃣ Install client-side dependencies
cd ../client
npm install

# 6️⃣ Return to the root directory and start the development server
cd ..
npm run dev
```

```
# 7️⃣ Setup Server Environment Variables

Ensure that you create a `.env` file in both the **server** and **client** directories with the following content:

### Server-side `.env`:
```bash
# MongoDB connection URL
MONGODB_URL=mongodb://localhost:27017/AVM

# Server settings
PORT=8000
NODE_ENV=dev
CLIENT_URL=http://localhost:3000

# Nodemailer settings for email
SENDER_EMAIL=test@example.com
NODEMAILER_PASSKEY=test-nodemailer-passkey

# JWT token secrets
ACCESS_TOKEN_SECRET=test-access-token-secret
REFRESH_TOKEN_SECRET=test-refresh-token-secret

# AWS S3 storage configuration
AWS_REGION=eu-north-1
AWS_ACCESS_KEY_ID=test-aws-access-key-id
AWS_SECRET_ACCESS_KEY=test-aws-secret-access-key
S3_BUCKET_NAME=test-avm-ayurvedic-bucket

# Stripe payment gateway keys
STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXXXXXX

# Google Gemini AI API key
GEMINI_API_KEY=test-gemini-api-key
```

```bash
# 7️⃣ Setup Client Environment Variables
NEXT_PUBLIC_ENV=development

# API URL for backend server
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_BASE_API_URL=http://localhost:8000

# Firebase configuration for authentication
NEXT_PUBLIC_FIREBASE_API_KEY=test-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=test-firebase-auth-domain
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=test-firebase-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=test-firebase-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=test-firebase-measurement-id

# Stripe publishable key for client
NEXT_PUBLIC_STRIPE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX

# Metered TURN server for WebRTC
NEXT_PUBLIC_METERED_TURN_USERNAME=test-metered-turn-username
NEXT_PUBLIC_METERED_TURN_CREDENTIAL=test-metered-turn-credential


```
