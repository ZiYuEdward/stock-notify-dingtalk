import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'seo_tab',
})

export class InitModel extends Model<InitModel> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    comment: '主键id',
  })
  id: number;

  @Column({
    comment: '项目名称',
    field: 'module_name',
  })
  moduleName: string;

  @Column({
    comment: '生产入口地址',
  })
  entry: string;

  @Column({
    comment: '路由对应表',
  })
  route_table_name: string;

  @Column({
    field: 'white_path',
    comment: '白名单数组json字符串',
  })
  whitePath: string;

  @Column({
    field: 'ignore_path',
    comment: '忽略路由数组json字符串',
  })
  ignorePath: string;

  @Column({
    field: 'not_found_path',
    comment: '未找到路由数组json字符串',
  })
  notFoundPath: string;

  @Column({
    field: 'ignore_params',
    comment: '忽略参数数组json字符串',
  })
  ignoreParams: string;

  @Column({
    field: 'created_at',
  })
  created_at: Date;

  @Column({
    field: 'updated_at',
  })
  updated_at: Date;
}

export default () => InitModel;
