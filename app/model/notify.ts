import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'stock_notify',
})

export class NotifyModel extends Model<NotifyModel> {
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
    comment: '通知时的涨跌幅',
    field: 'trigger_percent',
  })
  triggerPercent: string;

  @Column({
    comment: '是否重新通知',
    field: 'repeat',
  })
  repeat: number;

  @Column({
    comment: '通知日期（日）',
    field: 'record_time',
  })
  recordTime: string;

  @Column({
    field: 'created_at',
  })
  created_at: Date;

  @Column({
    field: 'updated_at',
  })
  updated_at: Date;
}

export default () => NotifyModel;
