import React, { useEffect } from 'react';

const CryptoPrice = () => {
  const [btc, setBtc] = React.useState('btc_price');
  const [eth, setEth] = React.useState('eth_price');
  const [dot, setDot] = React.useState('dot_price');
  const [moonbeam, setMoonbeam] = React.useState('glmr_priсe');
  //const API_KEY = 'd61e0ac1-b47e-4d21-b133-ed47a6b49f97';
  // const endpointCoinmarket = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC&convert=USD&CMC_PRO_API_KEY=${API_KEY}`;

  useEffect(() => {
    priceUpdate();
    const interval = setInterval(() => {
      priceUpdate();
    }, 10000);
    return () => clearInterval(interval);
  }, [btc]);

  function priceUpdate() {
    getBitcoinPrice(); //coindesc
    gecoEth();
    gecoDot();
    gecomoonbeam();
  }

  async function getBitcoinPrice() {
    try {
      const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json'); // coindesk
      if (!response.ok) {
        throw new Error(`Запрос упал получение ____ ${response.status}`);
      }
      //console.log('Запрос пройден BTC');
      const data = await response.json();
      const rate = data.bpi.USD.rate_float; // coindesk data rate
      console.log(`1 Bitcoin is currently worth ${rate} USD.`);
      setBtc(rate);
      return rate;
    } catch (error) {
      console.error(error);
    }
  }

  async function gecoEth() {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
      ); // coindesk

      if (!response.ok) {
        throw new Error(`Запрос упал получение ____ ${response.status}`);
      }
      console.log('Запрос пройден втф');
      const data = await response.json();
      const rate = data.ethereum.usd;
      // const rate = data.data.BTC.quote.USD.price;
      console.log(`1 Эфир стоит  ${rate} USD.`);
      setEth(rate);
      return rate;
    } catch (error) {
      console.error(error);
    }
  }

  async function gecoDot() {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=polkadot&vs_currencies=usd',
      ); // coindesk

      if (!response.ok) {
        throw new Error(`Запрос упал получение ____ ${response.status}`);
      }
      const data = await response.json();
      const rate = data.polkadot.usd;
      // const rate = data.data.BTC.quote.USD.price; // coinmarketcap data rate
      console.log(`1 DOT стоит  ${rate} USD.`);

      setDot(rate);
      return rate;
    } catch (error) {
      console.error(error);
    }
  }

  async function gecomoonbeam() {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=moonbeam&vs_currencies=usd',
      ); // coindesk

      if (!response.ok) {
        throw new Error(`Запрос упал получение ____ ${response.status}`);
      }
      const data = await response.json();
      const rate = data.moonbeam.usd;
      // const rate = data.data.BTC.quote.USD.price; // coinmarketcap data rate
      console.log(`1 GLMR стоит  ${rate} USD.`);

      setMoonbeam(rate);
      return rate;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="layer_bg">
      <div className="btc_price">BTC - ${btc}</div>
      <div className="eth_price">ETH - ${eth}</div>
      <div className="dot_price">DOT - ${dot}</div>
      <div className="moonbeam_price">GLMR - ${moonbeam}</div>
    </div>
  );
};
export default CryptoPrice;
