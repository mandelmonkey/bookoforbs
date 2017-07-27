import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class HTTPService{
    apiKey = "f29809821767e00b19e887e762e78e01";
       defaultBundleID = "com.spellsofgenesis";
     defaultEnvCode = "eSog";
   baseOrbUrl = "https://api.spellsofgenesis.com/orbscenter/?entity=orbs_center";
  devExt = "&apiv=2";
    


  constructor(private _http:Http){}


    
    getEnvironments(){
         var header = new Headers();
   
 

     var url = this.baseOrbUrl+"&action=getEnvironments&responseType=JSON"+this.devExt;
       console.log( url);
      
 var json = JSON.stringify({
             url: url,
        });

      var params = json;
      var header = new Headers();
      header.append('Content-type', 'Content-Type: application/json');
       header.append('Content-type', 'Content-Type: application/json');

      return this._http.post("https://sarutobigob1309.herokuapp.com/returnUrl",params, {
        headers:header
      })
      .map(res => res.json());

    };
 

    getEnvironment(env:string){
         var header = new Headers();
 

     var url = this.baseOrbUrl+"&action=getEnvironment&env="+env+"&responseType=JSON"+this.devExt;
       console.log(url);
      
 var json = JSON.stringify({
             url: url,
        });

      var params = json;
      var header = new Headers();
      header.append('Content-type', 'Content-Type: application/json');
       header.append('Content-type', 'Content-Type: application/json');

      return this._http.post("https://sarutobigob1309.herokuapp.com/returnUrl",params, {
        headers:header
      })
      .map(res => res.json());
    };

 

    getRawTransaction(txid){
        

      return this._http.get("https://api.indiesquare.me/v2/transactions/"+txid+"/raw?X-Api-Key=" + this.apiKey)
      .map(res=>res.json());
    };
     
    getOrders(token,currency){
         var header = new Headers();
 header.append('Content-type','Content-Type: application/json; charset=utf-8');

      /*
         header.append("Access-Control-Allow-Origin", "*");
    header.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     header.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");*/
  
       return this._http.get("https://api.indiesquare.me/v2/orders/"+token+"/book?base_token="+currency+"?X-Api-Key=" + this.apiKey,{
        headers:header
      })
      .map(res => res.json());
    };
    getBalance(address){
      /*
      return this._http.get("https://api.indiesquare.me/v2/addresses/"+address+"/balances?X-Api-Key=" + this.apiKey)
      .map(res=>res.json());*/

       return this._http.get("https://api.indiesquare.me/v2/addresses/"+address+"/balances")
      .map(res=>res.json());
    };

     getFees(){
      return this._http.get("https://api.indiesquare.me/v2/fees/recommended?X-Api-Key=" + this.apiKey)
      .map(res=>res.json());
    };

    broadcastTransaction(tx){
       var json = JSON.stringify({
             tx: tx,
        });

      var params = json;
      var header = new Headers();
      header.append('Content-type', 'Content-Type: application/json');
       header.append('Content-type', 'Content-Type: application/json');

      return this._http.post("https://api.indiesquare.me/v2/transactions/broadcast?X-Api-Key=" + this.apiKey,params, {
        headers:header
      })
      .map(res => res.json());
    };

    getRawTransactions(address){
      return this._http.get("https://api.indiesquare.net/v2/addresses/"+address+"/rawtransactions?X-Api-Key=" + this.apiKey)
      .map(res=>res.json());
    };


    decodeRawTransaction(tx){
        
      var json = JSON.stringify({
             tx: tx,
        });

      var params = json;
      var header = new Headers();
      header.append('Content-type', 'Content-Type: application/json');

      return this._http.post("https://api.indiesquare.me/v2/transactions/decode?X-Api-Key=" + this.apiKey,params, {
        headers:header
      })
      .map(res => res.json());
    };

   


    createSendTransaction(source,destination,token,quantity,fee_per_kb,fee){
        if(fee != -1){
            var json = JSON.stringify({
              source: source,
              destination: destination,
              token: token,
              quantity:quantity,
              fee:fee,
            });
        }
        else{
          var json = JSON.stringify({
              source: source,
              destination: destination,
              token: token,
              quantity:quantity,
              fee_per_kb:fee_per_kb,
            });
        }
      var params = json;
      console.log(params);
      var header = new Headers();
      header.append('Content-type', 'Content-Type: application/json');

      return this._http.post("https://api.indiesquare.me/v2/transactions/send",params, {
        headers:header
      })
      .map(res => res.json());
    };

}