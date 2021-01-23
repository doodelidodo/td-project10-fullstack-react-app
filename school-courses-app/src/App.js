import logo from './logo.svg';
import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios';


function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios(`http://localhost:5000/api/courses`)
        .then(response => setData(response.data.courses))
        .catch(error => console.log('Error fetching and parsing data', error))
        .finally(() => setIsLoading(false));
  }, []);
  console.log(data);
  return (

    <div className="App">

    </div>
  );
}

export default App;
