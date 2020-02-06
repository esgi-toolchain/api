import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../../models/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {

    constructor(@InjectRepository(Student)
                private readonly studentRepository: Repository<Student>) {
    }

    getAll(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    getOne(id: number): Promise<Student> {
        return this.studentRepository.findOne(id, {relations: ['skills']});
    }
}
