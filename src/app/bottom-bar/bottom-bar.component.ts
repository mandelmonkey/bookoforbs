import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css']
})
export class BottomBarComponent implements OnInit {
 image1 = this.dataService.getImage('bottomBarBlack');// "../assets/images/bottomBarBlack.png";
 image2 = this.dataService.getImage('bottomBarClear');
 image3 = this.dataService.getImage('bottomBarClear');//"../assets/images/bottomBarClear.png";
 image4 = this.dataService.getImage('bottomBarClear');//"../assets/images/bottomBarClear.png";


  constructor(public dataService:DataService) { }

  ngOnInit() {
  }
  getBottom(){
    return (document.documentElement.clientHeight-((document.documentElement.clientHeight *0.09)/1))+"px";
  }
  select1(){

    if(this.dataService.maincontroller.loading){
      return;
    }
  		this.dataService.currentTab = 1;
  		this.image1 = this.dataService.getImage('bottomBarBlack');
  		this.image2 = this.dataService.getImage('bottomBarClear');
  		this.image3 = this.dataService.getImage('bottomBarClear');
  		this.image4 = this.dataService.getImage('bottomBarClear');
       this.dataService.maincontroller.showAccount = false;
      this.dataService.maincontroller.showCollection = true;
      this.dataService.maincontroller.showMarket= false;
      this.dataService.maincontroller.showHistory= false;
  	console.log("1");
  }
  select2(){
    if(this.dataService.maincontroller.loading){
      return;
    }
  		this.dataService.currentTab = 2;
  		this.image1 =this.dataService.getImage('bottomBarClear');
  		this.image2 = this.dataService.getImage('bottomBarBlack');
  		this.image3 = this.dataService.getImage('bottomBarClear');
  		this.image4 = this.dataService.getImage('bottomBarClear');
  		console.log("2");

  this.dataService.maincontroller.showAccount = false;
      this.dataService.maincontroller.showCollection = false;
      this.dataService.maincontroller.showMarket= true;
      this.dataService.maincontroller.showHistory= false;

  }
  select3(){
    if(this.dataService.maincontroller.loading){
      return;
    }
  		 this.dataService.currentTab = 3;
  		this.image1 = this.dataService.getImage('bottomBarClear');
  		this.image2 = this.dataService.getImage('bottomBarClear');
  		this.image3 =this.dataService.getImage('bottomBarBlack');
  		this.image4 = this.dataService.getImage('bottomBarClear');
  		console.log("3");

       this.dataService.maincontroller.showAccount = false;
      this.dataService.maincontroller.showCollection = false;
      this.dataService.maincontroller.showMarket= false;
      this.dataService.maincontroller.showHistory= true;
     

       // window.open("https://walletapp.indiesquare.me/explorer/#/addresses/"+this.dataService.maincontroller.currentAddress);

  }
  select4(){
    if(this.dataService.maincontroller.loading){
      return;
    }
  		this.dataService.currentTab = 4;
  		this.image1 = this.dataService.getImage('bottomBarClear');
  		this.image2 =this.dataService.getImage('bottomBarClear');
  		this.image3 = this.dataService.getImage('bottomBarClear');
  		this.image4 = this.dataService.getImage('bottomBarBlack');
     
      this.dataService.maincontroller.showAccount = true;
      this.dataService.maincontroller.showCollection = false;
      this.dataService.maincontroller.showMarket= false;
      this.dataService.maincontroller.showHistory= false;

  		console.log("4");
  }

}
