const express = require("express");
const iconv = require("iconv-lite");

const app = express();
app.use(express.json());

app.get("/convert", (req, res) => {
    if (!req.query.text) {
        return res.status(400).send("Ошибка: текст не передан");
    }

    // Декодируем Windows-1251 → UTF-8
    let buffer = Buffer.from(req.query.text, "binary"); 
    let decodedText = iconv.decode(buffer, "win1251");

    // Отправляем в RawBT
    let rawbtUrl = `rawbt:${decodedText}`;
    res.redirect(rawbtUrl);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
