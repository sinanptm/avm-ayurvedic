'use client'
import { useParams } from "next/navigation"

const page = () => {
    const params = useParams()
    return (
        <div>pagePP {params.patientId}</div>
    )
}

export default page