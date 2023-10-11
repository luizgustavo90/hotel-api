import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateTableReserve1697045489736 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'reserve',
        columns: [
          {
            name: 'rommNo',
            type: 'int',
            isUnique: true,
          },
          {
            name: 'checkIn',
            type: 'timestamp',
          },
          {
            name: 'checkOut',
            type: 'timestamp',
          },
          {
            name: 'guestId',
            type: 'int',
            isUnique: true,
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('reserve')
  }
}
