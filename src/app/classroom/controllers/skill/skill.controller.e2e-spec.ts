import { SkillController } from './skill.controller';
import { SkillService } from '../../services/skill/skill.service';
import { Test } from '@nestjs/testing';
import { Skill } from '../../models/skill.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentService } from '../../services/student/student.service';
import { Student } from '../../models/student.entity';

describe('SkillsController', () => {
    let skillController: SkillController;
    let skillService: SkillService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [SkillController],
            providers: [
                SkillService,
                StudentService,
                {
                    provide: getRepositoryToken(Skill),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Student),
                    useClass: Repository,
                },
            ],
        }).compile();

        skillService = moduleRef.get<SkillService>(SkillService);
        skillController = moduleRef.get<SkillController>(SkillController);
    });

    describe('findAll', () => {
        it('should return an array of Skills', async () => {
            const result = new Promise<Skill[]>((resolve) => {
                resolve([]);
            });
            jest.spyOn(skillService, 'getAll').mockImplementation(() => result);

            expect(await skillController.findAll()).toEqual([]);
        });
    });
});
