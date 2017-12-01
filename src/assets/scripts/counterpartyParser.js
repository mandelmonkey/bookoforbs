

var counterpartyParser = function() {
	var tools = foo;
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
arc4 = function(key, data) {
	if(typeof key == 'string') key = tools.buffer(key, 'hex');
	if(typeof data == 'string') data = tools.buffer(data, 'hex');
	var S = [];
	for(var i=0; i<256; i++) {
		S[i] = i;
	}
	for(var i=0,j=0; i<256; i++) {
		j = (j + S[i] + key[i % key.length]) % 256;
		[S[i], S[j]] = [S[j], S[i]];
	}
	var ret = [];
	for(var x=0,i=0,j=0; x<data.length; x++) {
		i = (i + 1) % 256;
		j = (j + S[i]) % 256;
		[S[i], S[j]] = [S[j], S[i]];
		var K = S[(S[i] + S[j]) % 256];
		ret.push(data[x] ^ K);
	}
	return tools.buffer(ret);
};

	counterpartyParser.prototype.checkSendTransaction = function(unsignedtx,source,destination,token,amount,divisible) {


 if(divisible){
		amount*=100000000;
		 
		 }

		var jsonData = this.parse(unsignedtx);
			console.log(jsonData);

		if("Enhanced Send" != jsonData.type){
			 
			return false;
		}
		if(source != jsonData.destination.address){
		 
			return false;
		}

		var destinationAddress = jsonData.data.destination;
		var network = destinationAddress.substr(0,2);
		var pubkeyhash = destinationAddress.substr(2,40);
		var address = bitcoin.address.toBase58Check(tools.buffer(pubkeyhash,'hex'),parseInt(network));

		if(destination != address){
		 
			return false;
		}

		if(token != jsonData.data.asset_id){
		 
			 return false;
		}

		if(amount != jsonData.data.quantity){
			
			 return false;
		}


	
		return true;

	}

	counterpartyParser.prototype.checkOrderTransaction = function(unsignedtx,address,get_token,get_quantity,give_token,give_quantity,getDivisible,giveDivisible) {

		if(getDivisible){
			get_quantity*=100000000;
			 
		}
		if(giveDivisible){
			 
			give_quantity =give_quantity*100000000;
		}
		var jsonData = this.parse(unsignedtx);
		console.log(jsonData);
		if("Order" != jsonData.type){ 
			return false;
		}

		if(address != jsonData.destination.address){ 
			return false;
		}
		 
		if(get_token != jsonData.data.get_id){ 
			console.log(get_token+" "+jsonData.data.get_id);
			 return false;
		}

		if(give_token != jsonData.data.give_id){
			 return false;
		}

		if(get_quantity != jsonData.data.get_quantity){
			console.log(get_quantity+" "+jsonData.data.get_quantity);
			 return false;
		}

		if(give_quantity != jsonData.data.give_quantity){
			console.log(give_quantity+" "+jsonData.data.give_quantity);
			 return false;
		}
 
		return true;

	}

		counterpartyParser.prototype.checkCancelTransaction = function(unsignedtx) {

		var jsonData = this.parse(unsignedtx);

		if("Cancel" != jsonData.type){ 
			return false;
		}
		 
		return true;

	}

	counterpartyParser.prototype.parse = function(rawtx) {


 
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
			rawdata = cplib.counterjs.util.arc4(key, bitcoin.script.decompile(out.script)[1]);
		}
		if(type == 'multisig') {
			var decrypted = cplib.counterjs.util.arc4(key, Buffer.concat([out.script.slice(3, 33), out.script.slice(36, 68)]));
			rawdata = Buffer.concat([rawdata, decrypted.slice(1, 1+decrypted[0])]);
		}

 		}); 

 		 

 			var message;
	try {
		message = cplib.counterjs.Message.fromSerialized(rawdata);
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
 

 

