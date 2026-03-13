import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ nullable: true })
    phone!: string;

    @Column({ nullable: true })
    username!: string;

}