import React, { useState } from 'react'

function Sum() {
    // 總和最後一項
    const [endNum, setEndNum] = useState(314159265358979);
    // 總和
    const [sum, setSum] = useState(-157079632679488);

    const handleChange = (e) => {
        e.preventDefault();
        setEndNum((prev) => prev = e.target.value);
        setSum((prev) =>  prev = Sum(e.target.value));
    }
    
    function Sum(num){
        // 1+2-3+4-5+6-.....+ / -  N
        num = Number(num);
        let total = 0;
        switch (true){
            case(num === 0):
                total = 0;
                break;
            case(num % 2 === 0):
                // if N is even number,like 6
                // 1+(2-3)+(4-5)+6
                // 1+(-1)+(-1)+6
                total = 1 + ((num/2) - 1) * (-1) + num;
                break;
            case(num % 2 !== 0):
                // if N is odd number,like 7
                // 1+2-3+4-5+6-7
                // 1+(2-3)+(4-5)+(6-7)
                // 1+(-1)+(-1)+(-1)
                total = 1 + ((num-1) / 2) * (-1);
                break;
            default:
                break;
        }
        return total
    }
  return (
    <>
        <h1>1+2-3+4-5+6-.....+ / -  N</h1>
        <h2>N = <input type='number' value={endNum} onChange={handleChange} /></h2>
        <h2>總和：{sum}</h2>
    </>
  )
}

export default Sum