import React from 'react-dom';
import { useEffect, useState } from 'react';
import './App.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend } from 'recharts';
// import moment from 'moment';

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
            setIntervalName(el + ' days');
            getDaysNo(el);
          }
        }>{el} days</a></li>
      })}
    </ul>
  </div>
  )
}

function CurrencyList({getCurrencyName, symbols}) {
  const [coincapList, setCoincapList] = useState([]);
  const [currency, setCurrency] = useState(null);
  const [coingeckoList, setCoingeckoList] = useState([]);

  function getCurrency() {
    fetch('https://api.coincap.io/v2/assets')
      .then((response) => response.json())
        .then((data) => {
          setCoincapList(data.data); // complete list of 100      
        }).catch((err) => {
          console.log('not loading...', err);
        }
      );  
      
      fetch('https://api.coingecko.com/api/v3/simple/supported_vs_currencies?x_cg_demo_api_key=CG-oc5fuhLwjXr58JdiLx7ZXmxQ')
      .then((response) => response.json())
        .then((data) => {
          setCoingeckoList(data); // list of 62
        }).catch((err) => {
          console.log('not loading...', err);
        })
  }
 
  function combinedList() {
    const transformList = coincapList.map(item => ({...item, symbol: item.symbol.toLowerCase()}));
    const combined = [];
    coingeckoList.map(elem => {
      return transformList.filter(item => {
        if (item.symbol === elem) {
          combined.push(item.id);
        }
      })
    })
    return combined;
  }

  const myList = combinedList();
  
  return(
    <div className="dropdown" style={{width:"30%"}}>
      <a className="btn btn-secondary dropdown-toggle" 
        href="#" role="button" data-bs-toggle="dropdown" 
        aria-expanded="false" 
        onClick={getCurrency}>
        {currency ? currency : "Choose cryptocurrency"}
      </a>
      <ul className="dropdown-menu">
        {myList.map((el, index) => {
          return <li key={index}><a className="dropdown-item" href='#'
            onClick={(event) => {
              event.preventDefault();
              setCurrency(el);
              getCurrencyName(el);
            }
          }>{el}</a></li>
        })}
      </ul>
    </div>
  )
}

function Percentage({symbols, daysNo}) {
  const [percentageList, setPercentageList] = useState([]);
  const [percListPairs, setPercListPairs] = useState([]);

  useEffect(() => {
    fetch('https://api.coincap.io/v2/assets')
    .then((response) => response.json())
      .then((data) => {
        setPercentageList(data.data);
        // console.log(data.data);
        // setPercListPairs(
        //   percentageList.map((el) => {
        //     return el.symbol
        //   })
        // )
      })
  }, [])
  
  // for (let i = 0; i < percentageList.length; ++i) {
  //   fetch(`https://api.coingecko.com/api/v3/coins/${percentageList[i]}/market_chart?vs_currency=usd&days=${daysNo}&interval=daily&x_cg_demo_api_key=CG-oc5fuhLwjXr58JdiLx7ZXmxQ`)
  //     .then((response) => response.json()
  //       .then((data) => {
  //         let total = ((data.prices[daysNo][1] - data.prices[0][1]) * 100 / data.prices[0][1]).toFixed(2);
  //         // console.log(total, i);
  //       })).catch((error) => {
  //         console.log(error);
  //       })
  // }
  
  return (
    <div>
      <h3>Most increased currencies:</h3>
      <ul>
        {percListPairs.map((el, index) => {
          return <li key={index}>{el.name}: {el.percentage}</li>
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

    fetch(`https://api.coingecko.com/api/v3/coins/${currName}/market_chart?vs_currency=usd&days=${daysNo}&interval=daily&x_cg_demo_api_key=CG-oc5fuhLwjXr58JdiLx7ZXmxQ`)
      .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          arr1 = data.prices.map((el) => {
            return el[0];
          })
          arr2 = data.prices.map((el) => {
            return el[1];
          })
          
          setData(arr1.map((el, index) => {
            return {
              // name: moment.unix(el / 1000).format("MM-DD-YY"),
              name: new Date(el).toLocaleString(),
              value: arr2[index]
            }
          }))
        }).catch((err) => {
          console.log('not loading...', err);
        })
        
  }, [currName, daysNo]);
  // console.log(data[data.length - 1].value - data[0].value * 100 / data[0].value);
  // console.log(data[data.length - 1].value - data[0].value);
  // console.log(data);

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
  const [symbols, setSymbols] = useState([]);

  // useEffect(() => {
  //   fetch('https://api.coingecko.com/api/v3/simple/supported_vs_currencies')
  //     .then((response) => response.json())
  //       .then((data) => {
  //         setSymbols(data);
  //       })
  // }, []);

  function getDaysNo(daysNo) {
    setDaysNo(daysNo);
  }
  function getCurrencyName(currencyName) {
    setCurrName(currencyName);
  }
  return (
    <div className="app">
      <h1 style={{padding:'3rem'}}>Cryptocurrency list</h1>
      <div className='lists'>
        <CurrencyList getCurrencyName={getCurrencyName} symbols={symbols}/>
        <Interval getDaysNo={getDaysNo}/>
        {daysNo > 1 && <CreateChart currName={currName} daysNo={daysNo}/>}
        {/* <CreateChart currName={currName} daysNo={daysNo}/> */}
        <Percentage  symbols={symbols} daysNo={daysNo}/>
      </div>
    </div>
  );
}

export default App;
