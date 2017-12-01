import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';
@Component({
  selector: 'app-completionbar',
  templateUrl: './completionbar.component.html',
  styleUrls: ['./completionbar.component.css']
})
export class CompletionbarComponent implements OnInit {

  constructor(public dataService:DataService) { }

  ngOnInit() {
  }
  getCompletionWidth(){

  	if(this.dataService.maincontroller.ownedOrbsEnv != null){
      var keys = Object.keys(this.dataService.maincontroller.ownedOrbsEnv);
      if(keys != null){
  	var ownedNum =keys.length;

  	var allOrbs = this.dataService.maincontroller.allOrbsKeys.length;
   
  	var percentage = ownedNum/allOrbs * 100;
   
  	if(percentage<4){
  		percentage = 4;
  	}
  	return percentage;
  	}
  }
  	return 0;
  }
  showRankings(){
  	this.dataService.maincontroller.showRankings = true;
  }
getScore(){
	return Object.keys(this.dataService.maincontroller.ownedOrbsEnv).length+"/"+this.dataService.maincontroller.allOrbsKeys.length;
}
getColor(){

var percentage = this.getCompletionWidth();
	if(percentage < 20){
		return "#d13e3e";
	}else if (percentage < 40){
		return "#e4832d";
	}
	else if (percentage < 100){
		return "#6da22c";
	}
	else {
		return "transparent";
	}

}


}
