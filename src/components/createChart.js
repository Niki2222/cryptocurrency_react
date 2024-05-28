import React from 'react-dom';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, 
    Tooltip, Legend } from 'recharts';

export default function CreateChart({currName, daysNo}) {
    const [data, setData] = useState([]);
   
    useEffect(() => {
        let arr1 = [];
        let arr2 = [];
  
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
                    return {
                        name: new Date(el).toLocaleString(),
                        value: arr2[index]
                    }
                }))
            }).catch((err) => {
                console.log('not loading...', err);
            })
          
    }, [currName, daysNo]);
    
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