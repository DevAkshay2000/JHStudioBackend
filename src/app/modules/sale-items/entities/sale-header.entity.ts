import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from "typeorm";
import { Users } from "../../auth/entities/user.entity";
import { Customer } from "../../customer/entities/customer.entity";
import {
  City,
  Country,
  DPaymentType,
  States,
} from "../../general-data/entities";
import { SaleLines } from "./sale-lines.enity";

@Entity("sale-headers")
export class SaleHeaders {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  code: string;

  @CreateDateColumn({ type: "varchar", nullable: false })
  txnDate: string;

  @ManyToOne(() => Customer)
  @JoinColumn()
  customer: Country;

  @ManyToOne(() => Users)
  @JoinColumn()
  user: Users;

  @ManyToOne(() => DPaymentType)
  @JoinColumn()
  paymentType: DPaymentType;

  @Column({ type: "int", nullable: false })
  totalAmount: number;

  @Column({ type: "int", nullable: true })
  totalDiscount: number;

  @Column({ type: "int", nullable: true })
  totalTax: number;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;
  
  @OneToMany(() => SaleLines, (line) => line.txnHeader)
  saleLines: SaleLines[];
}
