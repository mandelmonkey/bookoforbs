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
  public fiatBuyPrice:string;
 noBuyOrders = false;
 isError = false;
 noSellOrders = false;
 loading = false;
 public sellPrice:string;
   public fiatSellPrice:string;
 constructor(public dataService:DataService,private httpService:HTTPService) {
 	 
 }
 formatNum(num:number){
  if(num > 1){
return num.toFixed(2);
}
else if(num > 0.1){
return num.toFixed(4);
}
else if(num > 0.01){
return num.toFixed(6);
}else{
  return num.toFixed(8);
}
}
getPrice(){
	 this.loading= true;
	if(typeof this.dataService.maincontroller.currentOrbs[this.token]["bestBuyPrice"] != "undefined" ){
		var price =this.dataService.maincontroller.currentOrbs[this.token]["bestBuyPrice"];
		var fiatPrice = this.dataService.maincontroller.getFiatForToken(this.dataService.maincontroller.currentCurrency,price);
	
		this.buyPrice =  this.formatNum(price);
		this.fiatBuyPrice = fiatPrice;

	 if(typeof this.dataService.maincontroller.currentOrbs[this.token]["bestSellPrice"] != "undefined" ){
		price = this.dataService.maincontroller.currentOrbs[this.token]["bestSellPrice"];
		fiatPrice = this.dataService.maincontroller.getFiatForToken(this.dataService.maincontroller.currentCurrency,price);

			this.sellPrice = this.formatNum(price) ;
			this.fiatSellPrice = fiatPrice;
		}else{
			this.noBuyOrders = true;
			 
		}

		 this.loading= false;
	}else{
	 this.httpService.getOrders(this.token, this.dataService.maincontroller.currentCurrency).subscribe(
     data => { 
           this.loading= false;
          var sell_orders = this.dataService.maincontroller.marge(data.ask, 'sell');

						var buy_orders = this.dataService.maincontroller.marge(data.bid, 'buy');

						if (buy_orders.length > 0) {

						 	var price = buy_orders[0].price;
							 fiatPrice = this.dataService.maincontroller.getFiatForToken(this.dataService.maincontroller.currentCurrency,price);
 
							this.buyPrice =  this.formatNum(price)  
							this.fiatBuyPrice = fiatPrice;
								
								this.dataService.maincontroller.currentOrbs[this.token]["bestBuyPrice"] = price;
							
								
							 
							 

						}else{
							this.noSellOrders = true;
							 
						}

						if (sell_orders.length > 0) {
						 	
						 	var price = sell_orders[0].price;
							 fiatPrice = this.dataService.maincontroller.getFiatForToken(this.dataService.maincontroller.currentCurrency,price);
							 console.log("fiat is "+fiatPrice);
									this.sellPrice = this.formatNum(price);
									this.fiatSellPrice = fiatPrice;
								this.dataService.maincontroller.currentOrbs[this.token]["bestSellPrice"] = price;
							
							 
							

						}else{
							this.noBuyOrders = true;
						
						}


						this.dataService.maincontroller.currentOrbs[this.token]["openOrders"] = sell_orders.length + buy_orders.length;
							

		 
     
      

      },   
      error => {
      	 this.loading= false;
       this.isError = true;
      },
     () => {});
	}
 

	 

}
 
  ngOnInit() {
   
this.getPrice();

  }

}
