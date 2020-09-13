// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportNotify from '../../../app/model/notify';
import ExportRecord from '../../../app/model/record';

declare module 'egg' {
  interface IModel {
    Notify: ReturnType<typeof ExportNotify>;
    Record: ReturnType<typeof ExportRecord>;
  }
}
