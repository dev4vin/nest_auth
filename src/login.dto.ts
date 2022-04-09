import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @ApiProperty()
  @IsNotEmpty()
  // @ts-ignore
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  // @ts-ignore
  password: string;
}
