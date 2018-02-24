import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import { Calendar } from '@ionic-native/calendar';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Array<any>;
  test: string;

  constructor(public navCtrl: NavController, 
    public items: Items, 
    public modalCtrl: ModalController,
    private calendar: Calendar) {
    //this.currentItems = this.items.query();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    //this.calendar.createCalendar("cerbo");
    //this.calendar.createEvent("Something", "Pune", "Some random text", new Date(2018, 1, 5), new Date(2018, 1, 5));
    this.listSchedules();
  }

  async hasReadWritePermission(): Promise<void> {
    try {
      this.calendar.requestReadWritePermission();
    } catch (e) {
      console.log(e);
    }
  }
  
// List only events made from cerbo app
  listSchedules(){
    this.currentItems = [];
    this.calendar.listEventsInRange(new Date(2017, 1, 5), new Date(2018, 1, 5)).then((msg) => {
      msg.forEach(item => {
        this.currentItems.push(item);
      });
      this.test = JSON.stringify(this.currentItems);
    },
    (err) => {
      console.log(err);
    });
    
    //this.test = this.currentItems.length.toString();
  }
 
  /**
     * Navigate to the detail page for this item.
     */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
  openCal(str : string){
      this.calendar.openCalendar(new Date(str));
  }


  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  // addItem() {
  //   let addModal = this.modalCtrl.create('ItemCreatePage');
  //   addModal.onDidDismiss(item => {
  //     if (item) {
  //       this.items.add(item);
  //     }
  //   })
  //   addModal.present();
  // }

  // /**
  //  * Delete an item from the list of items.
  //  */
  // deleteItem(item) {
  //   this.items.delete(item);
  // }

  
}
