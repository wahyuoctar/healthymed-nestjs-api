import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Order } from 'sequelize';

export class PaginationDto {
  @ApiPropertyOptional({
    type: String,
    description: 'order ex: field1:ASC,field2:DESC',
  })
  @IsOptional()
  @Transform((e) =>
    e.value?.split(',')?.map((e) => {
      const [field, order] = e.split(':');
      return [field, order ?? 'ASC'];
    }),
  )
  @IsNotEmpty()
  order?: Order;

  @ApiPropertyOptional({
    description: 'limit',
  })
  @IsOptional()
  @Transform((e) => parseInt(e.value))
  @IsNumber()
  @IsNotEmpty()
  limit?: number;

  @ApiPropertyOptional({
    description: 'offset',
  })
  @IsOptional()
  @Transform((e) => parseInt(e.value))
  @IsNumber()
  @IsNotEmpty()
  offset?: number;
}
