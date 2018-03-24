

var counterpartyParser = function() {
var tools = booTools;
var counterjs = booTools.counterjs;
var bitcoin = tools.bitcoin;
var crypto = bitcoin.crypto;
var txObject;
 var UTXOSs = [];
    var spentUTXOSs = [];
   var  inputAmount = 0;
     var  outputAmount = 0;
     var fee = 0;
     var increase = 0;
     var  includedInput;
     var includedInputAmount;
     var newInputAmount = 0;
     var newTx;
     var sourceAddress;
     var bumbFeeCallback;
 function counterpartyParser() {

 }
 

	counterpartyParser.prototype.checkSendTransaction = function(unsignedtx,source,destination,token,amount,divisible) {

		 
 	if(divisible){
		amount*=100000000;
		 
		 }

		var jsonData = this.parse(unsignedtx);
			console.log(jsonData);

		if("Enhanced Send" != jsonData.type){
			 
			return [false,"type mismatch"+"Enhanced Send "+jsonData.type];
		}
		

		var destinationAddress = jsonData.data.destination;
		var network = destinationAddress.substr(0,2);
		var pubkeyhash = destinationAddress.substr(2,40);
		var address = bitcoin.address.toBase58Check(tools.buffer(pubkeyhash,'hex'),parseInt(network));
 		console.log(address);

		if(destination != address){
		 
			return [false,"address mismatch:"+destination+" "+address];
		}

		if(token != jsonData.data.asset_id){
		 
			 return [false,"asset mismatch:"+token+" "+jsonData.data.asset_id];
		}

		if(amount != jsonData.data.quantity){
			
			 return [false,"amount mismatch:"+amount+" "+jsonData.data.quantity];
		}

 
	
		return [true,null];

	}

	counterpartyParser.prototype.checkOrderTransaction = function(unsignedtx,address,get_token,get_quantity,give_token,give_quantity,getDivisible,giveDivisible) {

		if(getDivisible){
			console.log("get is divisible");
			get_quantity *= 100000000;
			 
		}else{
			console.log("get div is ",getDivisible);
		}
		if(giveDivisible){
			 console.log("give is divisible");
			give_quantity *= 100000000;
		}else{
			console.log("give div is ",giveDivisible);
		}
		var jsonData = this.parse(unsignedtx);
		console.log(jsonData);
		if("Order" != jsonData.type){ 
			return [false,"type mismatch: Order "+jsonData.type];
		}

		if(address != jsonData.destination.address){ 
			return [false,"address mismatch: "+address+" "+jsonData.destination.address];
		}
		 
		if(get_token != jsonData.data.get_id){ 
			console.error("get "+get_token+" "+jsonData.data.get_id);
			 return [false,"get asset mismatch: "+get_token+" "+jsonData.data.get_id];
		}

		if(give_token != jsonData.data.give_id){
			console.error("give "+give_token+" "+jsonData.data.give_id);
			 return [false,"give asset mismatch: "+give_token+" "+jsonData.data.give_id];
		}

		if(get_quantity != jsonData.data.get_quantity){
			console.error("get "+get_quantity+" "+jsonData.data.get_quantity);
			 return [false,"get amount mismatch: "+get_quantity+" "+jsonData.data.get_quantity];
		}

		if(give_quantity != jsonData.data.give_quantity){
			console.error("give "+give_quantity+" "+jsonData.data.give_quantity);
			 return [false,"give amount mismatch: "+give_quantity+" "+jsonData.data.give_quantity];
		}
 
		return true;

	}

		counterpartyParser.prototype.checkCancelTransaction = function(unsignedtx) {

		var jsonData = this.parse(unsignedtx);

		if("Cancel" != jsonData.type){ 
			return [false,"type mismatch: Cancel "+jsonData.type];
		}
		 
		return [true,null];

	}

	counterpartyParser.prototype.parse = function(rawtx) {


 var cpDataCount = 0;
		var network = 'mainnet';
	var rawdata = [];
		var txObj = bitcoin.Transaction.fromHex(rawtx);

		 var destination = null;
	var rawdata = tools.buffer.alloc(0);

 		var key = tools.bufferReverse(txObj.ins[0].hash);
 	 
 		txObj.outs.forEach(function (out, idx) {


		var type = bitcoin.script.classifyOutput(out.script);
		if(type == 'pubkeyhash') {
 
			if(!destination) {

				destination = {
					address: bitcoin.address.toBase58Check(out.script.slice(3, 23), {mainnet: 0x00, testnet: 0x6f}[network]),
					amount: out.value,
				};
			}
		}
		if(type == 'nulldata') {
			cpDataCount++;
			rawdata =  counterjs.util.arc4(key, bitcoin.script.decompile(out.script)[1]);
		}
		if(type == 'multisig') {
			cpDataCount++;
			var decrypted =  counterjs.util.arc4(key, Buffer.concat([out.script.slice(3, 33), out.script.slice(36, 68)]));
			rawdata = Buffer.concat([rawdata, decrypted.slice(1, 1+decrypted[0])]);
		}

 		}); 

 		 
 		if(cpDataCount > 1){
 			return [];
 		}


 			var message;
	try {
		message =  counterjs.Message.fromSerialized(rawdata);
	} catch(e) {
		alert(e);
		// maybe non-Counterparty tx.
	}	
	var jsonMessage = message.toJSON();
	jsonMessage.destination = destination;
  
 	 	return jsonMessage;

	}


 

 return counterpartyParser;

}();
 

 

