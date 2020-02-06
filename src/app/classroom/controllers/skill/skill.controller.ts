import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SkillService } from '../../services/skill/skill.service';
import { Skill } from '../../models/skill.entity';
import { DeleteResult } from 'typeorm';

@Controller('skill')
export class SkillController {

    constructor(private skillService: SkillService) {
    }

    @Get()
    findAll(): Promise<Skill[]> {
        return this.skillService.getAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<Skill> {
        return this.skillService.getOne(id);
    }

    @Post()
    create(@Body() body): Promise<Skill> {
        return this.skillService.create(body.name, body.cc, body.exam, body.coef, body.studentId);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<DeleteResult> {
        return this.skillService.delete(id);
    }
}
