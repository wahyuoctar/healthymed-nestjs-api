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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FilterIdDto } from '../common/dto/filter-id.dto';
import { ResponseDto } from '../common/dto/response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard } from '../common/guards/role.guard';
import { UserRole } from '../common/enums/user-role.enum';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'create user',
  })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'doc', maxCount: 1 },
    ]),
  )
  @Post()
  async create(
    @Body() body: CreateUserDto,
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      doc: Express.Multer.File[];
    },
  ): Promise<ResponseDto> {
    const data = await this.usersService.create(
      {
        ...body,
        avatar: files.avatar?.[0]?.path,
        doc: files.doc?.[0]?.path,
      },
      ['withoutPassword', 'withRole'],
    );

    return {
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  @ApiOperation({
    summary: 'update user',
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'doc', maxCount: 1 },
    ]),
  )
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.Admin))
  @Patch(':id')
  async update(
    @Param() param: FilterIdDto,
    @Body() body: UpdateUserDto,
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      doc?: Express.Multer.File[];
    },
  ): Promise<ResponseDto> {
    const { id } = param;

    const data = await this.usersService.update(
      {
        ...body,
        avatar: files.avatar?.[0]?.path,
        doc: files.doc?.[0]?.path,
      },
      {
        where: {
          id,
        },
      },
      ['withoutPassword', 'withRole'],
    );

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @ApiOperation({
    summary: 'list user',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.Admin))
  @Get()
  async getAll(@Query() query: ListUserDto): Promise<ResponseDto> {
    const { limit, offset, order, ...filter } = query;

    const data = await this.usersService.getAll(
      {
        where: {
          ...filter,
        },
        limit,
        offset,
        order,
      },
      ['withoutPassword', 'withRole'],
    );

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @ApiOperation({
    summary: 'get user',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.Admin))
  @Get(':id')
  async get(@Param() param: FilterIdDto): Promise<ResponseDto> {
    const { id } = param;

    const data = await this.usersService.get(
      {
        where: {
          id,
        },
      },
      ['withoutPassword', 'withRole'],
    );

    if (!data) {
      throw new NotFoundException('user not found');
    }

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
