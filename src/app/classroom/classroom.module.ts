import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './models/student.entity';
import { StudentService } from './services/student/student.service';
import { StudentController } from './controllers/student/student.controller';
import { SkillService } from './services/skill/skill.service';
import { Skill } from './models/skill.entity';
import { SkillController } from './controllers/skill/skill.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Student, Skill])],
    providers: [StudentService, SkillService],
    controllers: [StudentController, SkillController],
})
export class ClassroomModule {
}
