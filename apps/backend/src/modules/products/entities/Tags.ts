import { Base } from '@shared/container/modules/entities/Base';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Product } from './Product';

@Entity('tags')
export class Tag extends Base {
  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @ManyToMany(() => Product, product => product.tags)
  @JoinTable({
    name: "product_tags",
    joinColumn: {
      name: "tag_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "product_id",
      referencedColumnName: "id"
    }
  })
  products: Product[];


}
