import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStoryDto {
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @ApiProperty({ type: String, default: 'Ini bagian title' })
  title: string;

  @ApiProperty({ type: String, default: 'Ini untuk detail' })
  desc: string;

  @ApiProperty({
    required: true,
    default: null,
  })
  image: any;

  @ApiProperty({ type: Date, required: true })
  createdStory: Date;
}
