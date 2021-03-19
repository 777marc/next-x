import logo from './rocket.png';
import xlogo from './xlogo.png';
import './App.css';
import React, { useState, useEffect } from "react";
import { getLaunches } from './api/spacexAPI';

function App() {

  const [launchData, setData] = useState([]);
  const [filteresLaunchData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    getLaunchData();
  }, []);
  
  let applyFilter = debounce(function(e) {

    if(e.target.value === "") {
      setFilteredData(launchData);
      return;
    }

    let filteredResults = launchData.filter(launch => {
      let missionName = launch.mission_name.toLowerCase();
   
      return missionName.includes(e.target.value.toLowerCase());
    });

    setFilteredData(filteredResults);

  });

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };


  function getLaunchData(filter = null) {
    getLaunches().then( res => {
      res.data.sort((a, b) => {
        return b.flight_number - a.flight_number;
      });
      setFilteredData(res.data)
      setData(res.data);
      setIsLoading(false);
    }).catch( err => console.log(err));
  }

  return (
    <div className="App">
      
      <header className="App-header">
        
        <div>
          <div>

            <div className="header-title">
              <img src={logo} className="App-logo" alt="logo" />
              <p>Space <img src={xlogo} alt="" />  Launches</p>
              {isLoading && <p>Wait I'm Loading launches for you</p>}
              <input id="search-input" onChange={applyFilter} placeholder="filter results" type="text" className="search" />
            </div>
            
            <div className="cards-container">

            {!isLoading && filteresLaunchData.map((launch, index) => {

              let mills = Date.parse(launch.launch_date_local);
              let dt = new Date(mills);
              
              return  <div className="card" key={index}>
                <div className="card-header">
                    <img src={launch.links.mission_patch} alt="" />
                </div>
                <div className="card-body">
                    <span className="tag tag-red">{launch.rocket.rocket_name}</span>
                    <h4>{ launch.mission_name }</h4>
                    <div className="desc">
                        {launch.details}
                    </div>
                    <div className="user">
                        <div className="user-info">
                            <h5>{launch.launch_site.site_name_long}</h5>
                            <small>{dt.toString()}</small>
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
