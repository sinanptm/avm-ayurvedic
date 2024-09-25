export const getSenderData = (sender: "doctor" | "patient", doctorData: string, patientData: string): string => {
  if (sender === 'patient') {
    return patientData
  } else if (sender === 'doctor') {
    return doctorData;
  }
  return 'Unknown'
}


export const getReceiverData = (sender: "doctor" | "patient", doctorData: string, patientData: string): string => {
  if (sender === 'patient') {
    return doctorData
  } else if (sender === 'doctor') {
    return patientData;
  }
  return 'Unknown'
}