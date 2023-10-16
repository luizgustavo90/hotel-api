import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterTypeOfGuestIdReverse1697207755517
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE reserve MODIFY guestId CHAR(36)`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
