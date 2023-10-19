import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddDefaultValueToToken1697745028646 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE user ALTER COLUMN token SET DEFAULT 'null'`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE user ALTER COLUMN token DROP DEFAULT`)
  }
}
