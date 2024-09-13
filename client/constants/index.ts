import { AnimatedCardProps, NavLinkType } from "@/types";

export const AdminSideBarLinks: NavLinkType[] = [
   {
      label: "Dcotors",
      href: "/admin/doctors",
      icon: "/assets/icons/doctor.svg",
   },
   {
      label: "Patients",
      href: "/admin/patients",
      icon: "/assets/icons/wheelchair.svg",
   },
   {
      label: "Products",
      href: "/admin/products",
      icon: "/assets/icons/store.svg",
   },
];

export const DoctorsSidebarLinks: NavLinkType[] = [
   {
      label: "Patients",
      href: "/doctor/patients",
      icon: "/assets/icons/wheelchair.svg",
   },
   {
      label: "Appointments",
      href: "/doctor/appointments",
      icon: "/assets/icons/store.svg",
   },
   {
      label: "Slots",
      href: "/doctor/slots",
      icon: "/assets/icons/utils/slots.svg",
   },
];

export const NavLinks: NavLinkType[] = [
   { href: "/", label: "Home" },
   { href: "/clinicians", label: "Clinicians" },
   { href: "/products", label: "Products" },
   { href: "/services", label: "Services" },
   { href: "/about", label: "About" },
];

export const DoctorList = [
   {
      _id: "1",
      name: "Dr. John Doe",
      image: "/assets/images/admin.png",
      status: "active",
      specialty: "Cardiology",
      patients: 150,
   },
   {
      _id: "2",
      name: "Dr. Jane Smith",
      image: "/assets/images/admin.png",
      status: "active",
      specialty: "Pediatrics",
      patients: 120,
   },
   {
      _id: "3",
      name: "Dr. Mike Johnson",
      image: "/assets/images/admin.png",
      status: "on leave",
      specialty: "Neurology",
      patients: 100,
   },
   {
      _id: "4",
      name: "Dr. Sarah Williams",
      image: "/assets/images/admin.png",
      status: "active",
      specialty: "Dermatology",
      patients: 130,
   },
   {
      _id: "5",
      name: "Dr. Robert Brown",
      image: "/assets/images/admin.png",
      status: "inactive",
      specialty: "Orthopedics",
      patients: 90,
   },
];

export const OurServices = [
   "Expert medical professionals",
   "State-of-the-art facilities",
   "Personalized care plans",
   "Multidisciplinary approach",
   "Advanced diagnostic tools",
   "Compassionate support staff",
];

export const SliderImages: string[] = [
   "/assets/images/ayurveda1.jpg",
   "/assets/images/onboarding-img.png",
   // "https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   // "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   // "https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export const DummyDoctors = [
   { "_id": "66e18ca5f2448c308b75a861", "email": "muhammeds@gmail.com", "image": "https://avm-ayurvedic.s3.eu-north-1.amazonaws.com/profile-images/66e18ca5f2448c308b75a861-1726057637911", "isBlocked": false, "name": "Dr Muhammed", "phone": "+918082327749", "role": "doctor", "qualifications": ["BAMS", "MBBS"], "isVerified": true, "createdAt": "2024-09-11T12:27:17.898Z", "updatedAt": "2024-09-11T17:39:20.906Z", "__v": 0 },
   { "_id": "66e1cace6d9f4811ad6f6767", "email": "drshafeeq@gmail.com", "image": "https://avm-ayurvedic.s3.eu-north-1.amazonaws.com/profile-images/66e1cace6d9f4811ad6f6767-1726073550611", "isBlocked": false, "name": "Dr Ganesh", "phone": "+918909049", "role": "doctor", "qualifications": ["Mbbs"], "isVerified": true, "createdAt": "2024-09-11T16:52:30.548Z", "updatedAt": "2024-09-11T17:39:28.121Z", "__v": 0 },
   { "_id": "66e1d4144dd4bfd500a9481f", "email": "Jasmin9@gmail.com", "image": "https://avm-ayurvedic.s3.eu-north-1.amazonaws.com/profile-images/66e1d4144dd4bfd500a9481f-1726075924461", "isBlocked": false, "name": "Jasmin", "phone": "+918089507749", "role": "doctor", "qualifications": ["BAMS", "MBBS"], "isVerified": true, "createdAt": "2024-09-11T17:32:04.440Z", "updatedAt": "2024-09-12T05:50:04.033Z", "__v": 0 },
   { "_id": "66e28058798c79efcba79690", "email": "drJasmin@gmail.com", "image": "https://avm-ayurvedic.s3.eu-north-1.amazonaws.com/profile-images/66e28058798c79efcba79690-1726120024184", "isBlocked": false, "name": "Dr Jasmin", "phone": "+918239109212", "role": "doctor", "qualifications": ["MBBS ", "BAMS"], "isVerified": true, "createdAt": "2024-09-12T05:47:04.157Z", "updatedAt": "2024-09-12T05:50:14.687Z", "__v": 0 }
]



export const FeaturesCardsHomePage: AnimatedCardProps[] = [
   {
      heading: "Instant Appointments",
      key: 1,
      image: "/assets/3D/appointment.jpg",
      text: "Book Your Appointment",
      linkText: "Book Now",
      link: "/new-appointment",
   },
   {
      heading: "Natural Medicines",
      key: 2,
      image: "/assets/3D/products.jpg",
      text: "100% Quality",
      linkText: "Shop Now",
      link: "/products",
   },
   {
      heading: "Customer Support",
      key: 3,
      image: "/assets/3D/customer-support.jpg",
      text: "24/7 Customer Service",
      linkText: "Get Support",
      link: "/contact",
   },
];

export const Banners = {
   patient_signin: "/assets/images/onboarding-img.png",
   patient_signup: "/assets/images/register-img.png",
   patient_otp: "/assets/images/onboarding-img.png",
   patient_register: "/assets/images/register-img.png",
   patient_newAppointment: "/assets/images/appointment-img.png",

   doctor_signin: "/assets/images/appointment-img.png",
   doctor_otp: "/assets/images/onboarding-img.png",
   doctor_signup: "/assets/images/register-img.png",

   admin_signin: "/assets/images/onboarding-img.png",
   admin_otp: "/assets/images/onboarding-img.png",
};

export const GuaranteeListHonePage: { src: string; text: string; heading: string }[] = [
   {
      src: "/assets/icons/guarantees/confidential.svg",
      text: "All advice & consultations are completely confidential. You can also delete chats whenever you want.",
      heading: "100% Confidential",
   },
   {
      src: "/assets/icons/guarantees/certified.svg",
      text: "We offer quality healthcare through our network of certified and experienced doctors.",
      heading: "Certified Doctors",
   },
   {
      src: "/assets/icons/guarantees/convenience.svg",
      text: "Forget the hassle of long queues and rush hour. Seek expert opinion anytime, anywhere.",
      heading: "Convenience",
   },
   {
      src: "/assets/icons/guarantees/costEffective.svg",
      text: "We provide medical assistance on non urgent queries for free. Fee starting at ₹50 for faster response to queries.",
      heading: "Cost Effective",
   },
];
export const AppointmentTypes = [
   {
      image: "/assets/icons/wheelchair.svg",
      type: "Outpatient",
      title: "Outpatient Consulting",
      description: "Specialized Ayurvedic care without overnight stay",
      details: [
         "Quick and efficient Ayurvedic consultations",
         "Specialized Ayurvedic diagnostic services",
         "Follow-up Ayurvedic care and monitoring",
         "Minor Ayurvedic procedures and treatments",
      ],
   },
   {
      image: "/assets/services/ip.svg",
      type: "Online Video Call",
      title: "Online Video Consulting",
      description: "Get expert Ayurvedic advice from the comfort of your home",
      details: [
         "Convenient and accessible Ayurvedic consultations",
         "Personalized treatment plans",
         "Virtual follow-up appointments",
         "Real-time Ayurvedic diagnostic assessments",
      ],
   },
];

export const PaymentOptions: string[] = ["online", "Op"];
export const GenderOptions: string[] = ["Male", "Female", "Other"];
export const BloodGroups: string[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const DiseaseOptions: string[] = [
   "none",
   "Diabetes",
   "Hypertension",
   "Asthma",
   "Cancer",
   "Chronic Obstructive Pulmonary Disease (COPD)",
   "Heart Disease",
   "Stroke",
   "Alzheimer's Disease",
   "Parkinson's Disease",
   "Hepatitis",
   "HIV/AIDS",
   "Tuberculosis",
   "Malaria",
   "Dengue Fever",
   "Influenza",
   "Pneumonia",
   "Arthritis",
   "Epilepsy",
   "Multiple Sclerosis",
   "Anemia",
   "Leukemia",
   "Lymphoma",
   "Migraine",
   "Depression",
   "Anxiety Disorders",
   "COVID-19",
   "Chikungunya",
   "Zika Virus",
   "Meningitis",
];
