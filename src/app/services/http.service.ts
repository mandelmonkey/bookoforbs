import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../services/data.service';
//import 'rxjs/Rx';

@Injectable()
export class HTTPService {
  apiKey = "f29809821767e00b19e887e762e78e01";
  defaultBundleID = "com.spellsofgenesis";
  defaultEnvCode = "eSog";
  indieURL = "https://api.indiesquare.me";
  baseOrbUrl = "https://api.spellsofgenesis.com/orbscenter/?entity=orbs_center";
  devExt = "&apiv=3&apik=18a48545-96cd-4e56-96aa-c8fcae302bfd";


  //  addressExt =     "&mainAddress="+this.dataService+"&targetAddress="+_requires["cache"].data.address;

  constructor(public dataService: DataService, private _http: Http) { }

  getAddressUrl() {

    return "&mainAddress=" + this.dataService.maincontroller.currentAddress + "&targetAddress=" + this.dataService.maincontroller.currentAddress;
  }

  triggerRankings(env: string) {
    var url = this.baseOrbUrl + "&action=getUserPerEnv&env=" + env + "&responseType=JSON" + this.devExt + this.getAddressUrl();
    console.log(url);
    var header = new Headers();
    header.append('Content-type', 'Content-Type: application/json');
    header.append('Content-type', 'Content-Type: application/json');

    return this._http.get(url, {
      headers: header
    })
      .map(res => res.json());
  }
  getAssetInfo(asset: string) {
    var header = new Headers();



    var url = this.baseOrbUrl + "&action=getAssetInfo&asset=" + asset + this.devExt + this.getAddressUrl();
    console.log(url);

    var json = JSON.stringify({
      url: url,
    });

    var params = json;
    var header = new Headers();
    header.append('Content-type', 'Content-Type: application/json');

    return this._http.get(url, {
      headers: header
    })
      .map(res => res.json());

  }

  getEnvironments() {
    var header = new Headers();



    var url = this.baseOrbUrl + "&action=getEnvironments&responseType=JSON" + this.devExt + this.getAddressUrl();
    console.log(url);

    var json = JSON.stringify({
      url: url,
    });

    var params = json;
    var header = new Headers();
    header.append('Content-type', 'Content-Type: application/json');

    return this._http.get(url, {
      headers: header
    })
      .map(res => res.json());
    /*
    return this._http.post("https://sarutobigob1309.herokuapp.com/returnUrl",params, {
       headers:header
     })
     .map(res => res.json());
     */

  };
  setUsername(sig: string, username: string) {


    var payload = new FormData();

    payload.append("signature", sig);



    var theurl = this.baseOrbUrl + "&action=setUsername&username=" + username + "&responseType=JSON" + this.devExt + this.getAddressUrl();


    return this._http.post(theurl, payload)
      .map(res => res.json());

  }
  getHandshake() {
    var url = this.baseOrbUrl + "&action=getHandshake&responseType=JSON" + this.devExt + this.getAddressUrl();

    console.log(url)
    var header = new Headers();
    header.append('Content-type', 'Content-Type: application/json');

    return this._http.get(url, {
      headers: header
    })
      .map(res => res.json());
  }

  getTokenInfo(theToken: string) {

    var url = this.indieURL + "/v2/tokens/" + theToken + "?X-Api-Key=" + this.apiKey

    var header = new Headers();
    header.append('Content-type', 'Content-Type: application/json');
    header.append('Content-type', 'Content-Type: application/json');

    return this._http.get(url, {
      headers: header
    })
      .map(res => res.json());

  }

  getPriceForToken(theToken: string) {

    var url = this.indieURL + "/v2/market/" + theToken + "/price?X-Api-Key=" + this.apiKey

    var header = new Headers();
    header.append('Content-type', 'Content-Type: application/json');
    header.append('Content-type', 'Content-Type: application/json');

    return this._http.get(url, {
      headers: header
    })
      .map(res => res.json());
  }
  getMarkets() {
    var url = this.indieURL + "/v2/market/ticker?X-Api-Key=" + this.apiKey

    var header = new Headers();
    header.append('Content-type', 'Content-Type: application/json');
    header.append('Content-type', 'Content-Type: application/json');

    return this._http.get(url, {
      headers: header
    })
      .map(res => res.json());
  }
  getRankings(env: string) {
    var url = this.baseOrbUrl + "&action=getRanks&env=" + env + "&responseType=JSON" + this.devExt + this.getAddressUrl();
    console.log(url);
    var header = new Headers();
    header.append('Content-type', 'Content-Type: application/json');
    header.append('Content-type', 'Content-Type: application/json');

    return this._http.get(url, {
      headers: header
    })
      .map(res => res.json());
  }
  getEnvironment(env: string) {
    var header = new Headers();


    var url = this.baseOrbUrl + "&action=getEnvironment&env=" + env + "&responseType=JSON" + this.devExt + this.getAddressUrl();
    console.log(url);

    var json = JSON.stringify({
      url: url,
    });

    var params = json;
    var header = new Headers();
    header.append('Content-type', 'Content-Type: application/json');
    header.append('Content-type', 'Content-Type: application/json');


    return this._http.get(url, {
      headers: header
    })
      .map(res => res.json());


  };



  getRawTransaction(txid) {


    return this._http.get(this.indieURL + "/v2/transactions/" + txid + "/raw?X-Api-Key=" + this.apiKey)
      .map(res => res.json());
  };

  getClosedOrders(token, currency) {

    var header = new Headers();
    header.append('Content-type', 'Content-Type: application/json; charset=utf-8');
    header.append('X-Api-Key', this.apiKey);

    return this._http.get(this.indieURL + "/v2/orders/" + token + "/history?base_token=" + currency + "&X-Api-Key=" + this.apiKey, {
      headers: header
    })
      .map(res => res.json());

  };

  getOrderHistory(address, type, currency) {
    if (type == "all") {

      return this._http.get(this.indieURL + "/v2/addresses/" + address + '/orderhistory?base_token=' + currency + '&length=100').map(res => res.json());
    } else if (type == "buy") {

      return this._http.get(this.indieURL + "/v2/addresses/" + address + '/orderhistory?base_token=' + currency + '&type=' + type + '&status=filled&length=100').map(res => res.json());

    } else if (type == "sell") {

      return this._http.get(this.indieURL + "/v2/addresses/" + address + '/orderhistory?base_token=' + currency + '&type=' + type + '&status=filled&length=100').map(res => res.json());

    }
    else if (type == "open") {

      return this._http.get(this.indieURL + "/v2/addresses/" + address + '/orderhistory?base_token=' + currency + '&status=open&length=100').map(res => res.json());

    }
  };
  getOrders(token, currency) {

    var header = new Headers();
    header.append('Content-type', 'Content-Type: application/json; charset=utf-8');
    header.append('X-Api-Key', this.apiKey);

    return this._http.get(this.indieURL + "/v2/orders/" + token + "/book?base_token=" + currency + "&X-Api-Key=" + this.apiKey, {
      headers: header
    })
      .map(res => res.json());

  };

  getHistory(address) {


    return this._http.get(this.indieURL + "/v2/addresses/" + address + "/history?type=send,order&length=20")
      .map(res => res.json());
  };
  getBalance(address) {


    return this._http.get(this.indieURL + "/v2/addresses/" + address + "/balances")
      .map(res => res.json());
  };

  getFees() {
    return this._http.get(this.indieURL + "/v2/fees/recommended?X-Api-Key=" + this.apiKey)
      .map(res => res.json());
  };

  broadcastTransaction(tx) {
    var json = JSON.stringify({
      tx: tx,
    });

    var params = json;
    var header = new Headers();
    header.append('Content-type', 'Content-Type: application/json');
    header.append('Content-type', 'Content-Type: application/json');

    return this._http.post(this.indieURL + "/v2/transactions/broadcast?X-Api-Key=" + this.apiKey, params, {
      headers: header
    })
      .map(res => res.json());
  };

  getRawTransactions(address) {
    return this._http.get(this.indieURL + "/v2/addresses/" + address + "/rawtransactions?X-Api-Key=" + this.apiKey)
      .map(res => res.json());
  };


  decodeRawTransaction(tx) {

    var json = JSON.stringify({
      tx: tx,
    });

    var params = json;
    var header = new Headers();
    header.append('Content-type', 'Content-Type: application/json');

    return this._http.post(this.indieURL + "/v2/transactions/decode", params, {
      headers: header
    })
      .map(res => res.json());
  };




  createSendTransaction(source, destination, token, quantity, fee_per_kb, fee) {
    if (fee != -1) {
      var json = JSON.stringify({
        source: source,
        destination: destination,
        token: token,
        quantity: quantity,
        fee: fee,
      });
    }
    else {
      var json = JSON.stringify({
        source: source,
        destination: destination,
        token: token,
        quantity: quantity,
        fee_per_kb: fee_per_kb,
      });
    }
    var params = json;
    console.log(params);
    var header = new Headers();
    header.append('Content-type', 'Content-Type: application/json');
    //  header.append('Access-Control-Allow-Origin', '*');

    return this._http.post(this.indieURL + "/v2/transactions/send", params, {
      headers: header
    })
      .map(res => res.json());
  };

}