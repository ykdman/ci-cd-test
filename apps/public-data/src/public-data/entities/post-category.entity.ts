import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post_category', { schema: 'public_data' })
export class PostCategory {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public post_category_name: string;
}
