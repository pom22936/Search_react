import Router from 'next/router'
import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from "semantic-ui-react";
//import 'semantic-ui-css/semantic.min.css';

const getusers = () => axios.get('https://jsonplaceholder.typicode.com/users');


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
  let [users, setusers] = useState({})

  useEffect(() => {
    getusers().then(response => {
      users = response.data
      console.log(users)
    })
  }, []);

  const resRender = ({ name, phone }) => (
    <span key="name">
      {name} is {phone} yo
    </span>
  );

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
    <Search
        fluid
        icon="search"
        placeholder="Search..."
        results={users}
        resultRenderer={resRender}
      />
  </div>
  )
}

export default Index
