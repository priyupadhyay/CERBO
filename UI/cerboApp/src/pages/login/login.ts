import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  // Our translated text strings
  //private loginErrorString: string;

  constructor(public navCtrl: NavController) {}
  

  // Attempt to login in through our User service
  doLogin() {
   
  }
}
