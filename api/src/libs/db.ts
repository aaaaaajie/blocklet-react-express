import { Database, verbose } from 'sqlite3';

import logger from './logger';
import { SQL } from './sql';

export default class DBClient {
  private static _db: Database;

  static get db() {
    return this._db;
  }

  static init() {
    if (DBClient._db) {
      return;
    }
    const Driver = verbose();
    DBClient._db = new Driver.Database('sql.db', (err) => {
      if (err) throw err;
      logger.log('数据库连接成功');
    });
    this.initTables();
    logger.log('数据初始化完成');
  }

  private static initTables() {
    DBClient._db.serialize(() => {
      for (const x of SQL) {
        DBClient._db.run(x);
      }
    });
  }
}
