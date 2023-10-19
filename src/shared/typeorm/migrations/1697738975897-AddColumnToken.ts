import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddColumnToken1697738975897 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'token',
        type: 'varchar(255)',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'token')
  }
}
