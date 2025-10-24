import { IsString, MinLength } from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  @MinLength(2)
  name!: string;
}
