import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css']
})
export class BottomBarComponent implements OnInit {
 image1 = "../assets/images/bottomBarBlack.png";
 image2 = "../assets/images/bottomBarClear.png";
 image3 = "../assets/images/bottomBarClear.png";
 image4 = "../assets/images/bottomBarClear.png";


  constructor(public dataService:DataService) { }

  ngOnInit() {
  }

  select1(){
  		this.dataService.currentTab = 1;
  		this.image1 = "../assets/images/bottomBarBlack.png";
  		this.image2 = "../assets/images/bottomBarClear.png";
  		this.image3 = "../assets/images/bottomBarClear.png";
  		this.image4 = "../assets/images/bottomBarClear.png";
  	console.log("1");
  }
  select2(){
  		this.dataService.currentTab = 2;
  		this.image1 = "../assets/images/bottomBarClear.png";
  		this.image2 = "../assets/images/bottomBarBlack.png";
  		this.image3 = "../assets/images/bottomBarClear.png";
  		this.image4 = "../assets/images/bottomBarClear.png";
  		console.log("2");
  }
  select3(){
  		this.dataService.currentTab = 3;
  		this.image1 = "../assets/images/bottomBarClear.png";
  		this.image2 = "../assets/images/bottomBarClear.png";
  		this.image3 = "../assets/images/bottomBarBlack.png";
  		this.image4 = "../assets/images/bottomBarClear.png";
  		console.log("3");
  }
  select4(){
  		this.dataService.currentTab = 4;
  		this.image1 = "../assets/images/bottomBarClear.png";
  		this.image2 = "../assets/images/bottomBarClear.png";
  		this.image3 = "../assets/images/bottomBarClear.png";
  		this.image4 = "../assets/images/bottomBarBlack.png";
  		console.log("4");
  }

}
