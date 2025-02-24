const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3002;

app.use(cors());

app.get("/audio", (req, res) => {
    const filePath = path.join(__dirname, "test.mp3");
    
    console.log(filePath)
    // Check if file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
    }

    const stat = fs.statSync(filePath);
    console.log(stat)
    res.writeHead(200, {
        "Content-Type": "audio/mpeg",
        "Content-Length": stat.size,
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
