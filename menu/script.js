import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url'; // URL'den dosya yolunu elde etmek için

const app = express();
const port = 3000;

// Geçerli dizini elde etme
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors());


app.use(express.static(path.join(__dirname, 'public'))); 


const db = new sqlite3.Database('yemekler.db');

app.get('/yemekler', (req, res) => {
    const kategori = req.query.tiklanan; 

    db.all(`SELECT * FROM yemekler WHERE YemekKategorisi = ?`, [kategori], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows); 
    });
});


app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
