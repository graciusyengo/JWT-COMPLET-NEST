
import { Permission } from "src/permissions/entities/permission.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')

export class Role {

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({nullable:false})
    name:string

    @OneToMany(()=>Permission,(permission)=>permission.role,{cascade:true})
    permissions:Permission[]

}
