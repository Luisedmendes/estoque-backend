import { User } from '@modules/users/entities/User';
import { Base } from '@shared/container/modules/entities/Base';
import {
  AfterLoad,
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Category } from './Category';

interface TransactionDTO {
  quantity: number;
  sold_value: number;
  company: string;
  profit: number;
}

@Entity('products')
export class Product extends Base {
  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @Column({ type: 'float', nullable: false })
  public cost_price: number;

  @Column({ type: 'float', nullable: false })
  public sell_price: number;


  @ManyToOne(() => Category, category => category.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_product_category',
  })
  public category: Category;
}
