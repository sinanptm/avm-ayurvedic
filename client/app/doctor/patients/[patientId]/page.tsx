'use client'
import { useParams } from "next/navigation"

const Page = () => {
    const params = useParams()
    return (
        <div>PagePP {params.patientId}</div>
    )
}

export default Page