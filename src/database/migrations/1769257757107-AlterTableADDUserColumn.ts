import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableADDUserColumn1769257757107 implements MigrationInterface {
    name = 'AlterTableADDUserColumn1769257757107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`username\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`username\``);
    }

}
