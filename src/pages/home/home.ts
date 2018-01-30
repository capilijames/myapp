import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';

import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import {ChatPage} from '../chat/chat';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  arrData=[]
  myInput
  username: string ='';

  constructor(public navCtrl: NavController,private fdb: AngularFireDatabase, private alertCtrl: AlertController ) {
        // this.fdb.list("/myItems/").snapshotChanges().map(actions => {
    //   return actions.map(action => ({key: action.key, ...action.payload.val() }));
    // }).subscribe(_data => {
    //   this.arrData=_data;
    this.fdb.list("/myItems/").valueChanges().subscribe(_data => {
      this.arrData=_data;
      console.log(this.arrData);
    });
  }

  btnAddItem(){
    this.fdb.list("/myItems/").push(this.myInput);
  }
  delete(i){
    this.fdb.list("/myItems/").remove(this.arrData[i]);  
  }

  alert(title: string,message: string) {
    let alertBox = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alertBox.present();
  }

  loginUser(){
    if(/^[a-zA-Z0-9]+$/.test(this.username)){
      this.navCtrl.push(ChatPage,{
        username: this.username
      });
    }else{
      this.alert('error','invalid username');
    }
  }
}
