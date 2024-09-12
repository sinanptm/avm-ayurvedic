import IDoctor from "../domain/entities/IDoctor";
import IDoctorRepository from "../domain/interface/repositories/IDoctorRepository";
import { PaginatedResult } from "../types";


export default class UnauthenticatedUseCases {
    constructor(private doctorRepository: IDoctorRepository) { }



    async getDoctors(offset: number, limit: number): Promise<PaginatedResult<IDoctor>> {
        const isVerified = true;
        const isBlocked = false
        const data = await this.doctorRepository.findMany(offset, limit, isVerified, isBlocked);
        data.items = data.items.filter(item=>item.role!=='admin')
        return data;
    }
}