const express = require("express");
const sql = require("mssql");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(
    cors({
        origin: "http://localhost:4200",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    })
);


app.use(bodyParser.json());

const dbConfig = {
    user: "sa",
    password: "marjan2024",
    server: "LAPTOP-NPUTF5LR",
    database: "DigitalLibrary",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

sql.connect(dbConfig)
    .then(() => {
        console.log("Connected to the MSSQL database!");
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });

app.get("/", (req, res) => {
    res.send("Welcome to the Digital Library API!");
});


app.post('/books', async (req, res) => {
    const { bookName, authorName, price } = req.body;

    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('bookName', sql.NVarChar, bookName)
            .input('authorName', sql.NVarChar, authorName)
            .input('price', sql.Decimal, price)
            .query(`
          INSERT INTO Books (BookName, AuthorName, Price)
          VALUES (@bookName, @authorName, @price)
        `);

        res.json({ success: true, message: 'Book added successfully!' });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ success: false, message: 'Database error' });
    }
});

app.get('/books', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .query(`SELECT BookID, BookName, AuthorName, Price FROM Books`);

        res.json({ success: true, data: result.recordset });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ success: false, message: 'Database error' });
    }
});

app.delete('/books/:id', async (req, res) => {
    const bookId = req.params.id;

    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('bookId', sql.Int, parseInt(bookId, 10))
            .query('DELETE FROM Books WHERE BookID = @bookId');

        res.json({ success: true, message: 'Book deleted successfully!' });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ success: false, message: 'Database error' });
    }
});



app.post("/register", async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const pool = await sql.connect(dbConfig);

        const checkUser = await pool
            .request()
            .input("username", sql.NVarChar, username)
            .query("SELECT COUNT(*) as count FROM UserLogin WHERE Username = @username");

        const userCount = checkUser.recordset[0].count;
        if (userCount > 0) {
            return res
                .status(400)
                .json({ success: false, message: "Username already exists. Please use a different one." });
        }

        await pool
            .request()
            .input("email", sql.NVarChar, email)
            .input("username", sql.NVarChar, username)
            .input("password", sql.NVarChar, password)
            .query("INSERT INTO UserLogin (Email, Username, Password) VALUES (@email, @username, @password)");

        res.json({ success: true, message: "User registered successfully!" });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ success: false, message: "Database error" });
    }
});


app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const pool = await sql.connect(dbConfig);

        const result = await pool
            .request()
            .input("username", sql.NVarChar, username)
            .input("password", sql.NVarChar, password)
            .query("SELECT Username FROM UserLogin WHERE Username = @username AND Password = @password");

        if (result.recordset.length === 0) {
            return res.status(401).json({ success: false, message: "Invalid username or password." });
        }

        res.json({ success: true, message: "Login successful!" });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ success: false, message: "Database error" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
