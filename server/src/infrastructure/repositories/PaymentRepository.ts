// src/repositories/PaymentRepository.ts

import IPayment from "../../domain/entities/IPayment";
import IPaymentRepository from "../../domain/interface/repositories/IPaymentRepository";
import PaymentModel from "../model/PaymentModel";

export default class PaymentRepository implements IPaymentRepository {
   model = PaymentModel;

   async create(payment: IPayment): Promise<IPayment> {
      return await this.model.create(payment);
   }

   async findById(id: string): Promise<IPayment | null> {
      return await this.model.findById(id).exec();
   }

   async findByOrderId(orderId: string): Promise<IPayment | null> {
      return await this.model.findOne({ orderId }).exec();
   }

   async update(payment: IPayment): Promise<void> {
      const { _id, ...updateData } = payment;
      await this.model.findByIdAndUpdate(_id, updateData, { new: true }).exec();
   }
}
