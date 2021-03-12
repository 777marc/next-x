import logo from './rocket.png';
import './App.css';
import TableHead from './components/table/TableHead';
import Row from './components/table/Row';
import React, { useState, useEffect, lazy } from "react";
import { getLaunches } from './api/spacexAPI';

function App() {

  const [launchData, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLaunches().then( res => {
      setData(res.data);
      console.log('ccc', res.data)
      setIsLoading(false);
    }).catch( err => console.log(err));

  }, []);

  return (
    <div className="App">
      
      <header className="App-header">
        
        <div className="container">
          <div>

            <div className="header-title">
              <img src={logo} className="App-logo" alt="logo" />
              <p>Upcoming Space X Launches</p>
              {isLoading && <p>Wait I'm Loading launches for you</p>}
            </div>
            
            <table>
              {!isLoading &&
                <TableHead />
              }
              <tbody>
              {!isLoading && launchData.map(launch => {
                return <Row data={ launch } />
              })}
              </tbody>
            </table>

          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
