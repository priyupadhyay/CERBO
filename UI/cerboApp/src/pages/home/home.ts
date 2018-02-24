import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
	buttonNamedColor: string = 'primary';
	buttonText: string = "Start Meeting";



  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  toggleNamedColor(): void {
      if(this.buttonNamedColor === 'primary') { 
        this.buttonNamedColor = 'danger';
        this.buttonText = "End Meeting";
      } else {
        this.buttonNamedColor = 'primary';
        this.buttonText = "Start Meeting";
      }
    } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  startListening(){
	this.toggleNamedColor();
  }

}
