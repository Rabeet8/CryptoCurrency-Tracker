import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('') 
  useEffect(()=>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(res =>{
      setCoins(res.data)

    }).catch(error => console.log(error))
  }, []);
  const handleChange = e =>{
    setSearch(e.target.value)
  }
  const filteredCoins =coins.filter(coins =>
    coins.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="coin-app">
      <div className="coin-search">
          <h1 className="coin text">Search a Crypto Currency</h1>
          <form >
            <input type="text" placeholder = "Search" className='coin-input' onChange={handleChange} />

          </form>
        </div>
      {filteredCoins.map(coins =>{
        return(
          <Coin 
          key={coins.id} 
          name ={coins.name} 
          image = {coins.image}
          symbol = {coins.symbol}
          marketcap = {coins.market_cap}
          price = {coins.current_price}
          priceChange = {coins.price_change_percentage_24h}  
          volume = {coins.total_volume}
          />

        )
      })}
      </div>
  );
}

export default App;
