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
        imageUrl: 'https://artmetall.ua/wp-content/uploads/2015/04/04-15-13.jpg',
        title: 'Вселенная',
        description: 'Гостиница "Вселенная"',
        roomCost: 4000,
        hasParking: false,
        address: 'Москва, ул. Мира, 135',
        phone: '8 (495) 234-12-40'
      },
      {
        imageUrl: 'https://s.101hotelscdn.ru/uploads/image/hotel_image/4119/197294_mobile.jpg',
        title: 'Спутник',
        description: 'Гостиница "Спутник"',
        roomCost: 2000,
        hasParking: false,
        address: 'Москва, ул. Ленинградская, 98',
        phone: '8 (495) 234-12-40'
      },
      {
        imageUrl: 'https://kolomna-hotel.ru/upload/iblock/0b9/0b988813316d6f796614b4e15f06a7e8.jpg',
        title: 'Астероид',
        description: 'Гостиница "Астероид"',
        roomCost: 2400,
        hasParking: false,
        address: 'Москва, пр-т Ленина, 160',
        phone: '8 (495) 234-12-40'
      },
      {
        imageUrl: 'https://edem-v-gosti.ru/upload/resize_cache/iblock/793/700_530_1/kometa_moskva-_1_.jpg',
        title: 'Комента',
        description: 'Гостиница "Комета"',
        roomCost: 2300,
        hasParking: true,
        address: 'Москва, пр-т Ленина, 160',
        phone: '8 (495) 234-12-40'
      },
      {
        imageUrl: 'https://s0.rbk.ru/v6_top_pics/media/img/4/35/755016838560354.jpg',
        title: 'Вологда',
        description: 'Гостиница "Вологда"',
        roomCost: 3303,
        hasParking: true,
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
        return this.sortHotelByTitle(sortBy);
      default:
        return (a,b) => 0;
    } 
  }
  sortHotelByRoomCost(sortBy){
    return (a,b) => {
      switch (sortBy) {
        case 'asc':
          return a.roomCost-b.roomCost;
        case 'desc':
          return b.roomCost-a.roomCost;
        default:
          return 0;
      }
    }
  }
  sortHotelByTitle(sortBy){
    return (a,b) => {
      //return a.title.localeCompare(b.title);
      let titleA = a.title.toLowerCase(), titleB = b.title.toLowerCase();
      switch (sortBy) {
        case 'asc':
          if (titleA < titleB){
            return -1;
          } else if (titleA > titleB){
            return 1;
          } else {
            return 0; 
          } 
        case 'desc':
          if (titleB < titleA){
            return -1;
          } else if (titleB > titleA){
            return 1;
          } else {
            return 0; 
          }
        default:
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
    if(this.menuCtrl.isOpen('filter')){
      this.menuCtrl.close('filter');
    }
  }
}
