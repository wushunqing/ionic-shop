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

  fixContent;
  scrollContent;
  header;
  headerOpacity = 0;
  promoHour: any;
  promoMin: any;
  promoSec: any;
  promoTime:any = 47*3500000+50000;
  promoList=[1,2,3,4,5,6,7];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    setInterval(()=>{
      this.promoTime-= 1000;
      if(this.promoTime<0){
        this.promoTime = 48*3600000;
      }
      this.formatTime(this.promoTime);
    },1000);
  }

  doPull(refresher) {
    console.log(refresher.state);
    

  }
  doRefresh(refresher) {
    this.fixContent.style.top = "0";
    this.header.style.display = "none";
    setTimeout(() => {
      this.header.style.display = "block";
      refresher.complete();
    }, 2000)

  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.fixContent = document.querySelector("page-home ion-refresher");
    this.header = document.querySelector("page-home ion-header");
    this.scrollContent = document.querySelector("page-home .scroll-content");
    this.scrollContent.addEventListener("scroll", (e) => {
      this.headerOpacity = this.scrollContent.scrollTop / 90;
      if (this.headerOpacity > 1) {
        this.headerOpacity = 1;
      }
    })

  }


  formatTime(value) {
   
    var hour = Math.floor(value / 3600000);
    var minute = Math.floor((value % 3600000) / 60000);
    var second = Math.floor((value % 3600000 % 60000) / 1000);;
    var h = hour > 9 ? hour : "0" + hour;
    var m = minute > 9 ? minute : "0" + minute;
    var s = second > 9 ? second : "0" + second;
    this.promoHour = h;
    this.promoMin = m;
    this.promoSec= s;

  }



}