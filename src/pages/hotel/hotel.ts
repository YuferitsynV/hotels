import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Hotel } from '../../app/interface/hotel';


/**
 * Generated class for the HotelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hotel',
  templateUrl: 'hotel.html'
})
export class HotelPage {
  public hotel: Hotel;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.hotel = this.navParams.get('data');
  };

  ionViewDidLoad() {
    //console.log('ionViewDidLoad HotelPage');
  }

}
