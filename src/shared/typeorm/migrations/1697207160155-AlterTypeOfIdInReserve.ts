import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterTypeOfIdInReserve1697207160155 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE reserve MODIFY id CHAR(36)`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
