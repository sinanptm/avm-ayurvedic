import PatientVideoLayout from "@/components/page-components/video/PatientVideoLayout";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
   title: "Video Call",
   description: "Video consultation with the doctor.",
   keywords:
      "video, call, consultation, doctor, patient, ayurveda, health, medicine, chat, video call, video consultation, video chat, video meeting, video consultation, video call ayurveda, video call doctor, video call patient, video call ayurveda doctor, video call ayurveda patient, video call doctor patient, video call ayurveda doctor patient",
};

const layout = ({ children }: { children: ReactNode }) => {
   return <PatientVideoLayout>{children}</PatientVideoLayout>;
};

export default layout;
