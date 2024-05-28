import React from 'react-dom';
import { useState } from 'react';
import './App.css';
import Interval from './components/interval';
import CurrencyList from './components/currencyList';
import Percentage from './components/percentage';
import CreateChart from './components/createChart';

function App() {
  const [currName, setCurrName] = useState('bitcoin');
  const [daysNo, setDaysNo] = useState(0);
  const [symbols, setSymbols] = useState([]);

  function getDaysNo(daysNo) {
    setDaysNo(daysNo);
  }
  function getCurrencyName(currencyName) {
    setCurrName(currencyName);
  }
  function getCurrencyList(myList) {
    setSymbols(myList);
  }
  return (
    <div className="app">
      <h1 style={{padding:'3rem'}}>Cryptocurrency list</h1>
      <div className='lists'>
        <CurrencyList getCurrencyName={getCurrencyName} 
          getCurrencyList={getCurrencyList}/>
        <Interval getDaysNo={getDaysNo}/>
        {daysNo > 1 && <CreateChart currName={currName} daysNo={daysNo}/>}
      </div>
      <div>
        {daysNo > 1 && <Percentage  symbols={symbols} daysNo={daysNo}/>}
      </div>
    </div>
  );
}

export default App;
