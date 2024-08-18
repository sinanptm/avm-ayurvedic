import { DoctorType } from "@/types";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconBuildingStore,
  IconHomeFilled,
  IconMessageFilled,
  IconCalendarPlus,
  IconUserFilled,
} from "@tabler/icons-react";

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
      <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Profile",
    href: "#",
    icon: (
      <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Settings",
    href: "#",
    icon: (
      <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Logout",
    href: "#",
    icon: (
      <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];

export const NavItems:{name:string,link:string,icon:React.ReactNode}[] = [
  {
    name: "Home",
    link: "/",
    icon: <IconHomeFilled stroke={3} className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Consultation",
    link: "/consultation",
    icon: <IconCalendarPlus stroke={3} className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Store",
    link: "/products",
    icon: <IconBuildingStore stroke={3} className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <IconMessageFilled stroke={3} className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name:"Profile",
    link:"/profile",
    icon: <IconUserFilled stroke={3} className="h-4 w-4 text-neutral-500 dark:text-white" />
  }
];

export const DoctorList:DoctorType[] = [
  {
    _id:'21123123',
    name:"Shafeek",
    image:'/assets/images/admin.png'
  },
  {
     _id:'211kkkn23123',
    name:"Hakeem",
    image:'/assets/images/admin.png'
  },
  {
    _id:'211kkknnjkl23123',
    name:"Salih",
    image:'/assets/images/admin.png'
  },
  {
    _id:'223423',
    name:"Sinan",
    image:'/assets/images/admin.png'
  }
]