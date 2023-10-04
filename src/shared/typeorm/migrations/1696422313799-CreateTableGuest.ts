import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateTableGuest1696422313799 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'guest',
        columns: [
          {
            name: 'id',
            type: 'char(36)',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar(255)',
            isUnique: true,
          },
          {
            name: 'document',
            type: 'varchar(255)',
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar(255)',
            isUnique: true,
          },
          {
            name: 'phone',
            type: 'varchar(255)',
            isUnique: true,
          },
          {
            name: 'age',
            type: 'int',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('guest')
  }
}
