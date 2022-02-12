const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const program = new Command();

program
  .option("-a, --action <type>", "choose action (list, get, add, remove)")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);

      break;

    case "get":
      const contact = await getContactById(id);

      if (!contact) {
        console.log(`Not be contact with ID - ${id}`);
        return;
      } else {
        console.log(contact);
      }

      break;

    case "add":
      const newContact = await addContact(name, phone, email);
      console.log(newContact);
      break;

    case "remove":
      const deletedContact = await removeContact(id);

      if (!deletedContact) {
        console.log(`Not be contact with ID - ${id}`);
        return;
      } else {
        console.log(deletedContact);
      }

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
