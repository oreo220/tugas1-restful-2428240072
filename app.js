const express = require('express');

const app = express();

app.use(express.json());

// Data ruang kelas
let classrooms = [
    {
        id: 1,
        kodeRuang: "A-301",
        gedung: "A",
        lantai: 3,
        kapasitas: 40,
        adaProyektor: true
    },
    {
        id: 2,
        kodeRuang: "A-406",
        gedung: "A",
        lantai: 4,
        kapasitas: 40,
        adaProyektor: true
    },
    {
        id: 3,
        kodeRuang: "B-609",
        gedung: "B",
        lantai: 6,
        kapasitas: 80,
        adaProyektor: false
    }
];

let nextId = 4;

// GET /
app.get('/', (req, res) => {
    res.status(200).json({
        nama: "Sunita Aqila",
        nim: "2428240072",
        topik: "16 - Kampus (Ruang Kelas)",
        endpoints: [
            "GET /classrooms",
            "GET /classrooms?gedung=A",
            "GET /classrooms/:id",
            "POST /classrooms",
            "PUT /classrooms/:id",
            "DELETE /classrooms/:id"
        ]
    });
});

// GET /classrooms
// GET /classrooms?gedung=A
app.get('/classrooms', (req, res) => {
    const gedung = req.query.gedung;

    if (gedung) {
        const hasil = classrooms.filter(
            (classroom) => classroom.gedung === gedung
        );

        return res.status(200).json(hasil);
    }

    res.status(200).json(classrooms);
});

// GET /classrooms/:id
app.get('/classrooms/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const classroom = classrooms.find(
        (classroom) => classroom.id === id
    );

    if (!classroom) {
        return res.status(404).json({
            status: "error",
            message: `Data dengan id ${id} tidak ditemukan`,
            data: null
        });
    }

    res.status(200).json(classroom);
});

// POST /classrooms
// Body:
// {
//     "kodeRuang": "A-301",
//     "gedung": "A",
//     "lantai": 3,
//     "kapasitas": 40,
//     "adaProyektor": true
// }
app.post('/classrooms', (req, res) => {
    const {
        kodeRuang,
        gedung,
        lantai,
        kapasitas,
        adaProyektor
    } = req.body;

    if (!kodeRuang || !gedung || kapasitas === undefined) {
        return res.status(400).json({
            status: "error",
            message: "kodeRuang, gedung, dan kapasitas wajib diisi",
            data: null
        });
    }

    const classroomBaru = {
        id: nextId++,
        kodeRuang: kodeRuang,
        gedung: gedung,
        lantai: lantai,
        kapasitas: kapasitas,
        adaProyektor: adaProyektor
    };

    classrooms.push(classroomBaru);

    res.status(201).json({
        status: "success",
        message: "Data ruang kelas berhasil ditambahkan",
        data: classroomBaru
    });
});

// PUT /classrooms/:id
// Body:
// {
//     "kodeRuang": "A-301",
//     "gedung": "A",
//     "lantai": 3,
//     "kapasitas": 40,
//     "adaProyektor": true
// }
app.put('/classrooms/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = classrooms.findIndex(
        (classroom) => classroom.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            status: "error",
            message: `Data dengan id ${id} tidak ditemukan`,
            data: null
        });
    }

    const {
        kodeRuang,
        gedung,
        lantai,
        kapasitas,
        adaProyektor
    } = req.body;

    if (!kodeRuang || !gedung || kapasitas === undefined) {
        return res.status(400).json({
            status: "error",
            message: "kodeRuang, gedung, dan kapasitas wajib diisi",
            data: null
        });
    }

    const classroomDiubah = {
        id: id,
        kodeRuang: kodeRuang,
        gedung: gedung,
        lantai: lantai,
        kapasitas: kapasitas,
        adaProyektor: adaProyektor
    };

    classrooms[index] = classroomDiubah;

    res.status(200).json({
        status: "success",
        message: "Data ruang kelas berhasil diubah",
        data: classroomDiubah
    });
});

// DELETE /classrooms/:id
app.delete('/classrooms/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = classrooms.findIndex(
        (classroom) => classroom.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            status: "error",
            message: `Data dengan id ${id} tidak ditemukan`,
            data: null
        });
    }

    classrooms.splice(index, 1);

    res.status(200).json({
        status: "success",
        message: `Data ruang kelas dengan id ${id} berhasil dihapus`,
        data: null
    });
});

// Endpoint tidak ditemukan
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Endpoint tidak ditemukan",
        data: null
    });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server berjalan di http://localhost:${PORT}`);
    });
}

module.exports = app;