import IChatBotMessage from "../../entities/IChatBotMessage";
import IRepository from "./IRepository";

export default interface IChatBotMessageRepository extends IRepository<IChatBotMessage> {
    getMessagesByPatientId(patientId: string): Promise<IChatBotMessage[] | []>;
}