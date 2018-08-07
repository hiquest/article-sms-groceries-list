import { Component } from "@angular/core"
import { NavController, Platform } from "ionic-angular"
import { AndroidPermissions } from "@ionic-native/android-permissions"
import { ListPage } from "../list/list"
import { Storage } from "@ionic/storage"

import { GLIST } from "../../app/types"

declare var SMS: any

@Component({
  selector: "page-select",
  templateUrl: "select.html"
})
export class SelectPage {
  messages: Array<{ address: string; body: string }>

  constructor(
    public navCtrl: NavController,
    public androidPermissions: AndroidPermissions,
    public platform: Platform,
    private storage: Storage,
  ) {
    this.messages = []
  }

  select(m) {
    const id = m.date + ""
    const list: GLIST = {
      id,
      created: formatDate(new Date()),
      items: m.body.split(",").map(s => {
        return {
          title: s.trim(),
          done: false,
        }
      })
    }
    this.storage.set(id, JSON.stringify(list))
    this.navCtrl.push(ListPage, { id })
  }

  loadMessages() {
    this.platform.ready().then(readySource => {
      SMS.listSMS(
        { box: "inbox", indexFrom: 0, maxCount: 50 },
        messages => {
          console.log("Sms", messages)
          this.messages = messages
        },
        err => console.log("error listing smses: " + err)
      )
    })
  }

  ionViewWillEnter() {
    const READ_SMS = this.androidPermissions.PERMISSION.READ_SMS
    this.androidPermissions.checkPermission(READ_SMS).then(
      success => {
        console.log("Permission granted")
        this.loadMessages()
      },
      err => this.androidPermissions.requestPermission(READ_SMS)
    )

    this.androidPermissions.requestPermissions([READ_SMS])
  }
}

function formatDate(date) {
  var monthNames = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ]

  var day = date.getDate();
  var monthIndex = date.getMonth();

  return day + ' ' + monthNames[monthIndex];
}
