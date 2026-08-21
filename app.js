const express = require("express");
const db = require("./config/db");

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const wantsJson = (req) => (req.get("Accept") || "").includes("application/json");

app.get('/', (req, res) => {
    db.query("SELECT * FROM tasks ORDER BY id DESC", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Gagal mengambil data tugas");
        }
        res.render("index", { tasks: results });
    });
});

app.get('/api/tasks', (req, res) => {
    db.query("SELECT * FROM tasks ORDER BY id DESC", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false });
        }
        res.json(results);
    });
});

app.post('/tasks', (req, res) => {
    const title = req.body.title;
    if (!title || !title.trim()) {
        return wantsJson(req) ? res.status(400).json({ success: false }) : res.redirect('/');
    }

    db.query("INSERT INTO tasks (title) VALUES (?)", [title.trim()], (err, result) => {
        if (err) {
            console.error(err);
            return wantsJson(req)
                ? res.status(500).json({ success: false })
                : res.status(500).send("Gagal menambahkan tugas");
        }
        const task = { id: result.insertId, title: title.trim(), is_done: 0 };
        return wantsJson(req)
            ? res.status(201).json({ success: true, task })
            : res.redirect('/');
    });
});

app.post('/tasks/:id/toggle', (req, res) => {
    db.query("UPDATE tasks SET is_done = NOT is_done WHERE id = ?", [req.params.id], (err) => {
        if (err) {
            console.error(err);
            return wantsJson(req)
                ? res.status(500).json({ success: false })
                : res.status(500).send("Gagal memperbarui tugas");
        }
        return wantsJson(req) ? res.json({ success: true }) : res.redirect('/');
    });
});

app.post('/tasks/:id/delete', (req, res) => {
    db.query("DELETE FROM tasks WHERE id = ?", [req.params.id], (err) => {
        if (err) {
            console.error(err);
            return wantsJson(req)
                ? res.status(500).json({ success: false })
                : res.status(500).send("Gagal menghapus tugas");
        }
        return wantsJson(req) ? res.json({ success: true }) : res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log("Server berjalan di http://localhost:" + PORT);
})
