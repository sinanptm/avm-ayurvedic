'use client'

import { useGetMedicalHistory } from "@/lib/hooks/doctor/useDoctor"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ClockIcon, FileTextIcon, PillIcon } from "lucide-react"
import { format } from "date-fns"
import Pagination from "@/components/navigation/Pagination"

export default function Page({ searchParams }: { searchParams: { page: number } }) {
    const page = +searchParams.page || 1;
    const [currentPage, setCurrentPage] = useState(page);
    const params = useParams();
    const router = useRouter()

    const { data, refetch } = useGetMedicalHistory(params.patientId as string, page - 1, 10);

    const handlePageChange = (pageIndex: number) => {
        if (pageIndex > data?.totalPages! || pageIndex < 1) return null;
        setCurrentPage(pageIndex);
        router.push(`/doctor/patients/${params.patientId}/medical-history?page=${pageIndex}`);
        refetch();
    };

    useEffect(() => {
        setCurrentPage(page);
    }, [page])

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6 text-primary">Medical History</h1>
            {data?.items&&data?.items.length>0?data?.items.map((item, index) => (
                <Card key={item._id} className="mb-6 bg-card text-card-foreground">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Avatar>
                                    <AvatarImage src={item.patient!.profile} alt={item.patient!.name} />
                                    <AvatarFallback>{item.patient!.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle>{item.patient!.name}</CardTitle>
                                    <CardDescription>{item.patient!.email}</CardDescription>
                                </div>
                            </div>
                            <Badge variant={item.status === 'completed' ? 'default' : 'secondary'}>
                                {item.status}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                    <span>{format(new Date(item.appointmentDate!), 'PPP')}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                                    <span>{item.appointmentType}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <FileTextIcon className="h-4 w-4 text-muted-foreground" />
                                    <span>Reason: {item.reason}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FileTextIcon className="h-4 w-4 text-muted-foreground" />
                                    <span>Notes: {item.notes}</span>
                                </div>
                            </div>
                        </div>
                        {item.prescription && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold mb-2">Prescription</h3>
                                <div className="space-y-2">
                                    {item.prescription.medications?.map((med, medIndex) => (
                                        <div key={medIndex} className="flex items-start space-x-2">
                                            <PillIcon className="h-5 w-5 text-primary mt-1" />
                                            <div>
                                                <span className="font-medium">{med.name}</span>
                                                <span className="text-sm text-muted-foreground"> - {med.dosage}, {med.frequency}, {med.duration}</span>
                                                {med.additionalInstructions!.length > 0 && (
                                                    <p className="text-sm text-muted-foreground">{med.additionalInstructions}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )):(
                <Card  className="mb-6 bg-card text-card-foreground">
                     <CardHeader>
                        Patient has no medical history yet
                    </CardHeader>
                </Card>
            )}
            <Pagination
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                hasNextPage={data?.hasNextPage!}
                hasPrevPage={data?.hasPreviousPage!}
                totalPages={data?.totalPages!}
            />
        </div>
    )
}