import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateParamsToNotUnique1696946763539
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE room DROP CONSTRAINT UQ_a458104dbed63cfbe1d67509d4b`,
    )
    await queryRunner.query(
      `ALTER TABLE room DROP CONSTRAINT UQ_5a89490c0ecbf433c3f825f8e14`,
    )
    await queryRunner.query(
      `ALTER TABLE room DROP CONSTRAINT UQ_47e838b29ea85ea03b7c9309de7`,
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {
    // nao é necessario
  }
}
