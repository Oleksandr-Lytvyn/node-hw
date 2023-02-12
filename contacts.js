const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  const list = await fs.readFile('./db/contacts.json', 'utf8');
  const listArray = JSON.parse(list);
  console.table(listArray);
}

function getContactById(contactId) {
  fs.readFile('./db/contacts.json', 'utf8')
    .then((data) => {
      console.log(typeof data);
      const dataArray = JSON.parse(data);
      const res = dataArray.find((option) => option.id === contactId);
      console.table(res);
    })
    .catch((error) => console.log(error));
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile('./db/contacts.json', 'utf8');
    const dataArray = JSON.parse(data);
    const res = dataArray.filter((cont) => cont.id !== contactId);
    await fs.writeFile('./db/contacts.json', JSON.stringify(res), 'utf8');
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile('./db/contacts.json');
    const dataArray = JSON.parse(data);
    dataArray.push({
      id: '78',
      name,
      email,
      phone,
    });
    await fs.writeFile('./db/contacts.json', JSON.stringify(dataArray));
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
