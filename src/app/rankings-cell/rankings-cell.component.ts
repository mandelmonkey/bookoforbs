import {Input, Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { RankingsComponent } from '../rankings/rankings.component';
@Component({
  selector: 'app-rankings-cell',
  templateUrl: './rankings-cell.component.html',
  styleUrls: ['./rankings-cell.component.css']
})

export class RankingsCellComponent implements OnInit {
 @Input()
	item:any;

	 @Input()
	rankings: any;
  constructor(public dataService:DataService) { }

  ngOnInit() {
  }
getHeight(){
	return "101px";
}
	getBackground(index:string){
		 
		if(this.rankings[index].xcpAddress == this.dataService.maincontroller.currentAddress){

			return {
				"width": "100vw",
				"height": "100px",
 				"display":"table",
				"background-color":"rgba(0,0,0,0.5)"
			}
			 
		}else{
			return {
				"width": "100vw",
				"height": "100px", 
				 "display":"table",
			}
		}
	}

}
