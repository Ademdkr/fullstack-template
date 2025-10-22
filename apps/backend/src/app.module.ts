import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule, // 👈 wichtig: einbinden, sonst keine /api/health Route
  ],
})
export class AppModule {}
