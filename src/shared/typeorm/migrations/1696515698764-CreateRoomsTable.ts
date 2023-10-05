import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateRoomsTable1696515698764 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'room',
        columns: [
          {
            name: 'rommNo',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'type',
            type: 'varchar(65)',
            isUnique: true,
          },
          {
            name: 'value',
            type: 'float',
            isUnique: true,
          },
          {
            name: 'status',
            type: 'varchar(65)',
            isUnique: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isUnique: true,
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('room')
  }
}
