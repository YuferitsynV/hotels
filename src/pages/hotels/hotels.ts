import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Hotel } from '../../app/interface/hotel';
import { SelectsSort } from '../../app/interface/selectsSort';
import { HotelPage } from '../hotel/hotel';

@Component({
  selector: 'page-hotels',
  templateUrl: 'hotels.html'
})
export class HotelsPage {
  hotels: Array<Hotel>;
  filterHotels: Array<Hotel>;
  selectsSort: Array<SelectsSort>;
  searchIsShow: boolean;
  searchInput?: string;
  sortBy?: string;
  filters: {
    roomCostBefore: number,
    roomCostAfter: number,
    roomHasParking: boolean
  };
  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
    this.selectsSort = [
      {
        value: 'asc',
        prop: 'roomCost',
        name: 'Возрастанию цены'
      },
      {
        value: 'desc',
        prop: 'roomCost',
        name: 'Убыванию цены'
      },
      {
        value: 'asc',
        prop: 'title',
        name: 'Возрастанию названия'
      },
      {
        value: 'desc',
        prop: 'title',
        name: 'Убыванию названия'
      },
      {
        value: '',
        prop: '',
        name: 'Без сортировки'
      }
    ],
    this.searchIsShow = false,
    this.searchInput = '',
    this.sortBy = '',
    this.hotels = [
      {
        imageUrl: 'https://img.gazeta.ru/files3/837/4860837/hotel-pic668-668x444-62402.jpg',
        title: 'Будапешт',
        description: 'Московский отель "Будапешт"',
        roomCost: 5000,
        hasParking: true,
        address: 'Москва, ул. Петровские Линии, 2',
        phone: '8 (495) 729-35-01'
      },
      {
        imageUrl: 'https://cdn.ostrovok.ru/t/640x400/extranet/50/1c/501c6211826d67319ab8503185fa4032ef4eafb2.jpeg',
        title: 'Космос',
        description: 'Гостиница "Космос"',
        roomCost: 3000,
        hasParking: true,
        address: 'Москва, пр-т Мира, 150',
        phone: '8 (495) 234-12-06'
      },
      {
        imageUrl: 'https://cdn.ostrovok.ru/t/640x400/extranet/50/1c/501c6211826d67319ab8503185fa4032ef4eafb2.jpeg',
        title: 'Вселенная',
        description: 'Гостиница "Вселенная"',
        roomCost: 4000,
        hasParking: false,
        address: 'Москва, пр-т Ленина, 160',
        phone: '8 (495) 234-12-40'
      },
      {
        imageUrl: 'https://cdn.ostrovok.ru/t/640x400/extranet/50/1c/501c6211826d67319ab8503185fa4032ef4eafb2.jpeg',
        title: 'Спутник',
        description: 'Гостиница "Спутник"',
        roomCost: 2000,
        hasParking: false,
        address: 'Москва, пр-т Ленина, 160',
        phone: '8 (495) 234-12-40'
      }
    ],
    this.filterHotels = this.hotels,
    this.filters = {
      roomCostBefore: null,
      roomCostAfter: null,
      roomHasParking: false
    }
  }
  openFilterMenu(){
    this.menuCtrl.toggle('filter');
  }
  onInputSearch(value){
    this.filterHotel(value);
  }
  onCancelSearch(value){

  }
  goToHotelPage(hotel) {
    this.navCtrl.push(HotelPage, {
      data: hotel
    });
  }
  filterHotelClear(){
    this.filters = {
      roomCostBefore: null,
      roomCostAfter: null,
      roomHasParking: false
    };
    this.filterHotel()
  }
  sortHotel(select){
    this.filterHotels = this.filterHotels.sort(this.sortHotelBy(select.prop, select.value));
  }
  sortHotelBy(prop, sortBy){
    switch (prop) {
      case 'roomCost':
        return this.sortHotelByRoomCost(sortBy);
      case 'title':
        return this.sortHotelByTilte(sortBy);
      default:
        return (a,b) => 0;
    } 
  }
  sortHotelByRoomCost(sortBy){
    return (a,b) => {
      if(sortBy === 'asc'){
        return a.roomCost-b.roomCost;
      } else if(sortBy === 'desc'){
        return b.roomCost-a.roomCost;
      } else {
        return 0;
      }
    }
  }
  sortHotelByTilte(sortBy){
    return (a,b) => {
      //return a.title.localeCompare(b.title);
      let titleA = a.title.toLowerCase(), titleB = b.title.toLowerCase();
      if(sortBy === 'asc'){
        if (titleA < titleB){
          return -1;
        }
        if (titleA > titleB){
          return 1;
        } else {
          return 0; 
        }
      } else if(sortBy === 'desc'){
        if (titleB < titleA){
          return -1;
        }
        if (titleB > titleA){
          return 1;
        } else {
          return 0; 
        }
      } else {
        return 0;
      }
    }
  }
  filterHotel(search = ''){
    this.filterHotels = this.hotels.filter((item) => {
      if (search !== '') {
        if (item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
          return true;
        }
        return false;
      }
      if(this.filters.roomCostBefore !== null && this.filters.roomCostAfter !== null){
        if(item.roomCost < this.filters.roomCostBefore && item.roomCost > this.filters.roomCostAfter){
          return false;
        }
      }
      if(this.filters.roomCostBefore !== null){
        if(item.roomCost < this.filters.roomCostBefore){
          return false;
        }
      }
      if(this.filters.roomCostAfter !== null){
        if(item.roomCost > this.filters.roomCostAfter){
          return false;
        }
      }
      if(this.filters.roomHasParking){
        if(item.hasParking == false){
          return false;
        }
      } 
      return true;
    });
    this.menuCtrl.toggle('filter');
  }
}
