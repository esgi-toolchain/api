import { Controller, Get, Param } from '@nestjs/common';
import { Student } from '../../models/student.entity';
import { StudentService } from '../../services/student/student.service';

@Controller('student')
export class StudentController {

    constructor(private studentService: StudentService) {
    }

    @Get()
    findAll(): Promise<Student[]> {
        return this.studentService.getAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<Student> {
        return this.studentService.getOne(id);
    }
}
