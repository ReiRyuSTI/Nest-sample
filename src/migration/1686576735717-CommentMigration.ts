import { MigrationInterface, QueryRunner } from "typeorm";

export class CommentMigration1686576735717 implements MigrationInterface {
    name = 'CommentMigration1686576735717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "userId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userId"`);
    }

}
