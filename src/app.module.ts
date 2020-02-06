import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ClassroomModule } from './app/classroom/classroom.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './app/classroom/models/student.entity';
import { Skill } from './app/classroom/models/skill.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT, 10) || 3000,
            username: process.env.DATABASE_USERNAME,
            database: process.env.DATABASE_DATABASE,
            password: process.env.DATABASE_PASSWORD,
            entities: [Skill, Student],
            synchronize: true,
            logging: true,
        }),
        ClassroomModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
