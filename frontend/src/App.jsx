import './App.css'
import AppBar from './components/AppBar';

function App() {

  return (
    <>
      <AppBar />
      <div className="mt-8">
        <h1 className='text-3xl font-bold underline backdrop-blur-2xl'>Wassim</h1>
        <button className="btn btn-primary">Click here</button>
      </div>
    </>
  )
}

export default App
