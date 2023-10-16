import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddTotalCostInReserve1697481350478 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'reserve',
      new TableColumn({
        name: 'totalCost',
        type: 'decimal', // ou qualquer outro tipo de dados desejado
        precision: 10, // precisão para números decimais
        scale: 2, // número de casas decimais
        default: 0, // valor padrão para a nova coluna
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('reserve', 'totalCost')
  }
}
