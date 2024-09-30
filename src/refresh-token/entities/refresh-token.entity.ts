import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('refreshTokens')
export class RefreshToken {
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column({nullable:true})
    token: string;
    @Column({nullable:true})
    userId: string;
    @Column()
    expiryDate:Date
}
