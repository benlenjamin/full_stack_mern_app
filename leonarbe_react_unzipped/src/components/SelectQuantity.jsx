import '../App.css'
import React, { useState, useEffect } from 'react';
import { MdArrowForward} from 'react-icons/md';
import { MdArrowBack} from 'react-icons/md';

function Counter(){
    const [count, setCount] = useState(0);
    const increment = () => {
        count + 1 > 10 ? setCount(count) : setCount(count + 1);
    }
    const decrement = () => {
        count - 1 < 0 ? setCount(count) : setCount(count - 1);
    }

    return (
        <div className="SelectQuantity">
            <MdArrowBack onClick={decrement} />
            <span>{count}</span>
            <MdArrowForward onClick={increment} />
        </div>
    );
}

export default Counter;