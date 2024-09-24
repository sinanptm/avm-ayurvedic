const getRoleSpecificData = (user: "doctor" | "patient", doctorData: string, patientData: string) => {
  if (user === 'patient') {
    return doctorData
  } else {
    return patientData;
  }
}


export const getRoleSpecificList = <T>(isDoctor: boolean, doctorData: T[] = [], patientData: T[] = []): T[] => {
  return isDoctor ? doctorData : patientData;
};


export default getRoleSpecificData