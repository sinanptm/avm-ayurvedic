import { AnimatedCardProps, NavLinkType } from "@/types";
import { AppointmentType } from "@/types/enum";

export const AdminSideBarLinks: NavLinkType[] = [
   {
      label: "Doctors",
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
   {
      label: "Chats",
      href: "/doctor/chats",
      icon: "/assets/icons/utils/message.svg",
   },
   {
      label: "Video",
      href: "/doctor/video-sections",
      icon: "/assets/icons/utils/video.svg",
   },
];

export const NavLinks: NavLinkType[] = [
   { href: "/", label: "Home" },
   { href: "/clinicians", label: "Clinicians" },
   { href: "/chats", label: "Chats" },
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
   "/assets/images/onboarding-img.png",
   "/assets/images/slider-1.avif",
   "/assets/images/slider-2.avif",
   "/assets/images/slider-3.avif",
   "/assets/images/slider-4.avif",
   "/assets/images/slider-5.avif",
   "/assets/images/slider-6.jpg",
];

export const SliderTexts = [
   "Virtual Specialty Care for Everyone.",
   "Ayurveda Meets Modern Healthcare Solutions.",
   "Your Health is Our Priority.",
   "Discover the Healing Power of Ayurveda.",
   "Book Appointments for Your Wellness Journey.",
   "Tradition and Innovation for Holistic Health.",
   "Personalized Ayurvedic Treatments Just for You.",
   "Experience Ayurveda and Allopathy Together.",
   "Quality Healthcare Beyond All Boundaries."
];

export const DoctorDegrees = [
   "MBBS (Medicine and Surgery)",
   "MD (Medicine)",
   "DO (Osteopathic Medicine)",
   "DDS (Dental Surgery)",
   "DMD (Dental Medicine)",
   "BDS (Bachelor of Dental Surgery)",
   "BAMS (Ayurveda Medicine and Surgery)",
   "BUMS (Unani Medicine and Surgery)",
   "BHMS (Homeopathic Medicine and Surgery)",
   "DPM (Podiatric Medicine)",
   "DC (Chiropractic)",
   "OD (Optometry)",
   "PharmD (Pharmacy)",
   "DVM (Veterinary Medicine)",
   "DrPH (Public Health)",
   "PsyD (Psychology)",
   "DPT (Physical Therapy)",
   "OTD (Occupational Therapy)",
   "AuD (Audiology)",
   "ND (Naturopathic Medicine)",
   "DSc (Doctor of Science)",
   "DNP (Nursing Practice)",
   "DHSc (Health Science)",
   "MS (Master of Surgery)",
   "MCh (Master of Chirurgiae)",
   "MSc (Master of Science in Medicine)",
   "PhD (Doctor of Philosophy in Medicine)",
   "DM (Doctor of Medicine)",
   "MD-PhD (Dual Degree in Medicine and Research)",
];

export const DummyDoctors = [
   {
      _id: "66e18ca5f2448c308b75a861",
      email: "muhammeds@gmail.com",
      image: "https://avm-ayurvedic.s3.eu-north-1.amazonaws.com/profile-images/doctor/66f43f33e89ff3aa8da6e673-1727282995040",
      isBlocked: false,
      name: "Dr Muhammed",
      phone: "+918082327749",
      role: "doctor",
      qualifications: ["BAMS", "MBBS"],
      isVerified: true,
      createdAt: "2024-09-11T12:27:17.898Z",
      updatedAt: "2024-09-11T17:39:20.906Z",
      __v: 0,
   },
   {
      _id: "66e1cace6d9f4811ad6f6767",
      email: "drshafeeq@gmail.com",
      image: "https://avm-ayurvedic.s3.eu-north-1.amazonaws.com/profile-images/doctor/66f43f33e89ff3aa8da6e673-1727282995040",
      isBlocked: false,
      name: "Dr Ganesh",
      phone: "+918909049",
      role: "doctor",
      qualifications: ["Mbbs"],
      isVerified: true,
      createdAt: "2024-09-11T16:52:30.548Z",
      updatedAt: "2024-09-11T17:39:28.121Z",
      __v: 0,
   },
   {
      _id: "66e1d4144dd4bfd500a9481f",
      email: "Jasmin9@gmail.com",
      image: "https://avm-ayurvedic.s3.eu-north-1.amazonaws.com/profile-images/doctor/66f43f33e89ff3aa8da6e673-1727282995040",
      isBlocked: false,
      name: "Jasmin",
      phone: "+918089507749",
      role: "doctor",
      qualifications: ["BAMS", "MBBS"],
      isVerified: true,
      createdAt: "2024-09-11T17:32:04.440Z",
      updatedAt: "2024-09-12T05:50:04.033Z",
      __v: 0,
   },
   {
      _id: "66e28058798c79efcba79690",
      email: "drJasmin@gmail.com",
      image: "https://avm-ayurvedic.s3.eu-north-1.amazonaws.com/profile-images/doctor/66f43f33e89ff3aa8da6e673-1727282995040",
      isBlocked: false,
      name: "Dr Jasmin",
      phone: "+918239109212",
      role: "doctor",
      qualifications: ["MBBS ", "BAMS"],
      isVerified: true,
      createdAt: "2024-09-12T05:47:04.157Z",
      updatedAt: "2024-09-12T05:50:14.687Z",
      __v: 0,
   },
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
      heading: "Ayurvedic Assistant",
      key: 2,
      image: "/assets/3D/chat-bot.webp",
      text: "Fast responses",
      linkText: "Chat Now",
      link: "/",
   },
   {
      heading: "Customer Support",
      key: 3,
      image: "/assets/3D/customer-support.jpg",
      text: "24/7 Customer Service",
      linkText: "Get Support",
      link: "/chat",
   },
];

export const Treatments = [
   {
     title: 'Abhyanga Massage',
     description: 'A full-body massage with warm herbal oils to promote relaxation and detoxification.',
     image: '/assets/services/abhyanga.jpg',
   },
   {
     title: 'Shirodhara',
     description: 'A gentle stream of warm oil poured over the forehead to calm the mind and nervous system.',
     image: '/assets/services/shirodhara.webp',
   },
   {
     title: 'Panchakarma',
     description: 'A comprehensive detoxification and rejuvenation program to restore balance to the body.',
     image: '/assets/services/panchakarma.jpg',
   },
 ]

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
      id: AppointmentType.VIDEO_CONSULTING,
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
   {
      id: AppointmentType.IN_PERSON,
      image: "/assets/icons/wheelchair.svg",
      type: "Inpatient",
      title: "Inpatient Consulting",
      description: "Specialized Ayurvedic care without overnight stay",
      details: [
         "Quick and efficient Ayurvedic consultations",
         "Specialized Ayurvedic diagnostic services",
         "Follow-up Ayurvedic care and monitoring",
         "Minor Ayurvedic procedures and treatments",
      ],
   },
];

export const AvailableTimes = {
   Morning: [
      "12:00 AM",
      "01:00 AM",
      "02:00 AM",
      "03:00 AM",
      "04:00 AM",
      "05:00 AM",
      "06:00 AM",
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
   ],
   Afternoon: ["12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"],
   Evening: ["05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"],
};

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
