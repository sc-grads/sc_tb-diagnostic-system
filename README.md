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
