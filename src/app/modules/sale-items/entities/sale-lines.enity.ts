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
import { SaleHeaders } from "./sale-header.entity";

@Entity("sale-lines")
export class SaleLines {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @ManyToOne(() => SaleHeaders)
    @JoinColumn()
    txnHeader: SaleHeaders;

    @Column({ type: "int", nullable: false })
    amount: number;

    @Column({ type: "int", nullable: true })
    discount: number;

    @Column({ type: "int", nullable: true })
    tax: number;

    @CreateDateColumn({ type: "varchar", nullable: false })
    createdDate: string;

    @UpdateDateColumn({ type: "varchar", nullable: false })
    modifiedDate: string;
}
