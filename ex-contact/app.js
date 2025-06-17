const express = require("express");
const app = express();
const xLayout = require("express-ejs-layouts");
const {
  loadContact,
  findContact,
  addContact,
  cekDupliklatNama,
  deleteContact,
  updateContact,
} = require("./utils/contacts");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const flash = require("connect-flash");
const port = 3000;
// gunakan ejs

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

// Third party middleware
app.set("view engine", "ejs");
app.use(xLayout);

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

app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.render("kntk", {
    title: "Contact Page",
    layout: "layouts/main",
    contacts,
    msg: req.flash("msg"),
  });
});

app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const nama = cekDupliklatNama(value);
      if (nama) {
        throw new Error("Nama already in use");
      }
      return true;
    }),
    check("email", "Email hrs bnr").isEmail(),
    check("no", "nohp hrs palid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("add", {
        title: "Tambah kontak",
        layout: "layouts/main",
        errors: errors.array(),
      });
    } else {
      addContact(req.body); // Simpan kontak ke file/databas
      req.flash("msg", "Data kontak brhsil ditambah");
      res.redirect("/contact"); // Redirect setelah berhasil
    }
  }
);

app.get("/contact/add", (req, res) => {
  res.render("add", {
    title: "Tambah kontak",
    layout: "layouts/main",
  });
});

app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  res.render("edit", {
    title: "Edit kontak",
    layout: "layouts/main",
    contact,
  });
});

app.post(
  "/contact/edit",
  [
    body("nama").custom((value, { req }) => {
      const nama = cekDupliklatNama(value);
      if (value != req.body.oldNama && nama) {
        throw new Error("Nama already in use");
      }
      return true;
    }),
    check("email", "Email hrs bnr").isEmail(),
    check("no", "nohp hrs palid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
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
      updateContact(req.body); // Simpan kontak ke file/databas
      req.flash("msg", "Data kontak brhsil diubah");
      res.redirect("/contact"); // Redirect setelah berhasil
    }
  }
);

app.get("/contact/delete/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  if (!contact) {
    res.status(404);
    res.send("gada");
  } else {
    deleteContact(req.params.nama);
    req.flash("msg", "Data kontak brhsil diapus");
  }

  res.redirect("/contact");
});

app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("dtl", {
    title: "Contact Page",
    layout: "layouts/main",
    contact,
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1> 404 </h1>");
});

app.listen(port, () => {
  console.log(`App listening in port http://localhost:${port}`);
});
