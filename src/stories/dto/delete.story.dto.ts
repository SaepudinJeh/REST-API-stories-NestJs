import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteStoryDto {
  @IsNotEmpty({ message: 'Id Not empty' })
  @IsString()
  @ApiProperty({ type: String, required: true })
  _id: string;
}

export class DeleteManyStoryDto {
  @IsNotEmpty({ message: 'Id Not empty' })
  @IsString()
  @ApiProperty({ type: String, required: true })
  author: string;
}
