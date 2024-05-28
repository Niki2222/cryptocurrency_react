import React from 'react-dom';
import { useEffect, useState } from 'react';

export default function Percentage({symbols, daysNo}) {
    const [percentageList, setPercentageList] = useState([]);
  
    useEffect(() => {
      setPercentageList([])
      for (let i = 0; i < symbols.length; ++i) {
      fetch(`https://api.coingecko.com/api/v3/coins/${symbols[i]}/market_chart?vs_currency=usd&days=${daysNo}&interval=daily&x_cg_demo_api_key=CG-oc5fuhLwjXr58JdiLx7ZXmxQ`)
        .then((response) => response.json()
          .then((data) => {
            let total = ((data.prices[daysNo - 1][1] - data.prices[0][1]) * 100 
              / data.prices[0][1]).toFixed(2);
            setPercentageList(prevList => [...prevList, {name: symbols[i], 
              percentage: total}]);
          })).catch((error) => {
            console.log(error);
          })
      }
    }, [daysNo]);
    
    const topFive = percentageList.sort((a, b) => 
      parseFloat(a.percentage) > parseFloat(b.percentage) ? -1 : 1).slice(0, 5);
  
    const lastFive = percentageList.sort((a, b) => 
      parseFloat(a.percentage) < parseFloat(b.percentage) ? -1 : 1).slice(0, 5);
  
    return (
      <div className='lists'>
        <div>
          <h3>Most increased currencies:</h3>
          <ul>
            {topFive.map((el, index) => {
              return <li key={index}>{el.name}: {el.percentage}</li>
            })}
          </ul>
        </div>
        <div>
          <h3>Most decreased currencies:</h3>
          <ul>
            {lastFive.map((el, index) => {
              return <li key={index}>{el.name}: {el.percentage}</li>
            })}
          </ul>
        </div>
      </div>
    )
  }