import {withRouter} from 'next/router'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { Form } from "semantic-ui-react";
import React, { useState, useEffect } from 'react';
import Head from 'next/head'

const handleClickIndex = () => Router.push({
  pathname: '/'
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
  e.preventDefault()
  const name = e.target.name.value
  const email = e.target.email.value
  const phone = e.target.phone.value
  // Router.push({
  //   // pathname: '/second',
  //   query: {
  //     name: name,
  //     email: email,
  //     phone: phone
  //   }
  // })
  const formdata = {
    name: name,
    email: email,
    phone: phone
  }
  
  const options = {
    headers: {
        'Content-Type': 'application/json',
    }
  };
  
  axios.post('https://jsonplaceholder.typicode.com/posts', formdata, options)
   .then((res) => {
     console.log("RESPONSE ==== : ", res);
   })
   .catch((err) => {
     console.log("ERROR: ====", err);
   })


}

const Index = (props) => {
  let [data, setData] = useState([])
  const {router :{query : {name}}} = props
  const getdata = async () => await axios.get(`https://jsonplaceholder.typicode.com/users/?name=` + name)

  useEffect(() => {
    getdata().then(result => {
      let value = result.data.map(res => {
        return {
          name: res.name,
          email: res.email,
          phone: res.phone
        }
      })
      setData(value)
    })
  }, []);

  return (
    <div>
      <Head>
        <title>second</title>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
      </Head>
      <a onClick={() => handleClickIndex()} style={style}>Index Page</a>
      {/* <h1>สวัสดี{props.url.query.name}</h1>
      <h2>{props.url.query.email}</h2>
    <h3>{props.url.query.phone}</h3> */}
      {/* <div>
        test : {JSON.stringify(data)}
      </div> */}
      <div>
        {data.map((item,index) => (
          <div key={index}>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group>
                <Form.Input
                  placeholder='Name'
                  name='name'
                  value={item.name}
                  disabled
                />
                <Form.Input
                  placeholder='email'
                  name='email'
                  value={item.email}
                  disabled
                />
                <Form.Input
                  placeholder='Phone'
                  name='phone'
                  value={item.phone}
                  disabled
                />
                <Form.Button content='Submit' />
              </Form.Group>
            </Form>
          </div>
        ))}
      </div>

      <br />
      <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from CKEditor 5!</p>"
        onInit={editor => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
    </div>
  )
}

export default withRouter(Index)