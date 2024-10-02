import IPrescription from "../../domain/entities/IPrescription";
import IPrescriptionRepository from "../../domain/interface/repositories/IPrescriptionRepository";
import PrescriptionModel from "../model/PrescriptionMode";

export default class PrescriptionRepository implements IPrescriptionRepository {
    model = PrescriptionModel
    async create(prescription: IPrescription): Promise<IPrescription> {
        return (await this.model.create(prescription));
    }
    async update(id: string, prescription: IPrescription): Promise<IPrescription | null> {
        return await this.model.findByIdAndUpdate(id,prescription);
    }
    async findById(id: string): Promise<IPrescription | null> {
        return this.model.findById(id)
    }
    async findByAppointmentId(appointmentId: string): Promise<IPrescription | null> {
        return this.model.findOne({ appointmentId });
    }
    
}