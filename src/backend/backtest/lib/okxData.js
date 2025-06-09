
const axios = require('axios');
const base = 'https://www.okx.com';

function mapCandle(arr){
  // OKX /market/candles returns [timestamp, o, h, l, c, volume, volumeCcy]
  return [
    arr[0], +arr[1], +arr[2], +arr[3], +arr[4], +arr[5],
    null,null,null,null,null,null
  ];
}

/**
 * interval: '1m','5m','1H','4H','1D'
 */
function toOkxBar(interval){
  const map={'1m':'1m','3m':'3m','5m':'5m','15m':'15m','30m':'30m','1h':'1H','4h':'4H','1d':'1D'};
  return map[interval] || '1H';
}

async function getHistoricalKlines(symbol='BTC-USDT-SWAP', interval='1H', start, end){
  const bar = toOkxBar(interval.toLowerCase());
  let after = Math.floor(end.getTime());
  const out=[];
  while(true){
    const url=`${base}/api/v5/market/candles?instId=${symbol}&bar=${bar}&after=${after}&limit=100`;
    const { data } = await axios.get(url);
    if(data.code !== '0') throw new Error('OKX API error '+data.msg);
    const list = data.data;
    if(!list || list.length===0) break;
    list.forEach(c=>out.push(mapCandle(c)));
    const lastTs = +list[list.length-1][0];
    if(lastTs<=start.getTime()) break;
    after = lastTs - 1;
  }
  return out.reverse();
}

async function getFundingRates(symbol='BTC-USDT-SWAP'){
  const url=`${base}/api/v5/public/funding-rate-history?instId=${symbol}&limit=100`;
  const { data } = await axios.get(url);
  if(data.code!=='0') throw new Error(data.msg);
  return data.data; // array with {fundingRate, fundingTime}
}

module.exports = { getHistoricalKlines, getFundingRates };
