import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm'

export class AddRoomNoToGuest1696532556860 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'guest',
      new TableColumn({
        name: 'roomNo',
        type: 'int',
        isNullable: true,
      }),
    )

    await queryRunner.createForeignKey(
      'guest',
      new TableForeignKey({
        name: 'GuestRoom',
        columnNames: ['roomNo'],
        referencedTableName: 'room',
        referencedColumnNames: ['rommNo'],
        onDelete: 'SET NULL',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('guest', 'GuestRoom')
    await queryRunner.dropColumn('guest', 'roomId')
  }
}
