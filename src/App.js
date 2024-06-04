import React from 'react';
import { useState } from 'react';
import './App.css';
import DaysInterval from './components/DaysInterval';
import CurrList from './components/CurrencyList';
import PercentageIncreaseDecrease from './components/PercentageIncreaseDecrease';
import Chart from './components/Chart';

function App() {
  const [currName, setCurrName] = useState('bitcoin');
  const [daysNo, setDaysNo] = useState(0);
  const [currencySymbols, setCurrencySymbols] = useState([]);

  function getDaysNo(daysNo) {
    setDaysNo(daysNo);
  }

  function getCurrencyName(currencyName) {
    setCurrName(currencyName);
  }

  function getCurrencyList(myList) {
    setCurrencySymbols(myList);
  }
  
  return (
    <div className="app">
      <h1 style={{padding:'3rem'}}>Cryptocurrency list</h1>
      <div className='lists'>
        <CurrencyList getCurrencyName={getCurrencyName} 
          getCurrencyList={getCurrencyList}/>
        <DaysInterval getDaysNo={getDaysNo}/>
        {daysNo > 1 && <Chart currName={currName} daysNo={daysNo}/>}
      </div>
      <div>
        {daysNo > 1 && <PercentageIncreaseDecrease  currencySymbols={currencySymbols} daysNo={daysNo}/>}
      </div>
    </div>
  );
}

export default App;
