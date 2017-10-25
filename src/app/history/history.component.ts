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
   scrollObservable;
  constructor(public dataService:DataService,private httpService:HTTPService) { }
 ngAfterViewInit() {
 	this.didInit=true;
    this.scrollView = document.getElementById("scrollView");
    this.scrollObservable =  Observable.fromEvent(this. scrollView,'scroll'); 

 
  

 }
  ngOnInit() {
  	var tmpthis = this;
  	if(this.dataService.maincontroller.currentAddress != "empty" && tmpthis.dataService.maincontroller.history.length == 0){
  		this.loading = true;
  	this.httpService.getHistory(this.dataService.maincontroller.currentAddress,"send").subscribe(
     data => { 
      tmpthis.dataService.maincontroller.history = data;
      console.log("hsitory"+ JSON.stringify(tmpthis.dataService.maincontroller.history ));
       tmpthis.loading = false;
      
      },   
      error => {
       
console.log("error history");
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
