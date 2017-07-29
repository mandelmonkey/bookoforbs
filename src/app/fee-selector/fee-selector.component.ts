import { Component, OnInit } from '@angular/core';
import {HTTPService} from "../services/http.service";
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-fee-selector',
  templateUrl: './fee-selector.component.html',
  styleUrls: ['./fee-selector.component.css']
})
export class FeeSelectorComponent implements OnInit {
rotated = false;
  public fees:any;
  showDropdown:boolean;
  constructor(public dataService:DataService,private httpService:HTTPService) { }

  ngOnInit() {
  	this.showDropdown = false;
  }



  getFeeTitle(){

 if(this.dataService.maincontroller.currentFee == "fastestFee"){

      return "fee: high";
    }
    else if(this.dataService.maincontroller.currentFee == "lowFee"){

      return "fee: low";
    }
    else if(this.dataService.maincontroller.currentFee == "hourFee"){

      return "fee: mid";
    }
    else{

      return  this.dataService.maincontroller.customFee+" btc";
    }
 

    
  }

  openFeeList(){
    
      console.log("opening fees");
      if(this.showDropdown == false){
      	this.showDropdown = true;
      }else{
      	this.showDropdown = false;
      }
   // document.getElementById("myDropdownFee").classList.toggle("show");

    var div =   document.getElementById("smallarrowFee");


     var deg = this.rotated ? 0 : -90;

    div.style.webkitTransform = 'rotate('+deg+'deg)';  
    div.style.transform       = 'rotate('+deg+'deg)'; 
    div.style.webkitTransition=" all 0.1s ease-in-out"; 
     div.style.transition=" all 0.1s ease-in-out";
    this.rotated = !this.rotated;
 
  }

  getTitleForFee(index:number){

    if(index == 0){

      return "High";
    }
    else if(index == 1){

      return "High";
    }
    else if(index == 2){

     return "Mid";
    }
    else if(index == 3){

        return "Low";
    }
      

  }
  setFee(index:number){
    if(index == 0){
        this.dataService.maincontroller.currentFee = "fastestFee";
    }
    else if(index == 1){
        this.dataService.maincontroller.currentFee = "halfHourFee";
    }
     else if(index == 2){
        this.dataService.maincontroller.currentFee = "hourFee";
    }
     else if(index == 3){
        this.dataService.maincontroller.currentFee = "lowFee";
    }
     else if(index == 4){

       if(parseFloat(this.dataService.maincontroller.customFee) < 0){
         this.dataService.maincontroller.showMessage("this fee is too low! please enter a fee greater than 0");
         this.dataService.maincontroller.customFee = "";
       }
       else if(parseFloat(this.dataService.maincontroller.customFee) > 0.01){
         this.dataService.maincontroller.showMessage("this fee is too high! please enter a fee less than 0.01");
         this.dataService.maincontroller.customFee = "";
       }
       else{
        this.dataService.maincontroller.currentFee = "custom";
      }



    }

    this.openFeeList();

  }

}
