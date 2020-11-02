import { Module } from '@nestjs/common';
import { controllers, services } from './entities/entities';

@Module({
  imports: [],
  controllers: controllers,
  providers: services,
})
export class AppModule {}
