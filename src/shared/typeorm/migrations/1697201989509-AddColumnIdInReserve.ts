import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddColumnIdInReserve1697201989509 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'reserve',
      new TableColumn({
        name: 'id',
        type: 'char(36)',
        isPrimary: true,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('reserve', 'id')
  }
}
