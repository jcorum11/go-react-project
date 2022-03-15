import express from 'express';
import * as mysql from 'mysql2/promise';
import * as path from 'path';
import multer from 'multer';
import cors from 'cors';
const upload = multer({ dest: 'uploads' });
const app = express();
const port = 3000; // default port to listen

app.use(cors());

async function getConnection () {
  return await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'user',
    password: 'password',
    database: 'applicant'
  });
}

// define a route handler for the default home page
app.get('/', (req, res) => {
  res.send({message: 'Hello world!'});
});

app.get('/videos', async (req, res) => {
  const connection = await getConnection();

  const [rows, fields] = await connection.execute('SELECT * FROM videos');

  res.send(rows);
});

app.get('/videos/:id', async (req, res) => {
  const connection = await getConnection();

  const [rows, fields] = await connection.execute('SELECT * FROM videos WHERE id = ?', [req.params.id]);

  res.sendFile((rows as any)[0].path);
});

app.post('/videos', upload.single('video'), async (req, res, next) => {
  const connection = await getConnection();

  const fullPath = path.resolve(__dirname, req.file!.path);
  const [response] = await connection.execute('INSERT INTO videos (path) VALUES (?)', [fullPath]);
  const [row] = await connection.execute('SELECT * FROM videos WHERE id = ?', [(response as any).insertId]);

  res.send(row);
})

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
