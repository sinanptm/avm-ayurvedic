import IAppointment, { AppointmentStatus, IExtendedAppointment } from "../../domain/entities/IAppointment";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import { PaginatedResult } from "../../types";
import AppointmentModel from "../model/AppointmentModel";
import { getPaginatedResult } from "./getPaginatedResult";
import IPatient from "../../domain/entities/IPatient";
import { ObjectId } from "mongodb";

export default class AppointmentRepository implements IAppointmentRepository {
   model = AppointmentModel;

   async create(appointment: IAppointment): Promise<IAppointment> {
      return (await this.model.create(appointment));
   }

   async findById(id: string): Promise<IAppointment | null> {
      return await this.model.findById(id);
   }

   async update(id: string, appointment: IAppointment): Promise<IAppointment | null> {
      return await this.model.findByIdAndUpdate(id, appointment, { new: true });
   }

   async findManyByIds(ids: string[]): Promise<IAppointment[] | null> {
      return await this.model.find({ _id: { $in: ids } });
   }

   async findManyAsExtendedByPatientId(
      patientId: string,
      limit: number,
      offset: number
   ): Promise<PaginatedResult<IExtendedAppointment>> {
      const result = await this.model.aggregate([
         {
            $match: { 
               patientId: new ObjectId(patientId) ,
               status: AppointmentStatus.COMPLETED
            }
         },
         {
            $lookup: {
               from: "patients",
               localField: "patientId",
               foreignField: "_id",
               as: "patient"
            }
         },
         {
            $lookup: {
               from: "doctors",
               localField: "doctorId",
               foreignField: "_id",
               as: "doctor"
            }
         },
         {
            $lookup: {
               from: "prescriptions",
               localField: "_id",
               foreignField: "appointmentId",
               as: "prescription"
            }
         },
         {
            $unwind: "$patient"
         },
         {
            $unwind: "$doctor"
         },
         {
            $unwind:"$prescription"
         },
         {
            $project: {
               "patient.password": 0,
               "patient.token": 0,
               "doctor.password": 0,
               "doctor.token": 0
            }
         },
         {
            $facet: {
               paginatedResults: [
                  { $skip: offset },
                  { $limit: limit }
               ],
               totalCount: [
                  { $count: "count" }
               ]
            }
         }
      ]).exec();

      const appointments = result[0].paginatedResults;
      const totalItems = result[0].totalCount.length > 0 ? result[0].totalCount[0].count : 0;

      return getPaginatedResult(totalItems, offset, limit, appointments);
   }


   async findPatientsByDoctorId(doctorId: string, limit: number, offset: number): Promise<PaginatedResult<IPatient>> {
      const result = await this.model.aggregate([
         {
            $match: { doctorId: new ObjectId(doctorId) }
         },
         {
            $group: { _id: "$patientId" }
         },
         {
            $lookup: {
               from: "patients",
               localField: "_id",
               foreignField: "_id",
               as: "patientInfo"
            }
         },
         {
            $unwind: "$patientInfo"
         },
         {
            $replaceRoot: { newRoot: "$patientInfo" }
         },
         {
            $facet: {
               paginatedResults: [
                  { $skip: offset },
                  { $limit: limit },
                  {
                     $project: {
                        password: 0,
                        token: 0
                     }
                  }
               ],
               totalCount: [
                  { $count: "count" }
               ]
            }
         }
      ]).exec();

      const patients = result[0].paginatedResults;
      const totalItems = result[0].totalCount.length > 0 ? result[0].totalCount[0].count : 0;

      return getPaginatedResult(totalItems, offset, limit, patients);
   }


   async findDetailsById(appointmentId: string): Promise<IExtendedAppointment | null> {
      const objectId = new ObjectId(appointmentId);

      const appointment = await this.model
         .aggregate([
            { $match: { _id: objectId } },
            {
               $lookup: {
                  from: "patients",
                  localField: "patientId",
                  foreignField: "_id",
                  as: "patient",
               },
            },
            {
               $lookup: {
                  from: "slots",
                  localField: "slotId",
                  foreignField: "_id",
                  as: "slot",
               },
            },
            {
               $lookup: {
                  from: "doctors",
                  localField: "doctorId",
                  foreignField: "_id",
                  as: "doctor",
               },
            },
            {
               $lookup: {
                  from: "prescriptions",
                  localField: "_id",
                  foreignField: "appointmentId",
                  as: "prescription"
               }
            },
            { $unwind: { path: "$patient", preserveNullAndEmptyArrays: true } },
            { $unwind: { path: "$slot", preserveNullAndEmptyArrays: true } },
            { $unwind: { path: "$doctor", preserveNullAndEmptyArrays: true } },
            { $unwind: { path: "$prescription", preserveNullAndEmptyArrays: true } },
            {
               $project: {
                  "patient.password": 0,
                  "patient.token": 0,
                  "doctor.password": 0,
                  "doctor.token": 0,
               },
            },
         ])
         .exec();

      if (!appointment || appointment.length === 0) {
         return null;
      }

      return appointment[0] as IExtendedAppointment;
   }

   async findManyByPatientId(
      patientId: string,
      offset: number,
      limit: number,
      status?: AppointmentStatus
   ): Promise<PaginatedResult<IAppointment>> {
      const filter: { patientId: string; status?: AppointmentStatus } = { patientId };
      if (status) {
         filter.status = status;
      }
      const totalItems = await this.model.countDocuments(filter);
      const items = await this.model.find(filter).skip(offset).limit(limit).exec();
      return getPaginatedResult(totalItems, offset, limit, items);
   }

   async findManyByDoctorId(
      doctorId: string,
      offset: number,
      limit: number,
      status?: AppointmentStatus
   ): Promise<PaginatedResult<IAppointment>> {
      const filter: { doctorId: string; status?: AppointmentStatus } = { doctorId };
      if (status) {
         filter.status = status;
      }
      const totalItems = await this.model.countDocuments(filter);
      const items = await this.model.find(filter).skip(offset).limit(limit).lean(true).exec();
      return getPaginatedResult(totalItems, offset, limit, items);
   }

   async findManyByDateAndDoctorId(appointmentDate: string, doctorId: string): Promise<IAppointment[] | null> {
      const dateWithoutTime = appointmentDate.split("T")[0];
      return await this.model.find({
         doctorId,
         appointmentDate: { $regex: new RegExp(`^${dateWithoutTime}`) },
      });
   }
   async findByDateAndSlot(appointmentDate: string, slotId: string): Promise<IAppointment | null> {
      return await this.model.findOne({ appointmentDate, slotId });
   }

   async updateManyBySlotIdsNotInStatuses(slotIds: string[], fields: Partial<IAppointment>, notInStatuses: AppointmentStatus[]): Promise<IAppointment[] | null> {
      const appointments = await this.model.find({ slotId: { $in: slotIds }, status: { $nin: notInStatuses } });
      await this.model.updateMany({ slotId: { $in: slotIds }, status: { $nin: notInStatuses } }, fields);
      return appointments
   }


   async updateAppointmentStatusToConfirmed(appointmentId: string): Promise<void> {
      await this.model.findByIdAndUpdate(appointmentId, { status: AppointmentStatus.PENDING });
   }
}
