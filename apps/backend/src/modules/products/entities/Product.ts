import { Base } from '@shared/container/modules/entities/Base';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Category } from './Category';
import { File } from '@modules/system/entities/File';
import { Tag } from './Tags';

@Entity('products')
export class Product extends Base {
  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @Column({ type: 'float', nullable: false })
  public cost_price: number;

  @Column({ type: 'float', nullable: false })
  public sell_price: number;

  @Column({ type: 'varchar', nullable: false })
  public category_id: string;

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

  @Column({ type: 'varchar', nullable: false })
  public file_id: string;

  @OneToOne(() => File)
  @JoinColumn({
    name: 'file_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_file_product',
  })
  public file: File

  @ManyToMany(() => Tag, tag => tag.products, { onDelete: 'CASCADE' })
  public tags: Array<Tag>
}
