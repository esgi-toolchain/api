import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Skill } from '../../models/skill.entity';
import { StudentService } from '../student/student.service';
import { Student } from '../../models/student.entity';

@Injectable()
export class SkillService {
    constructor(@InjectRepository(Skill)
                private readonly skillRepository: Repository<Skill>,
                private studentService: StudentService) {
    }

    getAll(): Promise<Skill[]> {
        return this.skillRepository.find();
    }

    getOne(id: number): Promise<Skill> {
        return this.skillRepository.findOne(id);
    }

    async create(name: string, cc: number, exam: number, coef: number, studentId: number) {
        const student: Student = await this.studentService.getOne(studentId);
        return this.skillRepository.save({ name, cc, exam, coef, student});
    }

    delete(id: number): Promise<DeleteResult> {
        return this.skillRepository.delete(id);
    }
}
