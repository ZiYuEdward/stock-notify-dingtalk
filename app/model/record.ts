import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'stock_config',
})

export class RecordModel extends Model<RecordModel> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    comment: '主键id',
  })
  id: number;

  @Column({
    comment: '股票代码',
    field: 'stock_code',
  })
  stockCode: string;

  @Column({
    comment: '股票交易所(SH/SZ)',
    field: 'stock_type',
  })
  stockType: string;

  @Column({
    comment: '涨幅通知阶段，0-10,多阶段用,分割',
    field: 'rise_percent',
  })
  risePercent: string;

  @Column({
    field: 'fall_percent',
    comment: '下跌通知阶段',
  })
  fallPercent: string;

  @Column({
    comment: '是否启用',
    field: 'stock_enable',
  })
  stockEnable: number;

  @Column({
    field: 'created_at',
  })
  created_at: Date;

  @Column({
    field: 'updated_at',
  })
  updated_at: Date;
}

export default () => RecordModel;
