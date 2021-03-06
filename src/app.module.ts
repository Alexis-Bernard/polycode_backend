import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TokensModule } from './tokens/tokens.module';
import { AuthModule } from './auth/auth.module';
import { ExercisesModule } from './exercises/exercises.module';
import { ProgressionsModule } from './progressions/progressions.module';
import { TestsModule } from './tests/tests.module';
import { RunModule } from './run/run.module';

import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/entities/user.entity';
import { Token } from './tokens/entities/token.entity';
import { Exercise } from './exercises/entities/exercise.entity';
import { Progress } from './progressions/entities/progress.entity';
import { Test } from './tests/entities/test.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TokensModule,
    AuthModule,
    ExercisesModule,
    ProgressionsModule,
    TestsModule,
    RunModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_URL || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME || 'postgres',
      autoLoadModels: true,
      models: [User, Token, Exercise, Progress, Test],
    }),
  ],
})
export class AppModule {}
