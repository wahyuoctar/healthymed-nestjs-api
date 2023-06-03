import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'name',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'username',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'password',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'phone number',
  })
  @IsPhoneNumber('ID')
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'role',
  })
  @IsUUID()
  @IsNotEmpty()
  roleId: string;

  @ApiProperty({
    description: 'doc',
    format: 'binary',
  })
  doc: string;

  @ApiPropertyOptional({
    description: 'avatar',
    format: 'binary',
  })
  @IsOptional()
  avatar?: string;
}
