import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FilterIdDto {
  @ApiProperty({
    description: 'id',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
