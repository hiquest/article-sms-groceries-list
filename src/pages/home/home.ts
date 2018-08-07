import { Component } from "@angular/core"
import { NavController } from "ionic-angular"
import { Storage } from "@ionic/storage"

import { SelectPage } from "../select/select"
import { ListPage } from "../list/list"
import { GLIST } from "../../app/types"

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  lists: Array<GLIST>

  constructor(public navCtrl: NavController, private storage: Storage) {}

  selectSms() {
    this.navCtrl.push(SelectPage, {})
  }

  ionViewWillEnter() {
    const lists = []
    this.storage.forEach((list, id) => {
      lists.push(JSON.parse(list))
      console.log(this.lists)
    }).then(() => {
      this.lists = lists
    })
  }

  listTitle(list) {
    return list.items.map(x => x.title).join(", ")
  }

  go(id) {
    this.navCtrl.push(ListPage, {id})
  }
}
