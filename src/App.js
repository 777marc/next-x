import logo from './rocket.png';
import xlogo from './xlogo.png';
import './App.css';
import React, { useState, useEffect } from "react";
import { getLaunches } from './api/spacexAPI';

function App() {

  const [launchData, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLaunches().then( res => {
      setData(res.data);
      setIsLoading(false);
    }).catch( err => console.log(err));

  }, []);

  return (
    <div className="App">
      
      <header className="App-header">
        
        <div>
          <div>

            <div className="header-title">
              <img src={logo} className="App-logo" alt="logo" />
              <p>Space <img src={xlogo} alt="" />  Launches</p>
              {isLoading && <p>Wait I'm Loading launches for you</p>}
            </div>

            <div className="cards-container">

            {!isLoading && launchData.map(launch => {

              let formatedDate = Date(launch.launch_date_local);

              return  <div class="card">
                <div class="card-header">
                    <img src={launch.links.mission_patch} alt="" />
                </div>
                <div class="card-body">
                    <span class="tag tag-red">{launch.rocket.rocket_name}</span>
                    <h4>{ launch.mission_name }</h4>
                    <div className="desc">
                        {launch.details}
                    </div>
                    <div class="user">
                        <div class="user-info">
                            <h5>{launch.launch_site.site_name_long}</h5>
                            <small>{formatedDate}</small>
                        </div>
                    </div>
                  </div>
                </div>
              })}

              
            </div>

          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
