import { Role } from 'src/roles/entities/role.entity';
import { Action } from 'src/roles/enum/actions.emum';
import { Ressource } from 'src/roles/enum/ressources.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permissions')

export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Ressource, // Utilisez 'enum' pour définir la colonne comme un type énuméré
    nullable: false,
})
ressource: Ressource;

  @Column({
    type: 'text', // Utilisez 'text' pour stocker les actions en JSON
    nullable: false,
})
actions: string; // Stockez les actions sous forme de chaîne JSON


  // Méthode pour obtenir les actions sous forme de tableau d'énumérations
  getActions(): Action[] {
    return JSON.parse(this.actions);
   
}
// Méthode pour définir les actions à partir d'un tableau d'énumérations
setActions(actions: Action[]): void {
    this.actions = JSON.stringify(actions);
}

  @ManyToOne(()=>Role,(role)=>role.permissions)
  role:Role
}
