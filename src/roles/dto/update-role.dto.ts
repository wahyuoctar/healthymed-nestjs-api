import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateRoleDto {
  @ApiPropertyOptional({
    description: 'name',
  })
  @IsOptional()
  @IsNotEmpty()
  name?: string;
}
