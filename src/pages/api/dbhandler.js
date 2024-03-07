import { query } from "@/lib/db";

export default async function handler(req, res) {
    let message;
    if (req.method === "GET") {
        const data = await query({
             query : "SELECT * FROM posts",
             values : [],
        });

        res.status(200).json({ results: data});
    }

    if (req.method === "POST") {
        const question = req.body.question;
        const name = req.body.name;
        const addData = await query({
            query: "INSERT INTO posts (question, asker) VALUES (?, ?)",
            values: [question, name],
        });
        if (addData.insertId) { // If it worked
            message = "success"
        } else {
            message = "error"
        }
        let record = {
            record_id: addData.insertId, //The id of the record
            "question": question,      // The value we inserted
            "asker": name,
            "created": new Date(),
        }
        res.status(200).json({ response: message, record:record});
    }
    

    //const query = "INSERT INTO numbers (n) VALUES (102)";
   
}

//OTHER VID WAY
//import mysql from "mysql2/promise";
//export default async function handler(req, res) {

//    const connection = await mysql.createConnection({
//        host: 'localhost',
//        database: 'test',
//        port: '3306',
//        user: 'root',
//        password: 'ZoeHamilton3.14',

//    });

//    const query = "INSERT INTO numbers (n) VALUES (102)";
//    const query2 = "SELECT n FROM numbers";
//    const values = [];
//    const [data] = await connection.execute(query2, values);
//    connection.end();

//    res.status(200).json({ results: data });
//}
