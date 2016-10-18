import { fakeDataBase } from './db';

export function serverApi(req, res) {
  fakeDataBase.get()
    .then(data => {
      return data;
    })
    .then(data => res.json(data));
}
