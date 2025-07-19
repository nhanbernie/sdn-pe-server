import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger('DatabaseModule');
        const mongoUri =
          configService.get<string>('MONGODB_URI') ||
          'mongodb://localhost:27017/myapp';

        logger.log('Initializing MongoDB connection...');
        logger.log(`MongoDB URI: ${mongoUri.replace(/\/\/.*@/, '//***:***@')}`); // Hide credentials in log

        return {
          uri: mongoUri,
          onConnectionCreate: (connection) => {
            connection.on('connected', () => {
              logger.log('MongoDB connected successfully!');
              logger.log(`Database: ${connection.db?.databaseName}`);
              logger.log(`Host: ${connection.host}:${connection.port}`);

              // Console log for terminal
              console.log('\n=== MongoDB Connection Info ===');
              console.log(`Status: Connected`);
              console.log(`Database: ${connection.db?.databaseName}`);
              console.log(`Host: ${connection.host}:${connection.port}`);
              console.log('===============================\n');
            });

            connection.on('error', (error) => {
              logger.error('MongoDB connection error:', error.message);
            });

            connection.on('disconnected', () => {
              logger.warn('MongoDB disconnected');
            });

            return connection;
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
