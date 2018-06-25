import { observable } from 'mobx';
import { db } from './firebase';

class Twits {
  @observable twits = [];

  readOwnTwits(userId) {
    console.log('ambil data')
    db.ref(`user/${userId}`).on('value', (snapshot) => {
      if(snapshot.val()) {
        const rawPass = snapshot.val()
        let arr = []
        for (const key in rawPass) {
          if (rawPass.hasOwnProperty(key)) {
            const el = rawPass[key]
            const newPass = {...el, key: key}
            arr.push(newPass)
          }
        }
        this.twits = arr
      }
    })
  };

  addTwit(userId, content) {
    db.ref(`user/${userId}`).push(content)
  };

  resetTwits() {
    this.twits = []
  }

  removeTwit(userId, key) {
    db.ref(`user/${userId}`).child(key).remove()
    let newTwit = this.twits.filter(twit => twit.key !== key)
    this.twits = newTwit
  }
};

export default new Twits();