import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'name',
  })
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({
    description: 'username',
  })
  @IsOptional()
  @IsNotEmpty()
  username?: string;

  @ApiPropertyOptional({
    description: 'email',
  })
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @ApiPropertyOptional({
    description: 'phone number',
  })
  @IsOptional()
  @IsPhoneNumber('ID')
  @IsNotEmpty()
  phone?: string;

  @ApiPropertyOptional({
    description: 'role',
  })
  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  roleId?: string;

  @ApiPropertyOptional({
    description: 'doc',
    format: 'binary',
  })
  @IsOptional()
  doc?: string;

  @ApiPropertyOptional({
    description: 'avatar',
    format: 'binary',
  })
  @IsOptional()
  avatar?: string;
}
