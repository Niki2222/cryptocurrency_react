import React from 'react-dom';
import { useEffect, useState } from 'react';

export default function PercentageIncreaseDecrease({currencySymbols, daysNo}) {
  const [percentageList, setPercentageList] = useState([]);
  const [topFive, setTopFive] = useState([]);
  const [lastFive, setLastFive] = useState([]);

  useEffect(() => {
    const fetchPercentages = async () => {
      const percentages = [];
      for (let i = 0; i < currencySymbols.length; ++i) {
        try {
          const response = await fetch(`https://api.coingecko.com/api/v3/coins/${currencySymbols[i]}/market_chart?vs_currency=usd&days=${daysNo}&interval=daily&x_cg_demo_api_key=CG-oc5fuhLwjXr58JdiLx7ZXmxQ`);
          const data = await response.json();
          const totalPercentage = ((data.prices[daysNo - 1][1] - data.prices[0][1]) * 100 
            / data.prices[0][1]).toFixed(2);
          percentages.push({name: currencySymbols[i], percentage: totalPercentage});
        } catch (error) {
          console.log(error);
        }
      }
      setPercentageList(percentages);
    };

    fetchPercentages();
  }, [currencySymbols, daysNo]);

  useEffect(() => {
    if (percentageList.length > 0) {
      const sortedList = percentageList.slice()
        .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));
      setTopFive(sortedList.slice(0, 5));
      setLastFive(sortedList.slice(-5).reverse());
    }
  }, [percentageList]);

  return (
    <div className='lists'>
      <div>
        <h3>Most increased currencies:</h3>
        <ul>
          {topFive.map((el, index) => (
            <li key={index}>{el.name}: {el.percentage}%</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Most decreased currencies:</h3>
        <ul>
          {lastFive.map((el, index) => (
            <li key={index}>{el.name}: {el.percentage}%</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
