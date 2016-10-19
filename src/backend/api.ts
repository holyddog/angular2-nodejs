// import { fakeDataBase } from './db';

// fakeDataBase.get()
//   .then(data => {
//     return data;
//   })
//   .then(data => res.json(data));

export class MammalApi {
  static list(req, res) {
    return req.db.collection('mammals').find({}).toArray().then(
      data => res.json(data)
    );
  }
  static get(req, res) {
    var id = +req.params.id;
    return req.db.collection('mammals').findOne({ id: id }).then(
      data => res.json(data)
    );
  }
}