# Client-Side Pages Structure

## 1. General
- `/about`
- `/services`
- `/clinicians`

## 2. Authentication
- `/signin`
  - `/signin/otp-verification`
  - `/signin/reset-password`
- `/signup`
- `/register`

## 3. Patient
- `/profile`
- `/appointments`
  - `/appointments/[id]`
- `/new-appointment`
  - `/new-appointment/[id]`
  - `/new-appointment/cancel/[id]`
- `/chats`
  - `/chats/@/chatSection/[chatId]`
  - `/@chatList`
- `/video-section/[sectionId]`
- `/@chatbot`

## 4. Admin
- `/admin/@signin`
- `/admin/@signin/otp-verification`
- `/admin/dashboard`
  - `/admin/dashboard/@appointments`
  - `/admin/dashboard/@appointmentStatus`
  - `/admin/dashboard/@patientGender`
  - `/admin/dashboard/@slotUsage`
  - `/admin/dashboard/@users`
- `/admin/doctors`
- `/admin/patients`

## 5. Doctor
- `/doctor/@auth/otp-verification`
- `/doctor/@auth/reset-password`
- `/doctor/@auth/signin`
- `/doctor/signup`
- `/doctor/appointments`
  - `/doctor/appointments/[id]`
- `/doctor/@chat`
- `/doctor/@chatlist`
- `/doctor/patients`
  - `/doctor/patients/[id]`
- `/doctor/slots`
- `/doctor/@videosection/[id]`
- `/doctor/video-sections`

## 6. Miscellaneous
- `/_not-found`
