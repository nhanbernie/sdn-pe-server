import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth() {
    const dbStatus = await this.databaseService.getConnectionStatus();
    const dbPing = await this.databaseService.ping();

    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      message: 'Server is running successfully!',
      database: {
        ...dbStatus,
        ping: dbPing,
      },
    };
  }
}
