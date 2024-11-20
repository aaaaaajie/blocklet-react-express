import { RunResult } from 'sqlite3';

import { UserInfo } from '../../../../common/interfaces/user';
import DBClient from '../../libs/db';
import { UpdateUserDto } from './user.dto';

class UserService {
  getUserById(id: number): Promise<UserInfo> {
    return new Promise((resolve, reject) => {
      DBClient.db.get('select * from users where id = ?', id, (err, row) => {
        if (err) {
          return reject(err);
        }
        return resolve(row as UserInfo);
      });
    });
  }

  updateUserById(id: number, data: UpdateUserDto): Promise<void> {
    const sql = 'update users set username = ?,tel_no = ?, email = ?, address = ? where id = ?;';
    const values = [data.username, data.tel_no, data.email, data.address, id];
    return new Promise((resolve, reject) => {
      DBClient.db.run(`${sql} where id = ?;`, values, (_: RunResult, err: Error | null) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  }
}

export const userService = new UserService();
