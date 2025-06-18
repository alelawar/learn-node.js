const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const session = require("express-session");
const flash = require("connect-flash");
const { body, validationResult, check } = require('express-validator')
const methodOverride = require('method-override')
const mongoose = require('mongoose');

require('./utils/db')
const Contact = require('./model/Contact')

const app = express()
const port = 3000

// setup override
app.use(methodOverride('_method'))

// setup ejs
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// builtin static
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.get("/", (req, res) => {
  // res.send('hello world')
  // res.sendFile('./index.html', { root: __dirname })
  const mahasiswa = [
    {
      nama: "ale",
      nim: 22111,
    },
    {
      nama: "pry",
      nim: 22113,
    },
    {
      nama: "dlan",
      nim: 20922,
    },
  ];
  res.render("index", {
    nama: "ale",
    title: "Home page",
    mahasiswa,
    layout: "layouts/main",
  });
});

app.get("/about", (req, res) => {
  res.render("abt", { title: "About Page", layout: "layouts/main" });
});

app.get("/contact", async (req, res) => {
  // Contact.find().then((contact) => {
  //     res.send(contact)
  // })

  const contacts = await Contact.find();
  res.render("kntk", {
    title: "Contact Page",
    layout: "layouts/main",
    contacts,
    msg: req.flash("msg"),
  });
});

app.get("/contact/add", (req, res) => {
  res.render("add", {
    title: "Tambah kontak",
    layout: "layouts/main",
  });
});

app.post(
  "/contact",

  [
    body("nama").custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value })
      if (duplikat) {
        throw new Error("Nama already in use");
      }
      return true;
    }),

    check("email", "Email hrs bnr").isEmail(),
    check("nohp", "nohp hrs palid").isMobilePhone("id-ID"),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("add", {
        title: "Tambah kontak",
        layout: "layouts/main",
        errors: errors.array(),
      });
    } else {
      await Contact.insertMany([req.body]);  // Bungkus dalam array
      req.flash("msg", "Data kontak berhasil ditambahkan");
      res.redirect("/contact");

    }
  }
);

app.get("/contact/edit/:nama", async (req, res) => {
  const contact = await Contact.findOne({nama: req.params.nama});

  res.render("edit", {
    title: "Edit kontak",
    layout: "layouts/main",
    contact,
  });
});

app.put(
  "/contact",
  [
    body("nama").custom( async (value, { req }) => {
      const nama = await Contact.findOne({nama: value});
      if (value != req.body.oldNama && nama) {
        throw new Error("Nama already in use");
      }
      return true;
    }),
    check("email", "Email hrs bnr").isEmail(),
    check("nohp", "nohp hrs palid").isMobilePhone("id-ID"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit", {
        title: "Tambah kontak",
        layout: "layouts/main",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      // res.send(req.body);
      await Contact.updateOne({
        nama: req.body.oldNama
      },
      {
        $set: {
          nama: req.body.nama,
          email: req.body.email,
          nohp: req.body.nohp
        }
      }
      ) // Simpan kontak ke file/databas
      req.flash("msg", "Data kontak brhsil diubah");
      res.redirect("/contact"); // Redirect setelah berhasil
    }
  }
);

// app.get("/contact/delete/:nama", async (req, res) => {
//   const contact = await Contact.findOne({nama: req.params.nama}) ;

//   if (!contact) {
//     res.status(404);
//     res.send("gada");
//   } else {
//     await Contact.deleteOne({nama: req.params.nama});
//     req.flash("msg", "Data kontak brhsil diapus");
//   }

//   res.redirect("/contact");
// });

app.delete('/contact', async (req, res) => {
  // res.send(req.body)

  await Contact.deleteOne({ nama: req.body.nama });
  req.flash("msg", "Data kontak brhsil diapus");
  res.redirect("/contact");

})

app.get("/contact/:nama", async (req, res) => {
  //   const contact = findContact(req.params.nama);
  const contact = await Contact.findOne({
    nama: req.params.nama
  })

  res.render("dtl", {
    title: "Contact Page",
    layout: "layouts/main",
    contact,
  });
});


app.listen(port, () => {
  console.log(`Mongo Contact App | Listening at http://localhost:${port}`);
})  