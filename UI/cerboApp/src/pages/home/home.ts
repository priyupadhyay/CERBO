import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

import {  NgZone } from '@angular/core';
import { Api } from '../../providers/api/api';
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
  apiResponse: any;



  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	private speech: SpeechRecognition,
    private zone: NgZone,
    private api: Api) {
  }

  toggleNamedColor(): void {
      if(this.buttonNamedColor === 'primary') { 
        this.buttonNamedColor = 'danger';
        this.buttonText = "End Meeting";
        this.headerText = "Ongoing Meeting";

        //after stop button is pressed.
        this.api.callSummerizer({bData: 'Let us meet tomorrow.'}).subscribe((data)=>{
        this.matches.push(this.apiResponse);


        });
      } else {
        this.buttonNamedColor = 'primary';
        this.buttonText = "Start Meeting";
        this.headerText = "Welcome to Cerbo";
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
        })
      }, error => console.error(error));

  }

  toggleListenMode():void {
    this.isListening = this.isListening ? false : true;
    console.log('listening mode is now : ' + this.isListening);
  }

}
