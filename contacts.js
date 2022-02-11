const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const readFile = async (path) => {
  const data = await fs.readFile(path, "utf-8");
  const result = JSON.parse(data);
  return result;
};

async function listContacts() {
  return await readFile(contactsPath);
}

async function getContactById(contactId) {
  const contacts = await readFile(contactsPath);
  const needContact = contacts.find((contact) => contact.id === contactId);
  return needContact;
}

async function removeContact(contactId) {
  const contacts = await readFile(contactsPath);
  const indexDeleteContact = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (indexDeleteContact === -1) {
    return null;
  }

  const [deletedContact] = contacts.splice(indexDeleteContact, 1);

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact;
}

async function addContact(name, email, phone) {
  const contacts = await readFile(contactsPath);

  const newContact = { id: randomUUID(), name, email, phone };
  contacts.push(newContact);

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
