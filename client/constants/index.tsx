import { AnimatedCardProps, DoctorType, NavLinkType } from "@/types";
import Image from "next/image";

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
export const BloodTypes: string[] = [
   "A+",
   "A-",
   "B+",
   "B-",
   "AB+",
   "AB-",
   "O+",
   "O-",
];
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
export const AdminSideBarLinks = [
   {
      label: "Dashboard",
      href: "#",
      icon: (
         <Image
            src={"/assets/icons/user.svg"}
            width={21}
            height={23}
            alt="User Icon"
            className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
         />
      ),
   },
   {
      label: "Profile",
      href: "#",
      icon: (
         <Image
            src={"/assets/icons/user.svg"}
            width={21}
            height={23}
            alt="User Icon"
            className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
         />
      ),
   },
   {
      label: "Settings",
      href: "#",
      icon: (
         <Image
            src={"/assets/icons/user.svg"}
            width={21}
            height={23}
            alt="User Icon"
            className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
         />
      ),
   },
   {
      label: "Logout",
      href: "#",
      icon: (
         <Image
            src={"/assets/icons/user.svg"}
            width={21}
            height={23}
            alt="User Icon"
            className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
         />
      ),
   },
];

export const NavLinks: NavLinkType[] = [
   { href: "/", label: "Home" },
   { href: "/consultation", label: "Consultation" },
   { href: "/products", label: "Products" },
   { href: "/contact", label: "Contact" },
   { href: "/about", label: "About" },
];

export const DoctorList: DoctorType[] = [
   {
      _id: "21123123",
      name: "Shafeek",
      image: "/assets/images/admin.png",
   },
   {
      _id: "211kkkn23123",
      name: "Hakeem",
      image: "/assets/images/admin.png",
   },
   {
      _id: "211kkknnjkl23123",
      name: "Salih",
      image: "/assets/images/admin.png",
   },
   {
      _id: "223423",
      name: "Sinan",
      image: "/assets/images/admin.png",
   },
];

export const SliderImages: string[] = [
   "https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export const FeaturesCardsHomePage: AnimatedCardProps[] = [
   {
      heading: "Instant Appointments",
      key: 1,
      image: "/assets/3D/appointment.jpg",
      text: "Book Your Appointment",
      linkText: "Book Now",
      link:"/new-appointment"
   },
   {
      heading: "Natural Medicines",
      key: 2,
      image: "/assets/3D/products.jpg",
      text: "100% Quality",
      linkText: "Shop Now",
      link:"/products"
   },
   {
      heading: "Video Sessions",
      key: 3,
      image: "/assets/3D/online-consulting.jpg",
      text: "Book your Appointment",
      linkText: "Book now",
      link:"/new-appointment"
   },
   {
      heading: "Customer Support",
      key: 3,
      image: "/assets/3D/customer-support.jpg",
      text: "24/7 Customer Service",
      linkText: "Get Support",
      link:"/contact"
   },
];