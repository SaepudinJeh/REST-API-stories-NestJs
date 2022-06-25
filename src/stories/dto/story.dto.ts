import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import * as mongoose from 'mongoose'
import { CreateStoryDto } from "./createStory.dto";

export class StoryDto extends CreateStoryDto {
    constructor() {
        super()
    }

    @IsNotEmpty({ message: 'Author cannot be empty' })
    @ApiProperty({ type: mongoose.Types.ObjectId })
    author: mongoose.Types.ObjectId;
}