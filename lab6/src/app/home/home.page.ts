import {Component, Query, ViewChild} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {DataService} from "./services/data.service";
import {Quote} from "../models/Quote";
import {IonModal} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  quotes!: Quote[];
  countOfFavoriteQuotes: number = 0;
  favouriteQuotes: Quote[] = []

  @ViewChild(IonModal) modal: IonModal;

  name: string;

  isModalOpen = false;
  isModalFavouriteOpen = false;


  constructor(private storage: Storage,
              private dataService: DataService) {
  }

  async ngOnInit() {
    await this.storage.create();
    await this.storage.clear()
    this.dataService.getData().subscribe((data) => {
      this.quotes = data
    })


  }

  setOpen(isOpen: boolean, data: any) {
    this.isModalOpen = isOpen;
    this.modal.componentProps = data;
    //console.log(this.modal.componentProps)
  }

  setClose(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async addToFavourites(componentProps: object) {
    let fav_quotes:Quote[]=[];
    await this.storage.set(`${this.countOfFavoriteQuotes}`, componentProps).then(() => this.countOfFavoriteQuotes = this.countOfFavoriteQuotes + 1);
    await this.storage.forEach((value) => {
      fav_quotes.push(value)
    })
    this.favouriteQuotes = fav_quotes;
    this.isModalOpen = false;

  }

  setOpenFav(isOpen: boolean, data: any) {
    this.isModalFavouriteOpen = isOpen;
    this.modal.componentProps = data;
  }

  setCloseFav(isOpen: boolean) {
    this.isModalFavouriteOpen = isOpen;
  }
}
