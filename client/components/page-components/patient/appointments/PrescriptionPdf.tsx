import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { format } from "date-fns";
import { IDoctor, IPatient, IPrescription } from "@/types/entities";

Font.register({
   family: "Roboto",
   fonts: [
      {
         src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
         fontWeight: 300,
      },
      {
         src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
         fontWeight: 400,
      },
      {
         src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
         fontWeight: 500,
      },
      {
         src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
         fontWeight: 700,
      },
   ],
});

const styles = StyleSheet.create({
   page: {
      fontFamily: "Roboto",
      padding: 30,
      backgroundColor: "#ffffff",
   },
   header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      borderBottom: "2 solid #4a90e2",
      paddingBottom: 10,
   },
   logo: {
      width: 60,
      height: 60,
   },
   hospitalInfo: {
      alignItems: "center",
   },
   hospitalName: {
      fontSize: 24,
      fontWeight: 700,
      color: "#4a90e2",
      marginBottom: 5,
   },
   title: {
      fontSize: 18,
      fontWeight: 500,
      color: "#4a90e2",
   },
   section: {
      marginBottom: 15,
   },
   sectionTitle: {
      fontSize: 14,
      fontWeight: 700,
      color: "#4a90e2",
      marginBottom: 5,
      textTransform: "uppercase",
   },
   table: {
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#4a90e2",
      borderRadius: 3,
   },
   tableRow: {
      flexDirection: "row",
      borderBottomColor: "#4a90e2",
      borderBottomWidth: 1,
      alignItems: "center",
      minHeight: 24,
      textAlign: "left",
   },
   tableCol: {
      width: "25%",
      paddingVertical: 5,
      paddingHorizontal: 3,
   },
   tableCell: {
      fontSize: 10,
      color: "#333",
   },
   tableHeader: {
      backgroundColor: "#e6f2ff",
      fontWeight: 700,
      color: "#4a90e2",
   },
   text: {
      fontSize: 10,
      marginBottom: 3,
      color: "#333",
   },
   bold: {
      fontWeight: 700,
   },
   footer: {
      position: "absolute",
      bottom: 30,
      left: 30,
      right: 30,
      textAlign: "center",
      fontSize: 8,
      color: "#666",
      borderTop: "1 solid #4a90e2",
      paddingTop: 10,
   },
   infoGrid: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
   },
   infoColumn: {
      width: "48%",
   },
});

interface PrescriptionPDFProps {
   prescription: IPrescription;
   doctor: IDoctor;
   patient: IPatient;
}

const PrescriptionPDF: React.FC<PrescriptionPDFProps> = ({ prescription, doctor, patient }) => (
   <Document>
      <Page size="A4" style={styles.page}>
         <View style={styles.header}>
            <View>
               <Text style={styles.hospitalName}>AVM Ayurvedic</Text>
            </View>
            <View style={styles.hospitalInfo}>
               <Text style={styles.title}>Medical Prescription</Text>
            </View>
         </View>

         <View style={styles.infoGrid}>
            <View style={styles.infoColumn}>
               <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Doctor Information</Text>
                  <Text style={[styles.text, styles.bold]}>{doctor.name}</Text>
                  <Text style={styles.text}>Qualifications: {doctor.qualifications?.join(", ")}</Text>
                  <Text style={styles.text}>Phone: {doctor.phone}</Text>
                  <Text style={styles.text}>Email: {doctor.email}</Text>
               </View>
            </View>
            <View style={styles.infoColumn}>
               <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Patient Information</Text>
                  <Text style={[styles.text, styles.bold]}>{patient.name}</Text>
                  <Text style={styles.text}>
                     DOB: {patient.dob ? format(new Date(patient.dob), "MMMM dd, yyyy") : "N/A"}
                  </Text>
                  <Text style={styles.text}>Gender: {patient.gender}</Text>
                  <Text style={styles.text}>Blood Group: {patient.bloodGroup}</Text>
                  <Text style={styles.text}>Phone: {patient.phone}</Text>
               </View>
            </View>
         </View>

         <View style={styles.section}>
            <Text style={styles.sectionTitle}>Prescription Details</Text>
            <Text style={[styles.text, styles.bold]}>Prescription ID: {prescription._id}</Text>
            <Text style={[styles.text, styles.bold]}>
               Date: {prescription.createdAt ? format(new Date(prescription.createdAt), "MMMM dd, yyyy") : "N/A"}
            </Text>
            <Text style={[styles.text, styles.bold]}>Status: {prescription.status}</Text>
         </View>

         <View style={styles.section}>
            <Text style={styles.sectionTitle}>Medications</Text>
            <View style={styles.table}>
               <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>Medication</Text>
                  </View>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>Dosage</Text>
                  </View>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>Frequency</Text>
                  </View>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>Duration</Text>
                  </View>
               </View>
               {prescription.medications?.map((med, index) => (
                  <View style={styles.tableRow} key={index}>
                     <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{med.name}</Text>
                     </View>
                     <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{med.dosage}</Text>
                     </View>
                     <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{med.frequency}</Text>
                     </View>
                     <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{med.duration}</Text>
                     </View>
                  </View>
               ))}
            </View>
         </View>

         {prescription.medications?.some((med) => med.additionalInstructions) && (
            <View style={styles.section}>
               <Text style={styles.sectionTitle}>Additional Instructions</Text>
               {prescription.medications.map(
                  (med, index) =>
                     med.additionalInstructions && (
                        <View key={index} style={{ marginBottom: 3 }}>
                           <Text style={[styles.text, styles.bold]}>{med.name}:</Text>
                           <Text style={styles.text}>{med.additionalInstructions}</Text>
                        </View>
                     )
               )}
            </View>
         )}

         {prescription.notes && (
            <View style={styles.section}>
               <Text style={styles.sectionTitle}>Notes</Text>
               <Text style={styles.text}>{prescription.notes}</Text>
            </View>
         )}

         <View style={styles.footer}>
            <Text>
               This is a digital prescription from AVM Ayurvedic. Please contact your doctor at {doctor.phone} if you
               have any questions.
            </Text>
            <Text style={{ marginTop: 5 }}>Generated on {format(new Date(), "PPPp")}</Text>
         </View>
      </Page>
   </Document>
);

export default PrescriptionPDF;
