'use client'

import { ButtonV2 } from "@/components/button/ButtonV2"
import { AlertDialog, AlertDialogHeader, AlertDialogContent, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog"
import Image from "next/image"
import { Dispatch, memo, SetStateAction, useCallback } from "react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormFieldType } from "@/types/enum"
import { PlusIcon } from "lucide-react"
import CustomFormField from "@/components/common/CustomFormField"
import { ScrollArea } from "@/components/ui/scroll-area"
import { prescriptionSchema } from "@/lib/form-schema/doctorSchema"
import SubmitButton from "@/components/button/SubmitButton"
import { useCreatePrescription } from "@/lib/hooks/prescription/usePrescription"
import { toast } from "@/components/ui/use-toast"

type Props = {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    appointmentId: string;
    patientId: string;
    refetch: any;
}

type PrescriptionFormValues = z.infer<typeof prescriptionSchema>
const PrescriptionModal = ({ isOpen, setOpen, appointmentId, patientId, refetch }: Props) => {
    const closeModal = useCallback(() => setOpen(false), [setOpen]);
    const { mutate: create, isPending } = useCreatePrescription()

    const form = useForm<PrescriptionFormValues>({
        resolver: zodResolver(prescriptionSchema),
        defaultValues: {
            medications: [{ name: '', dosage: '', frequency: '', duration: '', additionalInstructions: '' }],
            notes: '',
        },
    })

    const onSubmit = (data: PrescriptionFormValues) => {
        create(
            { prescription: { ...data, patientId, appointmentId } },
            {
                onError: (error) => {
                    toast({
                        title: "Error in creating Prescription",
                        description: error.response?.data.message || "Unknown error Occurred",
                        variant: "destructive"
                    })
                },
                onSuccess: ({message}) => {
                    toast({
                        title: "Prescription creation successful",
                        variant: "success"
                    })
                    closeModal();
                    refetch();
                }
            },
        );
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setOpen}>
            <AlertDialogContent className="max-w-3xl bg-dark-300 max-h-[90vh] flex flex-col">
                <AlertDialogHeader className="flex-shrink-0">
                    <AlertDialogTitle className="flex items-center justify-between text-2xl font-semibold">
                        Add Prescription
                        <ButtonV2 variant="ghost" size="icon" onClick={closeModal} aria-label="Close">
                            <Image alt="Close" width={15} height={15} src="/assets/icons/x.svg" className="h-6 w-6" />
                        </ButtonV2>
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <ScrollArea className="flex-grow overflow-y-auto remove-scrollbar">
                    <div className="p-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {form.watch('medications').map((_, index) => (
                                    <div key={index} className="space-y-4 p-4 bg-dark-400 rounded-md">
                                        <CustomFormField
                                            control={form.control}
                                            name={`medications.${index}.name`}
                                            label="Medication Name"
                                            placeholder="Enter medication name"
                                            fieldType={FormFieldType.INPUT}
                                            iconSrc="/assets/icons/utils/pill.svg"
                                        />
                                        <CustomFormField
                                            control={form.control}
                                            name={`medications.${index}.dosage`}
                                            label="Dosage"
                                            placeholder="120 ml"
                                            fieldType={FormFieldType.INPUT}
                                            iconSrc="/assets/icons/utils/droplet.svg"
                                        />
                                        <CustomFormField
                                            control={form.control}
                                            name={`medications.${index}.frequency`}
                                            label="Frequency"
                                            placeholder="2 times a day"
                                            fieldType={FormFieldType.INPUT}
                                            iconSrc="/assets/icons/clock.svg"
                                        />
                                        <CustomFormField
                                            control={form.control}
                                            name={`medications.${index}.duration`}
                                            label="Duration"
                                            placeholder="5 days"
                                            fieldType={FormFieldType.INPUT}
                                            iconSrc="/assets/icons/calendar.svg"
                                        />
                                        <CustomFormField
                                            control={form.control}
                                            name={`medications.${index}.additionalInstructions`}
                                            label="Additional Instructions"
                                            placeholder="Enter any additional instructions"
                                            fieldType={FormFieldType.TEXTAREA}
                                        />
                                    </div>
                                ))}
                                <ButtonV2
                                    type="button"
                                    onClick={() => form.setValue('medications', [...form.watch('medications'), { name: '', dosage: '', frequency: '', duration: '', additionalInstructions: '' }])}
                                    className="flex items-center"
                                >
                                    <PlusIcon className="mr-2" /> Add Another Medication
                                </ButtonV2>
                                <CustomFormField
                                    control={form.control}
                                    name="notes"
                                    label="Common Notes"
                                    placeholder="Enter any common notes for the prescription"
                                    fieldType={FormFieldType.TEXTAREA}
                                />
                                <SubmitButton isLoading={isPending}  >
                                    Save Prescription
                                </SubmitButton>
                            </form>
                        </Form>
                    </div>
                </ScrollArea>
                <VisuallyHidden>
                    <AlertDialogDescription />
                </VisuallyHidden>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default memo(PrescriptionModal)