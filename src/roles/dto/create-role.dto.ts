import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'name',
  })
  @IsNotEmpty()
  name: string;
}
