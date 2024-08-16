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
export const PaymentOptions: string[] = ["online", "At Appointment"];
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

export const PatientFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  concent: false,
  disclosureConsent: false,
  privacyConsent: false,
};
