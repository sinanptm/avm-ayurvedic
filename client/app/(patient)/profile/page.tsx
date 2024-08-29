
import PersonalInformation from "@/components/(patient)/profile/PersonalInformation";
import UpcomingAppointment from "@/components/(patient)/profile/UpcomingAppointment";
import AllergiesAndConditions from "@/components/(patient)/profile/AllergiesAndConditions";

export default function PatientProfilePage() {
   return (
     <>
            <PersonalInformation />
            <UpcomingAppointment />
            <AllergiesAndConditions />
     </>
   );
}
