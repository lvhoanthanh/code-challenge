import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1680000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`
            CREATE TABLE "items" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "description" text NOT NULL,
                "price" numeric NOT NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "items"`);
    }
}