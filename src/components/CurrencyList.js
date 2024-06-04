import React from 'react-dom';
import { useEffect, useState } from 'react';

export default function CurrencyList({getCurrencyName, getCurrencyList}) {
    const [coincapList, setCoincapList] = useState([]);
    const [coingeckoList, setCoingeckoList] = useState([]);
    const [currency, setCurrency] = useState(null);
    const [currencyList, setCurrencyList] = useState([]);
        
    function getCurrency() {
        fetch('https://api.coincap.io/v2/assets')
            .then((response) => response.json())
                .then((data) => {
                    setCoincapList(data.data); // complete list of 100      
                }).catch((err) => {
                    console.log('not loading...', err);
                });  
        
        fetch('https://api.coingecko.com/api/v3/simple/supported_vs_currencies?x_cg_demo_api_key=CG-oc5fuhLwjXr58JdiLx7ZXmxQ')
            .then((response) => response.json())
                .then((data) => {
                    setCoingeckoList(data); // list of 62
                }).catch((err) => {
                    console.log('not loading...', err);
                });
    }

    function combinedList() {
        const transformList = coincapList.map(item => 
            ({...item, symbol: item.symbol.toLowerCase()}));
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
  
    useEffect(() => {
        if (coincapList.length > 0 && coingeckoList.length > 0) {
            const combined = combinedList();
            setCurrencyList(combined);
            getCurrencyList(combined);
        }
    }, [coincapList, coingeckoList])
        
    return(
        <div className="dropdown" style={{width:"30%"}}>
            <button className="btn btn-secondary dropdown-toggle" 
                data-bs-toggle="dropdown" 
                onClick={getCurrency}>
                {currency ? currency : "Choose cryptocurrency"}
            </button>
            <ul className="dropdown-menu">
                {currencyList.map((el, index) => {
                    return <li key={index}><button className="dropdown-item" 
                    onClick={(event) => {
                        event.preventDefault();
                        setCurrency(el);
                        getCurrencyName(el);
                    }
                    }>{el}</button></li>
                })}
            </ul>
        </div>
    )
}