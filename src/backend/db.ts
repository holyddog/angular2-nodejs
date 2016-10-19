export const fakeDataBase = {
  get() {
    //return db.collection('mammals').find({}).toArray();
    let res = { data: 'This fake data came from the db on the server.' };
    return Promise.resolve(res);
  }
};
