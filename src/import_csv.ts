import * as fs from "fs";
import { parse } from 'csv-parse/sync';

class User {
    id: string;
    name: string;
    age: number;
    createdAt: Date;

    constructor(id: string, name: string, age: number, createdAt: Date){
        this.id = id;
        this.name = name;
        this.age = age;
        this.createdAt = createdAt;
    }
}

const users: User[] = [];

function readCsv() {
  const data = fs.readFileSync('users.csv');
  const records = parse(data, {
    //  BOM付きの場合はtrueにする
    bom: true,
    // ヘッダを無視したいので、2行目から読み込む
    from: 2,
  });
  for (const record of records) {
      const id = record[0];
      const name = record[1];
      const age = Number(record[2]);
      const createdAt = new Date(record[3]);

      const user = new User(
        id,
        name,
        age,
        createdAt,
      );
      users.push(user);
  }
}

readCsv();
console.log(users);
