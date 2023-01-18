import React, { useEffect, useState } from 'react'
import './Lottery.scss';

function Lottery() {
    const [lottery, setLottery] = useState([
        {
            category:1,
            amount:1,
            originalWeight:5,
            resultWeight:0
        },{
            category:2,
            amount:1,
            originalWeight:5,
            resultWeight:0
        },{
            category:3,
            amount:2,
            originalWeight:30,
            resultWeight:0
        },{
            category:4,
            amount:3,
            originalWeight:20,
            resultWeight:0
        },{
            category:5,
            amount:6,
            originalWeight:40,
            resultWeight:0
        }]);
    const [totalWeight, setTotalWeight] = useState(0)
    const [result, setResult] = useState([])
    const [resultAmount, setResultAmount] = useState(0)
    const [add, setAdd] = useState(false)
    const [addItem, setAddItem] = useState({category:lottery[lottery.length-1].category+1})
    
    useEffect(() => {
        // 在載入頁面和每抽出一個獎項時,重新計算權重
        setTotalWeight((prev) => prev = lottery.reduce((sum, item) => sum + item.originalWeight, 0))
        setResultAmount((prev) => prev = lottery.reduce((sum, item) => sum + item.resultWeight, 0))
            
    },[lottery])

    const handleClick = () => {
        let randomNumber = Math.random() * totalWeight;
        for (const item of lottery) {
            randomNumber -= item.originalWeight;
            if (randomNumber <= 0) {
                if (item.amount > 0) {
                    // 該獎項數目大於0
                    item.amount--;
                    item.resultWeight++;
                    setLottery([...lottery]);
                    setResult([...result,item.category])
                    return item;
                } else {
                    return handleClick();
                }
            }
        }
        
    }

    const changeItemAmount = (category, amount) => {
        const updatedLottery = lottery.map( v => {
          if (v.category === category) {
            return { ...v, amount };
          }
          return v;
        });
        setLottery(updatedLottery);
      }

    const handleRemove = (category) => {
        const removeCategory = lottery.filter(v => v.category !== category)
        setLottery(removeCategory)
       
    }

    const addPrize = () => {
        setLottery([...lottery,{...addItem,originalWeight: 0,resultWeight:0}])
        setAdd(false)
    }

    
    const changeWeight = (category, weight) => {
        const newArr = lottery.map(v => {
            if(v.category === category.category){
                return { ...v, originalWeight: weight };
            }
            return v;
        })
        setLottery(newArr);
    }
  return (
        <div className='container'>
            <table>
                <thead>
                    <tr>
                        <th colSpan={3}>待抽出獎項</th>
                    </tr>
                    
                </thead>
                <tbody>
                <tr>
                    <td>獎項</td>
                    <td>個數</td>
                    <td>移除獎項</td>
                </tr>
                {lottery.map((v,index) => {
                    return(
                        <tr key={index}>
                            <td>{v.category}</td>
                            <td><input type='number' value={v.amount} onChange={(e)=>changeItemAmount(v.category, e.target.value)} /></td>
                            <td><button onClick={() => handleRemove(v.category)}>移除</button></td>
                        </tr>
                    )
                })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={2} onClick={()=>{
                            setAdd(true)
                            setAddItem({category:lottery[lottery.length-1].category+1,amount:0})
                        }}><button>增加獎項</button></td>
                        <td ><button  onClick={handleClick}>抽獎</button></td>
                    </tr>
                
                    {add && 
                    <tr>
                        <td><input type='number' value={addItem.category} onChange={(e) => {
                            setAddItem({...addItem,category: +e.target.value})
                        }}/></td>
                        <td><input type='number' defaultValue={0} onChange={(e) => {
                            setAddItem({...addItem,amount: +e.target.value})
                        }}/></td>
                        <td><button onClick={() =>{
                            setAdd(false)
                            setAddItem({})
                            }}>移除</button></td>
                        <td><button onClick={addPrize}>完成</button></td>
                    </tr>}
                    
                </tfoot>
            
            </table>
            <table className='result'>
                <thead>
                    <tr>  
                        <th colSpan={lottery.length}>已抽出獎項</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>
                            {result.length > 0 && result.join(",")}
                        </td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {lottery.map((v,i) => {
                            return(
                                <th key={i}>{v.category}號獎項</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>預期抽出機率</td>
                        {lottery.map((v,i) => {
                            return(
                                <td key={i}><input type='number' onChange={(e) => changeWeight(v, +e.target.value)} value={+v.originalWeight} />%</td>
                            )
                        })}
                    </tr>
                    <tr>
                        <td>實際抽出機率</td>
                        {lottery.map((v,i) => {
                            return(
                                <td key={i}>{Math.round(v.resultWeight*100/resultAmount)|| 0}%</td>
                            )
                        })}
                    </tr>
                </tbody>
            </table>
            
        </div>
        
    
  )
}

export default Lottery