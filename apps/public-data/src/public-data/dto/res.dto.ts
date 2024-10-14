import { IsInt, IsString } from 'class-validator';

export class PostCategoryResDto {
  @IsInt()
  public id: number;

  @IsString()
  public post_category_name: string;
}
