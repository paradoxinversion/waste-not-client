import './App.css';
import { Auth } from './layouts/auth';
import { Inventory } from './layouts/inventory';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavigationBar } from './components/navigation';
function App() {
  const [currentTab, setCurrentTab] = useState("inventory");
  const [inventoryItems, setInventoryItems] = useState([]);
  
  const getInventory = async () =>{

    const result = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/inventory`);
    setInventoryItems(result.data.inventoryItems)
  }
  useEffect(()=>{
    getInventory();
  }, [])

  const onTabSelect = (selectedTab) =>{
    setCurrentTab(selectedTab)
  }

  return (
    <div className="bg-blue-900 text-white">
      <header>
        <p className='text-3xl p-2 font-bold'>Waste Not</p>
      </header>
      <div className="bg-blue-400 min-h-screen p-2">
        {/* <NavigationBar onTabSelect={onTabSelect}/> */}
        {currentTab === "authentication" && <Auth />}
        {currentTab === "inventory" && <Inventory  inventory={inventoryItems} getInventory={getInventory} />}
      </div>
    </div>
  );
}

export default App;
