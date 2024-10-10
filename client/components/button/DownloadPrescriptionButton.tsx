import { IDoctor, IPatient, IPrescription } from '@/types/entities';
import { ButtonV2 } from './ButtonV2';
import { pdf } from '@react-pdf/renderer';
import PrescriptionPDF from '../page-components/patient/appointments/PrescriptionPdf';
import { memo, useCallback } from 'react';

type Props = {
    prescription: IPrescription;
    doctor: IDoctor;
    patient: IPatient;
};

const DownloadPrescriptionButton = ({ prescription, doctor, patient }: Props) => {
    const handleDownload = useCallback(async () => {
        try {
            const blob = await pdf(
                <PrescriptionPDF
                    prescription={prescription}
                    doctor={doctor}
                    patient={patient}
                />
            ).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Prescription_${prescription._id}.pdf`;
            link.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    }, [prescription, doctor, patient]);

    return (
        <ButtonV2 variant="shine" onClick={handleDownload}>
            Download Prescription
        </ButtonV2>
    );
};


export default memo(DownloadPrescriptionButton);