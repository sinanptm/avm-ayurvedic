import { PaginatedResult } from "../../../types";

export default interface IRepository<T> {
  findById(id: string): Promise<T | null>;
  findAll?(): Promise<T[]>;
  findManyByIds?(ids: string[]): Promise<T[] | null>;
  findManyAsPaginated?(offset: number, limit: number): Promise<PaginatedResult<T> | null>;
  create(entity: T): Promise<T>;
  update(id: string, entity: T): Promise<T | null>;
  delete?(id: string): Promise<void>;
}
