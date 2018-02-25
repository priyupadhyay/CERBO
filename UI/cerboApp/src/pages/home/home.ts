import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

import {  NgZone } from '@angular/core';
import { Api } from '../../providers/api/api';
import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

import { Calendar } from '@ionic-native/calendar';
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
	isListening: boolean = false;
  matches: Array<String>;
  apiResponse: Item;
  text: string = '';



  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	private speech: SpeechRecognition,
    private zone: NgZone,
    private api: Api,
    public items: Items,
    private calendar: Calendar,
    public loadingCtrl: LoadingController ) {
  }
  async hasReadWritePermission(): Promise<void> {
    try {
      this.calendar.requestReadWritePermission();
    } catch (e) {
      console.log(e);
    }
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

        //after stop button is pressed.
        this.api.callSummerizer({ bData: this.text }).subscribe((data) => {
          this.presentLoadingCustom();
        this.apiResponse = data;
        console.log(this.apiResponse);
        this.addItem(this.apiResponse);
        this.addEvents(this.apiResponse);
        
          // furthur storage and other business
        });
      }
    } 
 
  ionViewDidLoad() {
  	this.getPermission();
    //console.log('ionViewDidLoad HomePage');
  }
  // After ending meeting make a function to save texts and then make api request.
  startListening(){
	this.toggleNamedColor();
	this.listen();
  }


    async hasPermission():Promise<boolean> {
    try {
      const permission = await this.speech.hasPermission();
      console.log(permission);

      return permission;
    } catch(e) {
      console.log(e);
    }
  }

  async getPermission():Promise<void> {
    try {
      this.speech.requestPermission();
    } catch(e) {
      console.log(e);
    }
  }

  listen(): void {
    console.log('listen action triggered');
    if (this.isListening) {
      this.speech.stopListening();
      this.toggleListenMode();
      return;
    }

    this.toggleListenMode();
    let _this = this;

    this.speech.startListening()
      .subscribe(matches => {
        _this.zone.run(() => {
          _this.matches = matches;
          _this.text = matches[0];
        })
      }, error => console.error(error));

  }

  toggleListenMode():void {
    this.isListening = this.isListening ? false : true;
    console.log('listening mode is now : ' + this.isListening);
  }

  addItem(item) { this.items.add(item);}

  addEvents(item){
    item.response.events.forEach(element => {
      this.calendar.createEvent(element.title, element.location, element.message, new Date(element.startDate), new Date(element.endDate));
    });
    }


  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">
        <img src='assets/img/waiting.gif'>
        <h2>Analyzing Data</h2>
        </div>
      </div>`,
      duration: 5000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();
  }

}
