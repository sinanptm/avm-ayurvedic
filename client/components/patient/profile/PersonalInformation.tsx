import { Card, CardContent } from '@/components/ui/card'
import { IPatient } from '@/types'

type Props = {
  patientData:IPatient;
  isLoading:boolean;
}

const PersonalInformation = ({patientData,}:Props) => {
  return (
    <Card>
    <CardContent className="p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4 text-green-500">Personal Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p><span className="font-semibold text-green-500">Date of Birth:</span> May 15, 1985</p>
          <p><span className="font-semibold text-green-500">Gender:</span> Female</p>
          <p><span className="font-semibold text-green-500">Blood Type:</span> O+</p>
        </div>
        <div>
          <p><span className="font-semibold text-green-500">Phone:</span> (555) 123-4567</p>
          <p><span className="font-semibold text-green-500">Email:</span> sarah.johnson@email.com</p>
          <p><span className="font-semibold text-green-500">Emergency Contact:</span> John Johnson (Spouse)</p>
        </div>
      </div>
    </CardContent>
  </Card>
  )
}

export default PersonalInformation