const express = require('express'); //Express to install it run  npm i express 
const axios = require('axios'); //Axios for http req/res , npm i axios 
const ejs = require('ejs'); //to install npm i ejs
const { response } = require('express');
const { allowedNodeEnvironmentFlags } = require('process');
//const coins = ['BTC','ETH','BNB','XRP','ADA','SOL','LUNA','DOT','AVAX','MATIC','LTC','ATOM','TRX','ALGO','FTM'];

//Data structure to hold all the apis 
const exchange=[
    {
        coin: 'Binance',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT&e=Binance",
        denominator:'USDT/USD'
    },
    {
        coin: 'Coinbase',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=Coinbase",
        denominator:'USDT/USD'
    },
    {
        coin: 'Kraken',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=Kraken",
        denominator:'USDT/USDT'
    },
    {
        coin: 'FTX',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=FTX",
        denominator:'USDT/USDT'
    },
    {
        coin: 'KuCoin',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=kucoin",
        denominator:'USDT/USD'
    },
    {
        coin: 'Huobi Global',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=HuobiGlobal",
        denominator:'USDT/USD'
    },
    {
        coin: 'Bitfinex',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=Bitfinex",
        denominator:'USDT/USD'
    },
    {
        coin: 'Gate.io',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=Gateio",
        denominator:'USDT/USD'
    },
    {
        coin: 'Bybit',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=Bybit",
        denominator:'USDT/USD'
    },
    {
        coin: 'Crypto.com',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=Cryptodotcom",
        denominator:'USDT/USD'
    },
    {
        coin: 'BINANCEUSA',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=BinanceUSA",
        denominator:'USDT/USD'
    },
    {
        coin: 'Bitstamp',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=Bitstamp",
        denominator:'USDT/USD'
    },
    {
        coin: 'Gemini',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=Gemini",
        denominator:'USDT/USD'
    },
    {
        coin: 'OKEX',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=Okex",
        denominator:'USDT/USD'
    },
   
    {
        coin: 'POLONIEX',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=Poloniex",
        denominator:'USDT/USD'
    },
    {
        coin: 'Liquid',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=Liquid",
        denominator:'USDT/USD'
    },
    {
        coin: 'Bittrex',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=Bittrex",
        denominator:'USDT/USD'
    },
    {
        coin: 'LBank',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=LBank",
        denominator:'USDT/USD'
    },
    {
        coin: 'Upbit',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=Upbit",
        denominator:'USDT/USD'
    },
    {
        coin: 'OkCoin',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=okcoin",
        denominator:'USDT/USD'
    },
    {
        coin: 'eToro',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=etoro",
        denominator:'USDT/USD'
    },
    {
        coin: 'HitBtc',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=HitBtc",
        denominator:'USDT/USD'
    },
    {
        coin: 'DigiFinex',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=DigiFinex",
        denominator:'USDT/USD'
    },
    {
        coin: 'aax',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=aax",
        denominator:'USDT/USD'
    },
    {
        coin: 'CoinEx',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=Coinex",
        denominator:'USDT/USD'
    },
    {
        coin: 'Blockchain.com',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=blockchaincom",
        denominator:'USDT/USD'
    },
    {
        coin: 'Bequant',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=bequant",
        denominator:'USDT/USD'
    },
    {
        coin: 'Bkex',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=Bkex",
        denominator:'USDT/USD'
    },
    {
        coin: 'ZB',
        address:"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,ADA,SOL,LUNA,DOT,AVAX,MATIC,LTC,ATOM,TRX,ALGO,FTM&tsyms=USDT,USD&e=ZB",
        denominator:'USDT/USD'
    },

];

const app= express();
app.listen(8000, ()=>{
    console.log('App is listening @ port 3000');
});

//function to delay calling of api calls. 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

//www.localhost:8000/prices will give you what you requested.
app.get('/prices', async(req,res)=>{
    allInfo = []; //parsed data objects will be stored here
    
    exchange.forEach(data=>{
        
            const response= axios.get(data.address)
            .then(response =>{
                newObj = response.data.RAW;
                    for(key in newObj){
                        var oneObj = {
                        
                        };
                        oneObj.coin = key;
                        try{
                            oneObj.market = newObj[key].USDT.MARKET;
                            oneObj.price = newObj[key].USDT.PRICE;
                        }
                        catch{
                            oneObj.market = newObj[key].USD.MARKET;
                            oneObj.price = newObj[key].USD.PRICE;
                        }
                        allInfo.push(oneObj);
                        //console.log(allInfo);
                        //sleep(500);
                    }          
                
            }).catch(err=>{
                console.log("err in new catch", err);
            });
        
    });
    
    sleep(500).then(()=>{
        res.render('index.ejs',{allInfo});
    });

});
app.get('/info',(req,res)=>{
    res.json(`The script uses api from https://min-api.cryptocompare.com/documentation`)
})