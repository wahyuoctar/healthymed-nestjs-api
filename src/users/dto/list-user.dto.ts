import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { UserStatus } from '../../common/enums/user-status.enum';

export class ListUserDto extends PaginationDto {
  @ApiPropertyOptional({
    type: [String],
    enum: UserStatus,
    description: 'status',
  })
  @IsOptional()
  @IsEnum(UserStatus, { each: true })
  status?: string[];

  @ApiPropertyOptional({
    type: [String],
    description: 'email',
  })
  @IsOptional()
  email?: string[];
}
