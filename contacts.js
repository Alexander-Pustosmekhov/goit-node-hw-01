const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    console.table(contacts);
    return contacts;
  } catch (error) {
    console.log("Error", error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contactById = contacts.find((e) => e.id === contactId.toString());
    console.log(contactById);
    return contactById;
  } catch (error) {
    console.log("Error", error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContacts = contacts.filter((e) => e.id !== contactId.toString());
    console.table(newContacts);
    return newContacts;
  } catch (error) {
    console.log("Error", error);
  }
}

async function addContact(name, email, phone) {
  if (!name || !email || !phone)
    throw new Error("Please enter your name, email and phone number");
  const newContact = { id: shortid.generate(), name, email, phone };
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  if (contacts.find((e) => e.email === newContact.email)) {
    console.log("Contact with this email already exists");
    return;
  }
  const newListContacts = JSON.stringify([...contacts, newContact]);
  const addContact = await fs.writeFile(contactsPath, newListContacts, "utf-8");
  const updatedListContacts = listContacts();
  console.table(updatedListContacts);
}

module.exports = { listContacts, getContactById, removeContact, addContact };
