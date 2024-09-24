export const getSenderData = (sender: "doctor" | "patient", doctorData: string, patientData: string):string => {
  if (sender === 'patient') {
    return patientData
  } else {
    return doctorData ;
  }
}


export const getSenderSpecificList = <T>(isDoctor: boolean, doctorData: T[] = [], patientData: T[] = []): T[] => {
  return isDoctor ? doctorData : patientData;
};


