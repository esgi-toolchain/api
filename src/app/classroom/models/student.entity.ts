import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Skill } from './skill.entity';

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    lastName: string;

    @Column({ length: 50 })
    firstName: string;

    @OneToMany(type => Skill, subject => subject.student)
    skills: Skill[];
}
