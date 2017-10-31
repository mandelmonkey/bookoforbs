import { Component, OnInit,ViewChild, ElementRef,ChangeDetectorRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import {HTTPService} from "../services/http.service";
import { DataService } from '../services/data.service';
 
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
allOwnImage = this.dataService.getImage('leftOptionSeg');
  viewPortItems2:any;
loading = false;
 scrollView;
 didInit=false;
 mode="history";
  cardHeightInner = "100%";
   scrollObservable;
   orderSelectImage;
   currentRequest;
  constructor(public dataService:DataService,private httpService:HTTPService) { }
 ngAfterViewInit() {
 	this.didInit=true;
    this.scrollView = document.getElementById("scrollView");
    this.scrollObservable =  Observable.fromEvent(this. scrollView,'scroll'); 
 
 }


 selectOrders(){ 

  this.mode="order";
  this.allOwnImage = this.dataService.getImage('rightOptionSeg');
   if(this.dataService.maincontroller.orders.length == 0){
       this.selectOrdersAll();
    }

}

 selectOrdersAll(){ 
  this.mode="order";
  this.orderSelectImage = this.dataService.getImage('orderSelect1');
 
  this.getOrders("all");

}

 selectOrdersBought(){ 
  this.mode="order";
   this.orderSelectImage  = this.dataService.getImage('orderSelect2');
 
  this.getOrders("buy");

}

 selectOrdersSold(){ 
  this.mode="order";
   this.orderSelectImage = this.dataService.getImage('orderSelect3');
 
  this.getOrders("sell");

}
 selectOrdersOpen(){ 
  this.mode="order";
   this.orderSelectImage  = this.dataService.getImage('orderSelect4');
 
  this.getOrders("open");

}




 selectHistory(){

this.mode="history";
 this.allOwnImage = this.dataService.getImage('leftOptionSeg');



}

getOrders(type:string){

  if( this.currentRequest != null){
    this.currentRequest.unsubscribe();
  }
  this.dataService.maincontroller.orders=[];
  var tmpthis = this;
    if(this.dataService.maincontroller.currentAddress != "empty" && tmpthis.dataService.maincontroller.orders.length == 0){
      this.loading = true;
    this.currentRequest = this.httpService.getOrderHistory(this.dataService.maincontroller.currentAddress,type,this.dataService.maincontroller.currentCurrency).subscribe(
     data => { 
      tmpthis.dataService.maincontroller.orders= data;
      console.log("orders:"+ JSON.stringify(tmpthis.dataService.maincontroller.orders ));
       tmpthis.loading = false;
      
      },   
      error => {
       
console.log("error history");
 tmpthis.loading = false;
      },
     () => {});
}


}
  ngOnInit() {

    this.orderSelectImage = this.dataService.getImage('orderSelect1');
  	this.dataService.history = this;

  	var tmpthis = this;

  	if(this.dataService.maincontroller.currentAddress != "empty" && tmpthis.dataService.maincontroller.history.length == 0){

  	this.loading = true;
  	this.httpService.getHistory(this.dataService.maincontroller.currentAddress).subscribe(
    
     data => { 
      tmpthis.dataService.maincontroller.history = data;
      console.log("hsitory:"+ JSON.stringify(tmpthis.dataService.maincontroller.history ));
       tmpthis.loading = false;
      
      },   
      error => {
        console.log("error orders");
        tmpthis.loading = false;
     },
     () => {});

      }
  }



    getHistoryHeight(){
    if(this.scrollView == null){
      return "5px";
    }else{

   var bottombar = document.getElementById("bottomBarBottom");
 
      return (document.documentElement.clientHeight-this.scrollView.offsetTop-bottombar.clientHeight+5)+"px";
    }
   
  }

}
