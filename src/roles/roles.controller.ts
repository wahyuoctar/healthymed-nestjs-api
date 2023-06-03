import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FilterIdDto } from '../common/dto/filter-id.dto';
import { ResponseDto } from '../common/dto/response.dto';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ListRoleDto } from './dto/list-role.dto';
import { RoleGuard } from '../common/guards/role.guard';
import { UserRole } from '../common/enums/user-role.enum';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({
    summary: 'create role',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.Admin))
  @Post()
  async create(@Body() body: CreateRoleDto): Promise<ResponseDto> {
    const data = await this.rolesService.create(body);

    return {
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  @ApiOperation({
    summary: 'update role',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.Admin))
  @Patch(':id')
  async update(
    @Param() param: FilterIdDto,
    @Body() body: UpdateRoleDto,
  ): Promise<ResponseDto> {
    const { id } = param;

    const data = await this.rolesService.update(body, {
      where: {
        id,
      },
    });

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @ApiOperation({
    summary: 'list role',
  })
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Get()
  async getAll(@Query() query: ListRoleDto): Promise<ResponseDto> {
    const { limit, offset, order, ...filter } = query;

    const data = await this.rolesService.getAll({
      where: {
        ...filter,
      },
      limit,
      offset,
      order,
    });

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @ApiOperation({
    summary: 'get role',
  })
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Get(':id')
  async get(@Param() param: FilterIdDto): Promise<ResponseDto> {
    const { id } = param;

    const data = await this.rolesService.get({
      where: {
        id,
      },
    });

    if (!data) {
      throw new NotFoundException('role not found');
    }

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
