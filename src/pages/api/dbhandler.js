import { query } from "@/lib/db";

export default async function handler(req, res) {
    let message;
    if (req.method === "GET") {
        var data = {};
        const requestType = req.query.requestType;
        if (requestType === "all") {
            const email = req.query.email;
            if (email) {
                data = await query({
                    query: "SELECT id, question, asker, created, img, name, count(likes.postId) likes, (Select count(userId) from likes where likes.userId='" + email + "' and likes.postId=posts.id) liked, (Select count(id) from answers where answers.postId=posts.id) answers FROM posts LEFT JOIN users ON users.email = posts.asker LEFT JOIN likes on likes.postId = posts.id GROUP BY id ORDER BY liked, likes desc; ",
                    values: [],
                });
            } else {
                data = await query({
                    query: "SELECT id, question, asker, created, img, name, count(likes.postId) likes FROM posts LEFT JOIN users ON users.email = posts.asker LEFT JOIN likes on likes.postId = posts.id GROUP BY id ORDER BY liked, likes desc;  ",
                    values: [],
                });
            }
        } else if (requestType === "search") {
            const searchTerm = req.query.term;
            const email = req.query.email;
            if (email) {
                data = await query({
                    query: "SELECT id, question, asker, created, img, name, count(likes.postId) likes, (Select count(userId) from likes where likes.userId='" + email + "' and likes.postId=posts.id) liked, (Select count(id) from answers where answers.postId=posts.id) answers FROM posts LEFT JOIN users ON users.email = posts.asker LEFT JOIN likes on likes.postId = posts.id WHERE question LIKE '%" + searchTerm + "%' GROUP BY id ORDER BY liked, likes desc;",
                    values: [],
                });
            } else {
                data = await query({
                    query: "SELECT id, question, asker, created, img, name, count(likes.postId) likes FROM posts LEFT JOIN users ON users.email = posts.asker LEFT JOIN likes on likes.postId = posts.id WHERE question LIKE '%" + searchTerm + "%' GROUP BY id ORDER BY liked, likes desc;",
                    values: [],
                });
            }
            //data = await query({
            //    query: "SELECT id, question, asker, created, img, name FROM posts LEFT JOIN users ON users.email = posts.asker WHERE question LIKE '%" + searchTerm + "%'",
            //    values: [],
            //});
        } else if (requestType === "answers") {
            const postId = req.query.id;
            const email = req.query.email;
            const answers = await query({
                query: "SELECT id, postId, answer, answerer, created, img, name, count(answer_likes.answerId) likes, (Select count(answerId) from answer_likes where answer_likes.userId='" + email + "' and answer_likes.answerId=answers.id) liked FROM answers LEFT JOIN users ON users.email = answers.answerer LEFT JOIN answer_likes on answer_likes.answerId = answers.id WHERE postId = " + postId + " GROUP BY answers.id ORDER BY likes desc;",
                values: [],
            });
            let questionData;

            if (email) {
                questionData = await query({
                    query: "SELECT id, question, asker, created, img, name, count(likes.postId) likes, (Select count(userId) from likes where likes.userId='" + email + "' and likes.postId=posts.id) liked, (Select count(id) from answers where answers.postId=posts.id) answers FROM posts LEFT JOIN users ON users.email = posts.asker LEFT JOIN likes on likes.postId = posts.id WHERE id = " + postId+ " GROUP BY id ORDER BY liked, likes desc; ",
                    values: [],
                });
            } else {
                questionData = await query({
                    query: "SELECT id, question, asker, created, img, name, count(likes.postId) likes FROM posts LEFT JOIN users ON users.email = posts.asker LEFT JOIN likes on likes.postId = posts.id WHERE id = " + postId + " GROUP BY id ORDER BY liked, likes desc;  ",
                    values: [],
                });
            }

            data = {
                "answers": answers,
                "questionData": questionData,
            }
        } else if (requestType == "activity") {
            const email = req.query.user;
            data = await query({
                query: "SELECT posts.id, question, count(posts.id) amount FROM posts JOIN answers ON answers.postId = posts.id JOIN new_activity ON new_activity.answerId = answers.id WHERE asker = '" + email + "' GROUP BY posts.id ORDER BY count(answers.id) DESC; ",
                values: [],
            });
        }

        res.status(200).json({ results: data});
    }

    if (req.method === "POST") {
        const requestType = req.query.requestType;
        var record = {};
        if (requestType === "createPost") {
            const question = req.body.question;
            const email = req.body.email;
            const addData = await query({
                query: "INSERT INTO posts (question, asker) VALUES (?, ?)",
                values: [question, email],
            });
            if (addData.insertId) { // If it worked
                message = "success"
            } else {
                message = "error"
            }

            const [userData] = await query({
                query: "SELECT id, question, asker, created, img, name FROM posts LEFT JOIN users ON users.email = posts.asker WHERE asker = '" + email + "' and id = " + addData.insertId + ";",
                values: [],
            });

            record = {
                "id": addData.insertId, //The id of the record
                "question": question,      // The value we inserted
                "asker": email,
                "created": userData.created,
                "img": userData.img,
                "name": userData.name
            }
        } else if (requestType === "createAnswer") {
            const answer = req.body.answer;
            const email = req.body.email;
            const postId = req.body.postId;
            const addData = await query({
                query: "INSERT INTO answers (postId, answer, answerer) VALUES (?, ?, ?)",
                values: [postId, answer, email],
            });
            if (addData.insertId) { // If it worked
                message = "success"
            } else {
                message = "error"
            }

            const [userData] = await query({
                query: "SELECT id, created, img, name FROM answers LEFT JOIN users ON users.email = answers.answerer WHERE answerer = '" + email + "' and id = " + addData.insertId + ";",
                values: [],
            });

            record = {
                "id": addData.insertId, //The id of the record
                "postId": postId,
                "answer": answer,      // The value we inserted
                "answerer": email,
                "created": userData.created,
                "img": userData.img,
                "name": userData.name,
                "liked": 0,
                "likes": 0,
            }
        } else if (requestType === "userExists") {
            const email = req.body.email;
            const name = req.body.name;
            const img = req.body.img;
            const userExists = await query({
                query: "Select insert_user_if_not_exists(?, ?, ?);",
                values: [email, name, img],
            });
            if (userExists) { // If it worked
                message = "success"
            } else {
                message = "error"
            }
            const boolean = userExists[0]["insert_user_if_not_exists(?, ?, ?)"]
            record = {
                "Does User Exist": boolean
            };
        } else if (requestType === "deleteActivity") {
            const email = req.body.email;
            const postId = req.body.postId;

            const deleteData = await query({
                query: "DELETE FROM new_activity WHERE(userId, answerId) IN(SELECT subquery.asker, subquery.id FROM( SELECT answers.id, asker FROM posts JOIN answers ON answers.postId = posts.id JOIN new_activity ON new_activity.answerId = answers.id WHERE asker = '" + email + "' and posts.id = " + postId + " ) AS subquery); ",
                values: [],
            });
            if (deleteData.affectedRows > 0) { // If it worked
                message = "success"
                record = deleteData;
            } else {
                message = "error"
            }
            
        } else if (requestType === "addLike") {
            const email = req.body.email;
            const postId = req.body.postId;

            const addData = await query({
                query: "INSERT INTO likes (userId, postId) VALUES('" + email + "', " + postId + "); ",
                values: [],
            });
            if (addData.affectedRows > 0) { // If it worked
                message = "success"
            } else {
                message = "error"
            }
            record = {
                "userId": email,
                "postId": postId,
            }
        } else if (requestType === "removeLike") {
            const email = req.body.email;
            const postId = req.body.postId;

            const deleteData = await query({
                query: "DELETE FROM likes WHERE userId = '" + email + "' and postId = " + postId + "; ",
                values: [],
            });
            if (deleteData.affectedRows > 0) { // If it worked
                message = "success"
                record = deleteData;
            } else {
                message = "error"
            }
        } else if (requestType === "addAnswerLike") {
            const email = req.body.email;
            const answerId = req.body.answerId;

            const addData = await query({
                query: "INSERT INTO answer_likes (userId, answerId) VALUES('" + email + "', " + answerId + "); ",
                values: [],
            });
            if (addData.affectedRows > 0) { // If it worked
                message = "success"
            } else {
                message = "error"
            }
            record = {
                "userId": email,
                "answerId": answerId,
            }
        } else if (requestType === "removeAnswerLike") {
            const email = req.body.email;
            const answerId = req.body.answerId;

            const deleteData = await query({
                query: "DELETE FROM answer_likes WHERE userId = '" + email + "' and answerId = " + answerId + "; ",
                values: [],
            });
            if (deleteData.affectedRows > 0) { // If it worked
                message = "success"
                record = deleteData;
            } else {
                message = "error"
            }
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
