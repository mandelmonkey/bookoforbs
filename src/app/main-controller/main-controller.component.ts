import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {HTTPService} from "../services/http.service";
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-main-controller',
  templateUrl: './main-controller.component.html',
  providers:[HTTPService],
  styleUrls: ['./main-controller.component.css']
})
export class MainControllerComponent implements OnInit {

  constructor(public dataService:DataService,private httpService:HTTPService,private ref: ChangeDetectorRef){}
public loading = true;
public orbData :any;
public userBalance :Array<any>;
  loadEnvironments(){
  
    

this.httpService.getEnvironments().subscribe(
     data => { 
      this.orbData = data;
      console.log( this.orbData);
      
      this.httpService.getBalance("1Nh4tPtQjHZSoYdToTF7T3xbaKrTNKM3wP").subscribe(
     data => { 
      this.userBalance = data;
      console.log(  this.userBalance);
      
      this.dataService.topbar.setEnvironments(this.orbData.Environments);
        
     },   
      error => {
       
console.log("error balance");
 this.loading = false;
      },
     () => {});


          
     },   
      error => {
       
console.log("error gamecenter");
 this.loading = false;
      },
     () => {});
}


 

  ngOnInit() {
    this.dataService.maincontroller = this;
    this.loadEnvironments();
  }



}
