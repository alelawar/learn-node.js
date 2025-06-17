const fs = require("node:fs");

const dir = "./data";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const fileDir = "./data/kontaks.json";
if (!fs.existsSync(fileDir)) {
  fs.writeFileSync(fileDir, "[]", "utf-8");
}

const loadContact = () => {
  const file = fs.readFileSync("data/kontaks.json", "utf-8");
  const datas = JSON.parse(file);
  return datas;
};

// menimpa file contacts.json dengan data yg dikirim
const saveContacts = (contacts) => {
  fs.writeFileSync("data/kontaks.json", JSON.stringify(contacts));
};

// tambahin datanya ke kontaks.json tapi bentuk objek lagi
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};

// cek nama dupliklat

const cekDupliklatNama = (nama) => {
  const data = loadContact();

  return data.find((contact) => contact.nama == nama);
};

// Cari nama kontak
const findContact = (nama) => {
  const data = loadContact();
  const contact = data.find((contact) => contact.nama === nama);
  return contact;
};

const deleteContact = (nama) => {
  const data = loadContact();

  const filterContact = data.filter((contact) => contact.nama != nama);

  saveContacts(filterContact);
};

const updateContact = (contactBaru) => {
  const data = loadContact();

  const filterContact = data.filter(
    (contact) => contact.nama != contactBaru.oldNama
  );

  //   hapus dulu key oldNama
  delete contactBaru.oldNama;

  filterContact.push(contactBaru)
  saveContacts(filterContact)
};

module.exports = {
  loadContact,
  findContact,
  addContact,
  cekDupliklatNama,
  deleteContact,
  updateContact,
};
