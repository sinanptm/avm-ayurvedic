import mongoose from "mongoose";
import IAppointment, { AppointmentStatus, IExtendedAppointment } from "../../domain/entities/IAppointment";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import { PaginatedResult } from "../../types";
import AppointmentModel from "../model/AppointmentModel";
import { getPaginatedResult } from "./getPaginatedResult";

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

   async findDetailsById(appointmentId: string): Promise<IExtendedAppointment | null> {
      const objectId = new mongoose.Types.ObjectId(appointmentId);

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

   async findMayByPatientId(
      patientId: string,
      offset: number,
      limit: number,
      status?: AppointmentStatus
   ): Promise<PaginatedResult<IAppointment> | null> {
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
   ): Promise<PaginatedResult<IAppointment> | null> {
      const filter: { doctorId: string; status?: AppointmentStatus } = { doctorId };
      if (status) {
         filter.status = status;
      }
      const totalItems = await this.model.countDocuments(filter);
      const items = await this.model.find(filter).skip(offset).limit(limit).exec();
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
