import { AnimatedCardProps, NavLinkType } from "@/types";

export const AppointmentTypes: { type: string; image: string }[] = [
   {
      type: "inpatient",
      image: "/assets/images/IP-image.png",
   },
   {
      type: "outpatient",
      image: "/assets/images/OP-image.jpg",
   },
];
export const PaymentOptions: string[] = ["online", "Op"];
// ! from server
export const AvailableTimes = [
   "09:00",
   "09:30",
   "10:00",
   "10:30",
   "11:00",
   "11:30",
   "12:00",
   "12:30",
   "13:00",
   "13:30",
   "14:00",
   "14:30",
   "15:00",
   "15:30",
   "16:00",
   "16:30",
   "17:00",
];

export const GenderOptions: string[] = ["Male", "Female", "Other"];
export const BloodTypes: string[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
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


export const NavLinks: NavLinkType[] = [
   { href: "/", label: "Home" },
   { href: "/doctors", label: "Doctors" },
   { href: "/products", label: "Products" },
   { href: "/contact", label: "Contact" },
   { href: "/about", label: "About" },
];

export const DoctorList = [
   {
     _id: '1',
     name: "Dr. John Doe",
    image:"/assets/images/admin.png",
     status: "active",
     specialty: "Cardiology",
     patients: 150,
   },
   {
     _id: '2',
     name: "Dr. Jane Smith",
    image:"/assets/images/admin.png",
     status: "active",
     specialty: "Pediatrics",
     patients: 120,
   },
   {
     _id: '3',
     name: "Dr. Mike Johnson",
    image:"/assets/images/admin.png",
     status: "on leave",
     specialty: "Neurology",
     patients: 100,
   },
   {
     _id: '4',
     name: "Dr. Sarah Williams",
    image:"/assets/images/admin.png",
     status: "active",
     specialty: "Dermatology",
     patients: 130,
   },
   {
     _id: '5',
     name: "Dr. Robert Brown",
    image:"/assets/images/admin.png",
     status: "inactive",
     specialty: "Orthopedics",
     patients: 90,
   },
 ];


export const SliderImages: string[] = [
   "/assets/images/ayurveda1.jpg",
   "/assets/images/onboarding-img.png",
   // "https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   // "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   // "https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

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
   signin: "/assets/images/onboarding-img.png",
   signup: "/assets/images/register-img.png",
   otp: "/assets/images/onboarding-img.png",
   patient_register: "/assets/images/register-img.png",
   patient_newAppointment: "/assets/images/appointment-img.png",
   staff_signin: "/assets/images/onboarding-img.png",
   staff_otp: "/assets/images/onboarding-img.png",
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


export const AdminSideBarLinks = [
   {
      label: "Dashboard",
      href: "/staff/",
      icon: "/assets/icons/dashboard.svg",
   },
   {
      label: "Profile",
      href: "/staff/profile",
      admin: false,
      icon: "/assets/icons/user.svg",
   },
   {
      label: "Doctors",
      href: "/staff/doctors",
      admin: false,
      icon: "/assets/icons/doctor.svg",
   },
   {
      label: "Patients",
      href: "/staff/patients",
      icon: "/assets/icons/wheelchair.svg",
   },
   {
      label: "Products",
      href: "/staff/products",
      icon: "/assets/icons/store.svg",
   },
];