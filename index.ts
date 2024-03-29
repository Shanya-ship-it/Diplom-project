//файл для запуска сервера

//импорт нужных мне фреймворков (или просто важных штук) ,
//дотенв для окр.пер.  экспресс для веб, патх - путь

import dotenv from "dotenv"; //неуверена что это мне нужно
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { pool, initDb, query } from "./db"; //импорт бд

async function main() {
  console.log("Hello! Server starting uwu");
  // Вызываем инициализацию базы
  await initDb();

  const { json } = require("body-parser"); //боди-парсер чтобы достать боди из реквеста, когда идет пост-запрос
  const port = process.env.PORT || 8080;

  //config will read your .env file, parse the contents, assign it to process.env, and return an Object with a parsed key containing the loaded content or an error key if it failed.
  //то есть конфиг читает моий файл где пер.окружения, парс контент и еще что-то куча
  dotenv.config();

  //создать объект экспресс чтобы с ним работать (создаем объект приложения)
  const app: Express = express();

  //Встроенный посредник, разбирающий входящие запросы в объект в формате JSON. основан на body-parser.
  //переводит данные в формат жсон
  app.use(express.json());
  app.use(cors());
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World From the Typescript Server!");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

  //ниже запросы к бд
  app.get("/client/:id", async (req, res) => {
    const id = req.params.id;
    const {
      rows: [client],
    } = await query`
      SELECT id "id"
        ,name "name"
        ,surname "surname"
        ,adress "adress"
        ,phoneNumber "phoneNumber"
        ,email "email"
        ,company "company"
      FROM clients
      WHERE id=${id}
    `;

    res.json(client); //в ответку передаем данные таблицы рядом, в формате жсон
  }); //достать всю таблицу клиентов

  app.get("/clients", async (req, res) => {
    const z1 = await pool.query(`
      SELECT id "id"
        ,name "name"
        ,surname "surname"
        ,adress "adress"
        ,phoneNumber "phoneNumber"
        ,email "email"
        ,company "company"
      FROM clients
      ORDER BY surname,name
    `);
    res.json(z1.rows); //в ответку передаем данные таблицы рядом, в формате жсон
  }); //достать всю таблицу клиентов

  //contracts
  app.get("/contracts", async (req, res) => {
    const z1 = await pool.query(`
      SELECT id "id"
        ,clientId "clientId"
        ,contractNumber "contractNumber"
        ,dateBegin "dateBegin"
        ,dateEnd "dateEnd"
        ,price "price"
      FROM contracts
    `);
    res.json(z1.rows);
  });

  app.post("/client", async (req, res) => {
    const { id, name, surname, adress, phoneNumber, email, company } = req.body;

    if (id) {
      const update = await query`
      UPDATE clients SET (name, surname, adress, phoneNumber, email, company) = 
      (${name}, ${surname}, ${adress}, ${phoneNumber}, ${email}, ${company})
      WHERE id=${id}`;
    } else {
      const newPerson = await query`
      INSERT INTO clients (name, surname, adress, phoneNumber, email, company)
        VALUES (${name}, ${surname}, ${adress}, ${phoneNumber}, ${email}, ${company})
      RETURNING *`;
      res.json(newPerson.rows);
    }
  });

  app.post("/client", async (req, res) => {
    const { id } = req.body;
    const newPerson = await query`
      SELECT clients (name, surname, adress, phoneNumber, email, company)
        WHERE id=(${id})
      RETURNING *`;
    res.json(newPerson.rows);
  });

  app.post("/client/delete/:id", async (req, res) => {
    const { id } = req.params;
    const zapros = await query`DELETE FROM clients where id = ${id}`;
    res.json(zapros.rows);
  });
}

main();
