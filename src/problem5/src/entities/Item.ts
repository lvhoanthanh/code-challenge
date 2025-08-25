import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity({ name: "items" })
export class Item {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  description!: string;

  @Column("numeric")
  @IsNotEmpty()
  @IsNumber()
  price!: number;
}