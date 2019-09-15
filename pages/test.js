import React,{useState,useEffect} from 'react';
import Head from 'next/head'
import { Search } from "semantic-ui-react";

let state = {
  users: {
    isLoaded: false,
    data: []
  }
}

function App() {

  let [users,setusers] = useState([])
  let [search,setsearch] = useState({data: []})

  useEffect(()=>{

    if(!state.users.isLoaded){
      fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(res => {
        let data = res.map(res => {
          return {
            title: res.name
          }
        })

        setusers(data)
        state.users.data = data;
        state.users.isLoaded = true;
      })
    }
  });

  let handleChange = (e) => {
    let value = e.target.value;
    if(value)
      setsearch({data: users.filter(res => res.title.includes(value))})
    else
      setsearch({data: users})
  }

  return (
    
    <div>
        <Head>
    <title>test</title>
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
  </Head>
        <Search
          onSearchChange={handleChange}
          results={search.data}
        />
    </div>
  );
}

export default App;
