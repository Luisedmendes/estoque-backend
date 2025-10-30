import { Base } from '@shared/container/modules/entities/Base';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Product } from './Product';

@Entity('categories')
export class Category extends Base {
  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @OneToMany(() => Product, product => product.category, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  public products: Array<Product>;
}
