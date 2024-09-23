export default (isDoctor: boolean, doctorData: string, patientData: string) => {
    return isDoctor ? doctorData : patientData
}

