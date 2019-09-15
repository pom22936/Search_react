import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

const fetchCat = () => axios.get('https://aws.random.cat/meow');

const initialState = {
  isFetching: false,
  cat: {},
  count: 0
}

const reducer = (state, { type, payload }) => {
  switch(type) {
    case 'FETCH_CAT_PENDING':
      return {
        ...state,
        isFetching: true
      }
    case 'FETCH_CAT_SUCCESS':
      return {
        ...state,
        isFetching: false,
        cat: payload
      }
    case 'COUNTER_CLICK':
      return {
        ...state,
        isFetching: false,
        count: payload
      }
    default:
      return state
  }
}

const App = () => {
  const [{ cat, isFetching, count }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'FETCH_CAT_PENDING'
    })

    fetchCat().then(response => {
      dispatch({
        type: 'FETCH_CAT_SUCCESS',
        payload: response.data
      })
    })

  }, []);

  if (isFetching) {
    return <p>Loading....</p>
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <p>
        You click {count} times
        </p>

        <button
          style={{
            padding: '8px 16px',
            borderRadius: 4,
            fontSize: '1.25rem'
          }}
          onClick={() => {
            dispatch({
              type: 'COUNTER_CLICK',
              payload: count + 1
            })
          }}
        >
          Click me
        </button>

        <p>
        {cat.file}
        </p> 
        <p>
          <img src={cat && cat.file} alt="Cat" width="256" />
        </p>

      </header>
    </div>
  );
}

export default App;