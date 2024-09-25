export const getSenderData = (sender: "doctor" | "patient", doctorData: string, patientData: string):string => {
  if (sender === 'patient') {
    return patientData
  } else {
    return doctorData ;
  }
}


export const getReceiverData = (sender: "doctor" | "patient", doctorData: string, patientData: string):string => {
  if (sender === 'patient') {
    return doctorData
  } else {
    return patientData ;
  }
}