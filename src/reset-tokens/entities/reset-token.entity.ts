import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('resetTokens')
export class ResetToken {
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column({nullable:true})
    token: string;
    @Column({nullable:true})
    userId: string;
    @Column()
    expiryDate:Date
}

