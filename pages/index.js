import Router from 'next/router'
import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from "semantic-ui-react";
//import 'semantic-ui-css/semantic.min.css';

const getusers = () => axios.get('https://jsonplaceholder.typicode.com/users');

let states = {
  users : {
    isLoaded: false,
    data: []
  }
}

const handleClicksecond = () => Router.push({
  pathname: '/second'
})


const style = {
  backgroundColor: '#4CAF50',
  border: 'none',
  color: 'white',
  padding: '10px 10px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
}

const handleSubmit = (e) => {
  e.preventDefault() // หยุดการทำงาน Submit
  const name = e.target.name.value
  const email = e.target.email.value
  const phone = e.target.phone.value
  Router.push({
    pathname: '/second',
    query: { 
      name: name,
      email:email,
      phone:phone
    }
  })
}


const Index = () => {
  let [users, setUsers] = useState([])
  let [search,setsearch] = useState({data: []})
  
  useEffect(() => {
    if(!states.users.isLoader){  
        getusers().then(res => {
            // setUsers(response.data.map(res => {
            //     return {
            //         title: res.name
            //     }
            // }))
            let data = res.data.map(res => {
              return {
                title: res.name
              }
            })

            setUsers(data)
            states.users.data = data;
            states.users.isLoaded = true;
            
        })
    }
  }, []);

  let handleChange = (e) => {
    let value = e.target.value;
    if(value)
      setsearch({data: users.filter(res => res.title.includes(value))})
    else
      setsearch({data: users})
  }

  // const resRender = () => (
  //   <div>
  //       {users.map(item => (
  //         <p>{item.title}</p>
  //       ))}
  //   </div>
  // );

  return (
  <div>
    <Head>
      <title>index</title>
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
    </Head>
    <a onClick={() => handleClicksecond()} style={style}>second Page</a>
    <h1>Sawatdee Next.js</h1>
    <form onSubmit={(e) => handleSubmit(e)}>
      <span>ชื่อ: </span>
      <input placeholder='Search...' type="text" name="name" /> <br/>
      <span>E-mail: </span>
      <input type="text" name="email"/><br/>
      <span>Phone: </span>
      <input type="text" name="phone"/><br/>
      <button type="submit">Go</button>
    </form>
    <br/>

    {/* <ul>
        {users.map(item => (
          <li>
            {item.title}
          </li>
        ))}
    </ul> */}
    
    <Search
        fluid
        icon="search"
        placeholder="Search..."
        onSearchChange={handleChange}
        results={search.data}
      />
  </div>
  )
}

export default Index
