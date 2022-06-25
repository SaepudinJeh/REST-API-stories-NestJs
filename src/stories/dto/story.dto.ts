import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import * as mongoose from 'mongoose'
import { CreateStoryDto } from "./createStory.dto";

export class StoryDto extends CreateStoryDto {
    constructor() {
        super()
    }

    @IsNotEmpty({ message: 'AuthorId cannot be empty' })
    @ApiProperty({ type: mongoose.Types.ObjectId })
    authorId: mongoose.Types.ObjectId;
}