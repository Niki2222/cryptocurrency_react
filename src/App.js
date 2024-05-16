import React from 'react-dom';
import { useEffect, useState } from 'react';
import './App.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend } from 'recharts';
import moment from 'moment';

function Interval() {
  const [intervalName, setIntervalName] = useState(null);
  const intervalList = ['1 hour', '24 hours', '7 days', '30 days'];
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
          }}>{el}</a></li>
      })}
    </ul>
  </div>
  )
}

function CurrencyList() {
  const [list, setList] = useState([]);
  const [currency, setCurrency] = useState(null);
 

  function getCurrency() {
    fetch('https://api.coincap.io/v2/assets')
      .then((response) => response.json())
        .then((data) => {
          // console.log(data.data[1].id);
          setList(data.data);
        }).catch((err) => {
          console.log('not loading...', err);
    });

    // fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily&x_cg_demo_api_key=CG-oc5fuhLwjXr58JdiLx7ZXmxQ')
    //   .then((response) => response.json())
    //     .then((data) => {
    //       // console.log(data);
    //     })
    
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
            }}>{el.id}</a></li>
        })}
        {/* <li><a className="dropdown-item" href="#">Bitcoin 1</a></li>
        <li><a className="dropdown-item" href="#">Bitcoin 2</a></li>
        <li><a className="dropdown-item" href="#">Bitcoin 3</a></li>
        <li><a className="dropdown-item" href="#">Bitcoin 4</a></li> */}
      </ul>
      {/* <button onClick={getCurrency} className={"btn btn-primary"}>Get info</button> */}
    </div>
  )
}

function CreateChart() {
  const [values1, setValues] = useState([]);

  fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily&x_cg_demo_api_key=CG-oc5fuhLwjXr58JdiLx7ZXmxQ')
      .then((response) => response.json())
        .then((data) => {
          const objArray = data.prices.map((el, index) => {
            return {name: el[0], value: el[1]}
          })
          setValues(objArray);
          // console.log(objArray);
          // console.log(data)
  })

  const data = [
    {value: 63430.5714573684, name: moment.unix(1713225600000 / 1000).format("MM-DD-YY")},
    {value: 63720.501587480736, name:  moment.unix(1713312000000 / 1000).format("MM-DD-YY")},
    {value: 61328.89798860725, name: moment.unix(1713398400000 / 1000).format("MM-DD-YY")},
    {value: 63120, name: moment.unix(1713484800000 / 1000).format("MM-DD-YY")},
    {value: 63120, name: moment.unix(1713571200000 / 1000).format("MM-DD-YY")},
    {value: 60120, name: moment.unix(1713657600000 / 1000).format("MM-DD-YY")},
    {value: 63120, name: moment.unix(1713744000000 / 1000).format("MM-DD-YY")},
    {value: 63120, name: moment.unix(1713830400000 / 1000).format("MM-DD-YY")},
    {value: 63120, name: moment.unix(1713916800000 / 1000).format("MM-DD-YY")},
    {value: 63120, name: moment.unix(1714003200000 / 1000).format("MM-DD-YY")}
  ];

  const data1 = values1;

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
  return (
    <div className="app">
      <h1 style={{padding:'3rem'}}>Cryptocurrency list</h1>
      <div className='lists'>
        <CurrencyList />
        <Interval />
        <CreateChart />
      </div>
    </div>
  );
}

export default App;
