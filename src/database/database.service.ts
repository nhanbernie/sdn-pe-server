import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(@InjectConnection() private connection: Connection) {
    this.setupConnectionListeners();
  }

  private setupConnectionListeners() {
    this.connection.on('connected', () => {
      this.logger.log('MongoDB connected successfully!');
      this.logger.log(`Database: ${this.connection.db?.databaseName}`);
      this.logger.log(`Host: ${this.connection.host}:${this.connection.port}`);

      console.log('\n=== MongoDB Connection Info ==='); 
      console.log(`Status: Connected`);
      console.log(`Database: ${this.connection.db?.databaseName}`);
      console.log(`Host: ${this.connection.host}:${this.connection.port}`);
    });

    this.connection.on('error', (error) => {
      this.logger.error('MongoDB connection error:', error.message);
    });

    this.connection.on('disconnected', () => {
      this.logger.warn('MongoDB disconnected');
    });

    this.connection.on('reconnected', () => {
      this.logger.log('MongoDB reconnected');
    });
  }

  async getConnectionStatus() {
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };

    return {
      status: states[this.connection.readyState] || 'unknown',
      database: this.connection.db?.databaseName,
      host: this.connection.host,
      port: this.connection.port,
      readyState: this.connection.readyState,
    };
  }

  async ping() {
    try {
      if (!this.connection.db) {
        return { success: false, message: 'Database not connected' };
      }
      await this.connection.db.admin().ping();
      return { success: true, message: 'Database ping successful' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
