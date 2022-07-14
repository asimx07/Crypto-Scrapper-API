Running instructions: 

First open the folder in visual studio and install following dependencies. 
You need to have node installed on your workstation. 

=>npm install 
=>npm i axios
=>npm i express
=>npm i ejs
=>npm i nodemon 

After installing all of these you can run
=>npm start

to start the server. The server is listening to port 8000

open up chrome and use localhost:8000/prices to access crypto prices. 
Api has has caching of 10 seconds. Refresh the page to see updated prices. 

localhost:8000/info has link to api that is being used to get all the data from different exchanges. 

NOTE: This is just a server script. You can give this script to anyone to further develop your app. 


Following are the exchanges that are selected. 




Binance
Coinbase
Kraken
FTX
KuCoin
Huobi Global
Bitfinex
Gate.io 
Bybit
Crypto.com
Binance.US
Bitstamp
Gemini
Okex
Poloniex
Liquid
Bittrex
LBank
Upbit
Okcoin
etoroX
HitBtc
DigiFinex
Bittrue
FMFW.io
Aax
Coinex
Blockchain.com
Bequant
Bkex
ZB

Following are the Coins
'BTC','ETH','BNB','XRP','ADA','SOL','LUNA','DOT','AVAX','MATIC','LTC','ATOM','TRX','ALGO','FTM'
That have been used to fetch prices in both either USDT or USD.

Some of the exchanges don't list some of the coins. Those coins are not shown against that exchange. 

This API has 250,000 lifetime usage with request 20 call/s 
in order to make sure the limit is not crossed a slight delay is introduced between api calls. 

