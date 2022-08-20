import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateStoryDto {
  @IsNotEmpty({ message: '_id cannot be empty' })
  @ApiProperty({ type: String })
  _id: string;

  @IsNotEmpty({ message: 'Title cannot be empty' })
  @ApiProperty({ type: String, default: 'Ini bagian title' })
  title: string;

  @ApiProperty({ type: String, default: 'Ini untuk detail' })
  desc: string;

  @ApiProperty({
    required: false,
    default: null,
  })
  image: any;

  @ApiProperty({ type: Date, required: false })
  createdStory: Date;
}
