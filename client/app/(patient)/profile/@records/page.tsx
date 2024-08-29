'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileText, FilePlus, Pill, Activity, Search } from 'lucide-react'

const MedicalRecords = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const medicalHistory = [
    { date: '2023-03-15', description: 'Annual check-up', doctor: 'Dr. Emily Smith' },
    { date: '2022-11-20', description: 'Flu vaccination', doctor: 'Dr. Michael Lee' },
    { date: '2022-08-05', description: 'Sprained ankle treatment', doctor: 'Dr. Sarah Johnson' },
  ]

  const testResults = [
    { date: '2023-03-15', test: 'Complete Blood Count (CBC)', result: 'Normal', doctor: 'Dr. Emily Smith' },
    { date: '2023-03-15', test: 'Lipid Panel', result: 'Slightly elevated LDL', doctor: 'Dr. Emily Smith' },
    { date: '2022-12-10', test: 'Chest X-ray', result: 'Clear, no abnormalities', doctor: 'Dr. Michael Lee' },
  ]

  const prescriptions = [
    { date: '2023-03-15', medication: 'Lisinopril', dosage: '10mg daily', doctor: 'Dr. Emily Smith' },
    { date: '2022-11-20', medication: 'Amoxicillin', dosage: '500mg 3x daily for 10 days', doctor: 'Dr. Michael Lee' },
    { date: '2022-08-05', medication: 'Ibuprofen', dosage: '400mg as needed for pain', doctor: 'Dr. Sarah Johnson' },
  ]

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-900 text-gray-100">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        <h1 className="text-3xl font-bold text-green-400 mb-6">Medical Records</h1>

        <div className="flex items-center space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Search medical records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button variant="outline" className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Search</span>
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="text-xl font-semibold text-green-400 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Medical History
            </h2>
            <Button variant="outline" className="flex items-center space-x-2">
              <FilePlus className="w-4 h-4" />
              <span>Add Entry</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {medicalHistory.map((entry, index) => (
                <div key={index} className="p-3 bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">{entry.date}</p>
                  <p className="font-semibold">{entry.description}</p>
                  <p className="text-sm text-gray-400">Doctor: {entry.doctor}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="text-xl font-semibold text-green-400 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Test Results
            </h2>
            <Button variant="outline" className="flex items-center space-x-2">
              <FilePlus className="w-4 h-4" />
              <span>Add Result</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testResults.map((result, index) => (
                <div key={index} className="p-3 bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">{result.date}</p>
                  <p className="font-semibold">{result.test}</p>
                  <p>Result: {result.result}</p>
                  <p className="text-sm text-gray-400">Doctor: {result.doctor}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="text-xl font-semibold text-green-400 flex items-center">
              <Pill className="w-5 h-5 mr-2" />
              Prescriptions
            </h2>
            <Button variant="outline" className="flex items-center space-x-2">
              <FilePlus className="w-4 h-4" />
              <span>Add Prescription</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {prescriptions.map((prescription, index) => (
                <div key={index} className="p-3 bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">{prescription.date}</p>
                  <p className="font-semibold">{prescription.medication}</p>
                  <p>Dosage: {prescription.dosage}</p>
                  <p className="text-sm text-gray-400">Prescribed by: {prescription.doctor}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MedicalRecords