import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, FindAndCountOptions } from 'sequelize/types';
import { IGenericService } from '../common/interfaces/generic-service.interface';
import { PaginationResult } from '../common/types/pagination-result.type';
import { Role } from './models/roles.models';

@Injectable()
export class RolesService implements IGenericService<Role> {
  constructor(
    @InjectModel(Role)
    private readonly roleModel: typeof Role,
  ) {}

  async get(options: FindOptions<Role>, scopes?: Array<string>): Promise<Role> {
    return this.roleModel.scope(scopes ?? 'defaultScope').findOne(options);
  }

  async getAll(
    options: FindAndCountOptions<Role>,
    scopes?: Array<string>,
  ): Promise<PaginationResult<Role>> {
    return this.roleModel
      .scope(scopes ?? 'defaultScope')
      .findAndCountAll(options);
  }

  async create(values: Partial<Role>, scopes?: Array<string>): Promise<Role> {
    const data = await this.roleModel
      .scope(scopes ?? 'defaultScope')
      .build(values)
      .save();
    return data.reload();
  }

  async update(
    values: Partial<Role>,
    options: FindOptions<Role>,
    scopes?: Array<string>,
  ): Promise<Role> {
    const data = await this.roleModel
      .scope(scopes ?? 'defaultScope')
      .findOne(options);

    if (!data) {
      throw new NotFoundException('role not found');
    }

    return data.update(values);
  }
}
