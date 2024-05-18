import React from 'react-dom';
import { useEffect, useState } from 'react';
import './App.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend } from 'recharts';
import moment from 'moment';

function Interval({getDaysNo}) {
  const [intervalName, setIntervalName] = useState(null);
  const intervalList = [7, 10, 30, 90];

  return(
    <div className="dropdown">
    <a className="btn btn-secondary dropdown-toggle" 
      href="#" role="button" data-bs-toggle="dropdown" 
      aria-expanded="false">
      {intervalName ? intervalName : "Choose interval"}
    </a>
    <ul className="dropdown-menu">
      {intervalList.map((el, index) => {
        return <li key={index}><a className="dropdown-item" href="#"
          onClick={(event) => {
            event.preventDefault();
            setIntervalName(el);
            getDaysNo(el);
          }}>{el} days</a></li>
      })}
    </ul>
  </div>
  )
}

function CurrencyList({getCurrencyName}) {
  const [list, setList] = useState([]);
  const [currency, setCurrency] = useState(null);

  function getCurrency() {
    fetch('https://api.coincap.io/v2/assets')
    // fetch('https://api.coingecko.com/api/v3/search?query=eth')
      .then((response) => response.json())
        .then((data) => {
          // console.log(data);  
          setList(data.data);
        }).catch((err) => {
          console.log('not loading...', err);
    });
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd') 
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
      })
    
  }

  return(
    <div className="dropdown">
      <a className="btn btn-secondary dropdown-toggle" 
        href="#" role="button" data-bs-toggle="dropdown" 
        aria-expanded="false" 
        onClick={getCurrency}>
        {currency ? currency : "Choose cryptocurrency"}
      </a>
      <ul className="dropdown-menu">
        {list.map((el, index) => {
          return <li key={index}><a className="dropdown-item" href='#'
            onClick={(event) => {
              event.preventDefault();
              setCurrency(el.id);
              getCurrencyName(el.id);
            }}>{el.id}</a></li>
        })}
      </ul>
    </div>
  )
}

function CreateChart({currName, daysNo}) {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    let arr1 = [];
    let arr2 = [];

    // ${currName} ==> bitcoin
    fetch(`https://api.coingecko.com/api/v3/coins/${currName}/market_chart?vs_currency=usd&days=${daysNo}&interval=daily&x_cg_demo_api_key=CG-oc5fuhLwjXr58JdiLx7ZXmxQ`)
      .then((response) => response.json())
        .then((data) => {
          arr1 = data.prices.map((el) => {
            return el[0];
          })
          arr2 = data.prices.map((el) => {
            return el[1];
          })
          setData(arr1.map((el, index) => {
            // console.log(new Date(el).toLocaleString());
            return {
              // name: moment.unix(el / 1000).format("MM-DD-YY"),
              name: new Date(el).toLocaleString(),
              // name: el,
              value: arr2[index]
            }
          }))
        })
  }, [currName, daysNo]);


  // const data = [
  //   {value: 5, name: "Ana"},
  //   {value: 6, name:  moment.unix(1713312000000 / 1000).format("MM-DD-YY")}
  // ];

  return (
    <BarChart width={500} height={300} data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }} barSize={20}>
      <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
    </BarChart>
  )
}

function App() {
  const [currName, setCurrName] = useState('bitcoin');
  const [daysNo, setDaysNo] = useState(0);

  function getDaysNo(daysNo) {
    console.log(daysNo);
    setDaysNo(daysNo);
  }
  function getCurrencyName(currencyName) {
    console.log(currencyName);
    setCurrName(currencyName);
  }
  return (
    <div className="app">
      <h1 style={{padding:'3rem'}}>Cryptocurrency list</h1>
      <div className='lists'>
        <CurrencyList getCurrencyName={getCurrencyName}/>
        <Interval getDaysNo={getDaysNo}/>
        <CreateChart currName={currName} daysNo={daysNo}/>
      </div>
    </div>
  );
}

export default App;
