import express from "express"
import mysql from "mysql"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"M123N123Z_01",
    database:"test"
})


//If there is an auth problem
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY M123N123Z_01


//express server middleware to avoid error
// this allows us to send any json data from the client
app.use(express.json())


app.get("/", (req, res)=> {
    res.json("Hello this is the backend")
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM test.books"
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
    ];
    db.query(q, [values],(err, data) => {
        if(err) return res.json(err)
        return res.json("books has been created successfully")
    })
})



app.listen(8000,() => {
    console.log("connected to backend")
})