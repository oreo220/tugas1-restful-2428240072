# Tugas 1 - RESTful API Murni dengan Express.js

## Identitas

Nama: Sunita Aqila  
NIM: 2428240072  
Topik: 16 - Kampus (Ruang Kelas)

## Deskripsi

Project ini merupakan RESTful API sederhana menggunakan Express.js
dengan data ruang kelas yang disimpan dalam array (in-memory).

## Cara Menjalankan

Install dependency:

npm install

Menjalankan server:

npm start

Untuk mode development:

npm run dev

Server dapat diakses melalui:

http://localhost:3000

## Endpoint

GET /
Menampilkan informasi API.

GET /classrooms
Menampilkan seluruh data ruang kelas.

GET /classrooms?gedung=Gedung A
Menampilkan data ruang kelas berdasarkan gedung.

GET /classrooms/:id
Menampilkan data ruang kelas berdasarkan ID.

POST /classrooms
Menambahkan data ruang kelas.

PUT /classrooms/:id
Memperbarui data ruang kelas berdasarkan ID.

DELETE /classrooms/:id
Menghapus data ruang kelas berdasarkan ID.

## Deployment

URL Vercel: https://tugas1-restful-2428240072.vercel.app/
URL Github: https://github.com/oreo220/tugas1-restful-2428240072