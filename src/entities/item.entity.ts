import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ItemImage } from "./item-images.entity";
import { ItemDescription } from "./item-description.enity";

@Entity("items")
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  code: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  description: string;

  @Column({ type: "int", default: 0 })
  isInactive: number;

  @Column({ type: "int" })
  salePrice: number;

  @Column({ type: "int", nullable: true })
  discount: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  dimension: string;

  @CreateDateColumn({ type: "varchar" })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar" })
  modifiedDate: string;

  @Column({ type: "int", default: 1 })
  revisionNumber: number;

  @OneToMany(() => ItemImage, (itemImage) => itemImage.item)
  itemImage: ItemImage[];

  @OneToMany(() => ItemDescription, (itemDescription) => itemDescription.item)
  itemDescription: ItemDescription[];
}
