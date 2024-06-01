import React from "react";
import { useState } from 'react';

export default function Interval({getDaysNo}) {
  const [intervalName, setIntervalName] = useState(null);
  const intervalList = [7, 10, 30, 90];
      
  return(
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" 
        data-bs-toggle="dropdown">
        {intervalName ? intervalName : "Choose interval"}
      </button>
      <ul className="dropdown-menu">
        {intervalList.map((el, index) => {
          return <li key={index}><button className="dropdown-item"
            onClick={(event) => {
              event.preventDefault();
              setIntervalName(el + ' days');
              getDaysNo(el);
            }
          }>{el} days</button></li>
        })}
      </ul>
    </div>
  )
}
  