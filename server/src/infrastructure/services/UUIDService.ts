import { v4 as uuidv4 } from "uuid";
import IUUIDService from "../../domain/interface/services/IUUIDService";

export default class UUIDService implements IUUIDService {
   generate(): string {
      return uuidv4();
   }
}
