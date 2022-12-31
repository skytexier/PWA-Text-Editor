import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to database');
  //creating connection to DB
  const jateDb = await openDB('jate', 1)
  //creating transaction
  const tx = jateDb.transaction('jate', 'readwrite');
  // desired object store
  const store = tx.objectStore('jate');
  //request handling
  const request = store.put({id: 1, value: content})
  //result await
  const result = await request
  console.log(`Database updated with ${result.value}`)
  console.error('putDb not implemented');
}
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all content from database');
  //creating connection to database and version we want to use
  const jateDb = await openDB('jate', 1);
  //creating new transaction and specifying the database/data privileges
  const tx = jateDb.transaction('jate', 'readonly')
  //open desired object store
  const store = tx.objectStore('jate');
  //GetAll to get data
  const request = store.getAll();
  const result = await request;
  console.log('Get from database returned:', result.value)
  ? err : console.error('getDb not implemented')
  return result
 
};

initdb();
