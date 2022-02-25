import { useAppDispatch, useAppSelector } from './app/hooks'
import { decremented, incremented, amountAdded, reset } from './features/counter/counter-slice'
import { useFetchBreedsQuery } from './features/dogs/dogs-api-slice'
import logo from './logo.svg'
import './App.css'
import { useState } from 'react'


function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const [dogsToFetch, setDogsToFetch] = useState(10)
  const { data = [], isFetching } = useFetchBreedsQuery(dogsToFetch);

  const handleAdd = () => {
    dispatch(incremented())
  }

  const handleSubtract = () => {
    dispatch(decremented())
  }

  const handleReset = () => {
    dispatch(reset())
  }

  const [amountToAdd, setAmountToAdd] = useState(1)
  const handleAmount = () => {
    dispatch(amountAdded(amountToAdd))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>The number is: {count}</p>
        <p>
          <button onClick={handleAdd}>
            +1
          </button>
        </p>
        <p>
          <button onClick={handleSubtract}>
            -1
          </button>
        </p>
        <p>
          <input type="number" onChange={(e) => setAmountToAdd(Number(e.target.value))}/>
          <button onClick={handleAmount}>
            Add Amount {amountToAdd}
          </button>
        </p>
        <p>
          <button onClick={handleReset}>
            Reset Counter
          </button>
        </p>
        <div>
          <p>Number of dogs fetched: {data.length}</p>
          <p>
            <p>Select the amount of dogs to Fetch</p>
            <select value={dogsToFetch} onChange={(e) => setDogsToFetch(Number(e.target.value))}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>          
          </p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              {data.map((breed) => (
                  <tr key={breed.id}>
                    <td>{breed.name}</td>
                    <td>
                      <img src={breed.image.url} alt={breed.name} height={250}/>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
