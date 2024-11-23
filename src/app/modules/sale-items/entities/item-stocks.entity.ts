import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import { SaleHeaders } from "./sale-header.entity";
import { Services } from "../../services/entities/services.entity";
import { Taxes } from "../../taxes/entities/taxes.entity";

@Entity("item_stocks")
export class ItemStocks{
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @ManyToOne(() => Services)
    @JoinColumn()
    service: Services;

    @Column({ type: "int", nullable: false })
    quantity: number;

    @UpdateDateColumn({ type: "varchar", nullable: false })
    modifiedDate: string;
}
