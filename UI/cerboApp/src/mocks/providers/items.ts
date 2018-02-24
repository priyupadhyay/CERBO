import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "title": "Some topic",
    "about": "Some meaningful data extracted of this meeting.",
    "date": "24-07-2018 10:00 a.m",
    "image": "https://www.tutorialspoint.com/images/netmeeting.jpg"
  };


  constructor() {
    let items = [
      {
        "title": "Some topic",
        "about": "Some meaningful data extracted of this meeting.",
        "date": "24-07-2018 10:00 a.m",
        "image": "https://www.tutorialspoint.com/images/netmeeting.jpg"
      },
      {
        "title": "Some different topic",
        "about": "Some meaningful data extracted of this meeting.",
        "date": "24-07-2018 10:00 a.m",
        "image": "https://www.tutorialspoint.com/images/netmeeting.jpg"
      },
      {
        "title": "Some yet another topic",
        "about": "Some meaningful data extracted of this meeting.",
        "date": "24-07-2018 10:00 a.m",
        "image": "https://www.tutorialspoint.com/images/netmeeting.jpg"
      },
      {
        "title": "Some oldest topic",
        "about": "Some meaningful data extracted of this meeting.",
        "date": "24-07-2018 10:00 a.m",
        "image": "https://www.tutorialspoint.com/images/netmeeting.jpg"
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
