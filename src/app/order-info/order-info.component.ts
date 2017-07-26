import { Component, OnInit, Input } from '@angular/core';
import {HTTPService} from "../services/http.service";
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
   providers:[HTTPService],
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {
 @Input() token: string;
 public buyPrice:string;
 public sellPrice:string;
 constructor(public dataService:DataService,private httpService:HTTPService) {
 	 
 }
 marge(orders:any,type:string){
var marged = new Array();
			var n = 0;
			for (var i = 0; i < orders.length; i++) {
				var is = true;
				if (i > 0) {
					if (orders[i].price == marged[n].price) {
						marged[n].order += orders[i].order;
						is = false;
					} else {
						n++;
						is = true;
					}
				}
				if (is) {
					if (marged[n] == null)
						marged[n] = {};
					marged[n].price = orders[i].price;
					if (type === 'buy') {
						marged[n].quantity = orders[i]["get_quantity"];
					} else {
						marged[n].quantity = orders[i]["give_quantity"];
					}
					marged[n].order = orders[i].order;
					marged[n].type = type;
				}
			}
			return marged;
 }
getPrice(){
	 this.httpService.getOrders(this.token, this.dataService.maincontroller.currentCurrency).subscribe(
     data => { 
          
          var sell_orders = this.marge(data, 'sell');

						var buy_orders = this.marge(data.bid, 'buy');

						if (buy_orders.length > 0) {

						 
								
							this.buyPrice = buy_orders[0].price + " "+this.dataService.maincontroller.currentAbrev;
								
							
								
							 
							

						}

						if (sell_orders.length > 0) {
						 
								this.sellPrice = sell_orders[0].price + " "+this.dataService.maincontroller.currentAbrev;
								
							 
							

						}

		 
     
      

      },   
      error => {
 			this.buyPrice= "error";
      },
     () => {});
 

	 

}
 
  ngOnInit() {
this.getPrice();

  }

}
