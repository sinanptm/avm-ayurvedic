# API Documentation

## Admin Routes

### Authentication
- **POST** `/admin/auth` - Log in as an admin
- **POST** `/admin/auth/otp-verification` - Verify OTP for admin login
- **POST** `/admin/auth/resend-otp` - Resend OTP for admin login
- **GET** `/admin/auth/refresh` - Refresh admin access token
- **POST** `/admin/auth/logout` - Log out admin

### Statistics
- **GET** `/admin/patient-gender` - Get gender statistics of patients
- **GET** `/admin/users-months` - Get user statistics over months
- **GET** `/admin/appointment-status` - Get appointment statistics by status
- **GET** `/admin/appointment-month` - Get appointments per month statistics
- **GET** `/admin/slot-usage` - Get statistics on slot usage

### Patient Management
- **GET** `/admin/patient` - Retrieve list of patients
- **PUT** `/admin/patient` - Update patient information

### Doctor Management
- **GET** `/admin/doctor` - Retrieve list of doctors
- **PUT** `/admin/doctor` - Update doctor information

## Socket.IO Namespaces

- **/chat** - Namespace for chat functionality
- **/video-section** - Namespace for video section functionality
- **/notification** - Namespace for notification functionality


## Appointment Routes

### Patient Routes
- **GET** `/appointments/patient/details/:appointmentId` - Get details of a specific appointment
- **GET** `/appointments/patient/success/:paymentId` - Get success details for a payment
- **POST** `/appointments/patient/` - Create a new appointment
- **GET** `/appointments/patient/` - Retrieve all appointments for a patient
- **PUT** `/appointments/patient/` - Update appointment status and notes

### Doctor Routes
- **GET** `/appointments/doctor/details/:appointmentId` - Get details of a specific appointment
- **GET** `/appointments/doctor` - Retrieve all appointments for a doctor
- **PUT** `/appointments/doctor/` - Update an appointment


## Chatbot Routes

### Message Management
- **POST** `/chatbot/` - Create a new chat message
- **GET** `/chatbot/` - Retrieve chat messages


## Doctor Routes

### Authentication Routes
- **POST** `/doctor/auth/` - Register a new doctor
- **POST** `/doctor/auth/signin` - Log in as a doctor
- **POST** `/doctor/auth/otp-verification` - Verify OTP for doctor login
- **POST** `/doctor/auth/resend-otp` - Resend OTP for doctor login
- **POST** `/doctor/auth/forgot-password` - Request a password reset
- **PATCH** `/doctor/auth/update-password` - Update doctor password
- **GET** `/doctor/auth/refresh` - Refresh doctor access token
- **POST** `/doctor/auth/logout` - Log out doctor
- **POST** `/doctor/auth/upload-url` - Upload profile image URL
- **GET** `/doctor/auth/upload-url` - Get upload URL for profile image

### Patient Management Routes
- **GET** `/doctor/` - Retrieve list of patients for a doctor
- **GET** `/doctor/medical-history/:patientId` - Get medical history of a specific patient


## Patient Routes

### Authentication Routes
- **POST** `/patient/auth/` - Register a new patient
- **POST** `/patient/auth/login` - Log in as a patient
- **POST** `/patient/auth/oauth-signin` - Log in via OAuth
- **POST** `/patient/auth/resend-otp` - Resend OTP for patient login
- **POST** `/patient/auth/otp-verification` - Verify OTP for patient login
- **GET** `/patient/auth/refresh` - Refresh patient access token
- **POST** `/patient/auth/forget-password` - Request a password reset
- **PATCH** `/patient/auth/update-password` - Update patient password
- **POST** `/patient/auth/logout` - Log out patient

### Profile Management Routes
- **GET** `/patient/profile` - Get patient profile
- **PUT** `/patient/profile` - Update patient profile
- **GET** `/patient/profile/upload-url` - Get upload URL for profile image
- **PUT** `/patient/profile/upload-url` - Complete profile image upload


## Prescription Routes

### Prescription Management
- **POST** `/prescription/` - Create a new prescription
- **PUT** `/prescription/` - Update an existing prescription


## Slot Management Routes

### Slot Operations
- **POST** `/slots/day` - Create slots for a specific day
- **DELETE** `/slots/day` - Delete slots for a specific day
- **POST** `/slots/all-days` - Create slots for all days
- **DELETE** `/slots/all-days` - Delete slots for all days
- **GET** `/slots/doctor` - Get all slots for doctors
- **GET** `/slots/:doctorId` - Get all slots for a specific doctor


## Video Section Routes

### Video Section Access for Patients
- **GET** `/video/patient/day` - Get video sections for patients for a specific day
- **GET** `/video/patient/:sectionId` - Get details of a specific video section for a patient

### Video Section Access for Doctors
- **GET** `/video/doctor/day` - Get video sections for doctors for a specific day
- **GET** `/video/doctor/:sectionId` - Get details of a specific video section for a doctor
- **GET** `/video/doctor` - Get all video sections for doctors
