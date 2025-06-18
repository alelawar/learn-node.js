const { MongoClient, ObjectId } = require('mongodb')

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'wpu'

const client = new MongoClient(url)

async function main() {
    try {
        await client.connect()
        console.log("Koneksi berhasil");
        // Lanjutkan akses koleksi di sini, misal:
        // const mahasiswa = db.collection('mahasiswa');

        const db = client.db(dbName);
        const collections = db.collection('mahasiswa');

        // const result = await collections.insertOne({
        //     nama: "padlan",
        //     email: "padlan@gmail.com"
        // })

        // const result = await collections.insertMany([
        //     {
        //         nama: "daps",
        //         email: "daps@gmail.com"
        //     },
        //     {
        //         nama: "Syarla",
        //         email: "syarla@gmail.com"
        //     }
        // ])

        // console.log(`data berhasil ditambahkan ${result.insertedIds}`);




        // Menampilkan semua data yang ada di collection mahasiswa
        // const items = await collections.find().toArray();
        // console.log(items);


        // Menampilkan data sesuai kriteria yang ada di collection mahasiswa
        // const items = await collections.find({nama: "pry"}).toArray();
        // console.log(items);

        // Mengupdate data seusai id
        // const updatedData = await collections.updateOne({
        //     _id: new ObjectId('68520c13c8a040aa7c9182fe')
        // },
        //     {
        //         $set: {
        //             email: "dapar@gmail.com"
        //         }
        //     }
        // )

        // console.log(updatedData.modifiedCount);

        // const deletedData = await collections.deleteOne({
        //     _id: new ObjectId('68520c13c8a040aa7c9182fe')
        // },
        // )
        
        const deletedData = await collections.deleteMany({
            nama: "Syarla"
        })
        console.log(deletedData.deletedCount)

    } catch (err) {
        console.log('Koneksi gagal:', err);
    } finally {
        await client.close(); // Optional: kalau mau nutup koneksi setelah selesai
    }
}

main()