// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportInit from '../../../app/model/init';

declare module 'egg' {
  interface IModel {
    Init: ReturnType<typeof ExportInit>;
  }
}