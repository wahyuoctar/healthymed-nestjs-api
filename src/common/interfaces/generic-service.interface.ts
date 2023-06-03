import { FindAndCountOptions, FindOptions, Model } from 'sequelize';
import { PaginationResult } from '../types/pagination-result.type';

export interface IGenericService<M extends Model> {
  get(options: FindOptions<M>, scopes?: Array<string>): Promise<M>;

  create(values: Partial<M>, scopes?: Array<string>): Promise<M>;

  update(
    values: Partial<M>,
    options: FindOptions<M>,
    scopes?: Array<string>,
  ): Promise<M>;

  getAll(
    options: FindAndCountOptions<M>,
    scopes?: Array<string>,
  ): Promise<PaginationResult<M>>;
}
