import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {

  constructor(public dataService:DataService) { }

  ngOnInit() {
  }
 getTopBackground(){
  return 0;
    }
    closeSelf(){
    	this.dataService.maincontroller.showRankings = false;
    }
}
