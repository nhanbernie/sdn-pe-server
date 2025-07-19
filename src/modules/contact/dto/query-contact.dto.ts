import { IsOptional, IsString, IsIn } from 'class-validator';

export class QueryContactDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  @IsIn(['Friends', 'Work', 'Family', 'Other'])
  group?: string;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sort?: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  sortBy?: string;
}
