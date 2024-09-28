import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Item } from "../entities";

@Entity("item_description")
export class ItemDescription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  label: string;

  @Column({ type: "varchar", length: 255 })
  value: string;

  @CreateDateColumn({ type: "timestamp" })
  createdDate: string;

  @UpdateDateColumn({ type: "timestamp" })
  modifiedDate: string;

  @Column({ type: "int", default: 1 })
  revisionNumber: number;

//   @Column({ type: "int" })
//   itemId?: number;
  // Foreign key relationship to the 'items' table
  @ManyToOne(() => Item, (item) => item.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "itemId" })
  item: Item;
}
