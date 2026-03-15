
import { Suspense } from 'react'
import Countries from './componends/Countries/Countries'


const countriesPromise = fetch('https://openapi.programming-hero.com/api/all')
.then(res => res.json())

function App() {


  return (
    <>
    <Suspense
      fallback={
        <div className='loading-screen'>
          <p className='loading-chip'>Fetching countries...</p>
        </div>
      }
    >
      <Countries countriesPromise = {countriesPromise}/>
    </Suspense>
    </>
  )
}

export default App
