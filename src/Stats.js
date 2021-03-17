import React, { useState, useEffect } from "react";
import "./Stats.css";
import StatsRow from "./StatsRow";
import axios from "axios";
import { db } from "./firebase";

const BASE_URL = "https://finnhub.io/api/v1/quote";
const KEY= "sandbox_c0gvfrf48v6ttm1ssgi0";

function Stats() {
    const [stocksData, setStocksData] = useState([]);
    const [myStocks, setMyStocks] = useState([]);
    
    const getMyStocks = () => {
      db
      .collection('mystocks')
      .onSnapshot(snapshot => {
          let promises = [];
          let tempData = []
          snapshot.docs.map((doc) => {
            promises.push(getStocksData(doc.data().ticker)
            .then(res => {
              tempData.push({
                id: doc.id,
                data: doc.data(),
                info: res.data
              })
            })
          )})
          Promise.all(promises).then(()=>{
            setMyStocks(tempData);
          })
      })
    }
  
    const getStocksData = (stock) => {
        return axios
          .get(`${BASE_URL}?symbol=${stock}&token=${KEY}`)
          .catch((error) => {
            console.error("Error", error.message);
          });
      };
      
      useEffect(() => {
        let tempStockData = [];
        const stocksList = ["AAPL", "MSFT", "TSLA", "FB", "BABA", "UBER", "DIS", "SBUX"];
        getMyStocks();
        let promises = [];
        stocksList.map((stock) => {
          promises.push(
            getStocksData(stock)
            .then((res) => {
            tempStockData.push({
                name: stock,
                ...res.data
              });
            })
          )
        });
        Promise.all(promises).then(()=>{
            setStocksData(tempStockData);
          })
        }, []);
     
    return (
        <div className="stats">
            <div className="stats__container">
                <div className="stats__header">
                    <p> Stocks</p>
                </div>
                <div className="stats__content">
                    <div className="stats__rows">
                    {myStocks.map((stock) => (
                        <StatsRow
                          key={stock.data.ticker}
                          name={stock.data.ticker}
                          openPrice={stock.info.o}
                          shares={stock.data.shares}
                          price={stock.info.c}
                        />
                      ))}
                    
                    </div>
                </div>
                <div className="stats__header stats__lists">
                    <p> List</p>
                </div>
                <div className="stats__content">
                    <div className="stats__rows">
                    {stocksData.map((stock) => (
                            <StatsRow 
                                key={stock.name}
                                name={stock.name}
                                price={stock.c}
                                openPrice={stock.o}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
        )
}

export default Stats
