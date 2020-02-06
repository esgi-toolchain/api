import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';

@Entity()
export class Skill {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column()
    cc: number;

    @Column()
    exam: number;

    @Column()
    coef: number;

    @ManyToOne(type => Student, student => student.skills, {
        nullable: false,
    })
    student: Student;
}
