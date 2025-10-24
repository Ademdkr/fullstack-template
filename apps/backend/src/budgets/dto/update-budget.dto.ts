import { IsString, MinLength } from 'class-validator';

export class UpdateBudgetDto {
  @IsString()
  @MinLength(2)
  name!: string;
}
