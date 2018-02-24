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
	headerText: string = "Welcome to Cerbo";
	convertedText: string = "";



  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  toggleNamedColor(): void {
      if(this.buttonNamedColor === 'primary') { 
        this.buttonNamedColor = 'danger';
        this.buttonText = "End Meeting";
        this.headerText = "Ongoing Meeting";
      } else {
        this.buttonNamedColor = 'primary';
        this.buttonText = "Start Meeting";
        this.headerText = "Welcome to Cerbo";
      }
    } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  startListening(){
	this.toggleNamedColor();
	this.convertedText = "Something happened to me so i am going home."
  }

}
