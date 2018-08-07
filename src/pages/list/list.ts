import { Component } from "@angular/core"
import { NavController, NavParams } from "ionic-angular"
import { Storage } from "@ionic/storage"

import { GLIST } from "../../app/types"

@Component({
  selector: "page-list",
  templateUrl: "list.html"
})
export class ListPage {
  list: GLIST

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
  ) {
  }

  ionViewWillEnter() {
    const id = this.navParams.get("id")
    this.storage.get(id).then(list => {
      if (list) {
        this.list = JSON.parse(list)
      } else {
        console.log("NO LIST?!?!")
        // wtf?
      }
    })
  }

  doneCount() {
    return this.doneItems().length
  }

  allCount() {
    if (!this.list) return 0
    return this.list.items.length
  }

  toggle(item) {
    item.done = !item.done
    this.save()
  }

  toBeDoneItems() {
    if (!this.list) return []
    return this.list.items.filter(x => !x.done)
  }

  doneItems() {
    if (!this.list) return []
    return this.list.items.filter(x => x.done)
  }

  save() {
    this.storage.set(this.list.id, JSON.stringify(this.list))
  }
}
