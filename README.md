<<<<<<< HEAD
# sc_tb-diagnostic-system
sc_tb-diagnostic-system is a cloud‑based diagnostic platform designed to assist clinicians in detecting tuberculosis (TB) from chest X‑ray images. The system integrates modern machine learning models with a resilient backend and secure authentication to provide reliable, explainable predictions in resource‑constrained environments.

Key Features
FastAPI Backend: RESTful API for handling uploads, inference requests, and Grad‑CAM visualizations.

Azure Integration:

Blob Storage for secure X‑ray image management.
Azure Functions for preprocessing (resize, normalization, CLAHE).
Azure ML endpoints (ResNet, EfficientNet, ViT) for inference.
Application Insights for monitoring and observability.
Supabase Authentication: Secure clinician login and role‑based access.
Explainable AI: Grad‑CAM overlays to highlight regions of interest in X‑rays.
Frontend (V0 App): User‑friendly interface for clinicians to upload images and view diagnostic results.
Resilient Architecture: Designed for multi‑region deployment, graceful degradation, and reproducibility.

Goals

Empower healthcare providers with reliable TB diagnostic support.
Ensure reproducibility and transparency through explainable AI.
Provide demo‑ready workflows for stakeholders and peer learning.
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> c50d5a8 (Initial commit from Create Next App)
