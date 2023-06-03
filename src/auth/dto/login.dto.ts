import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
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
}
