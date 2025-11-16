import './App.css'
import AppBar from './components/AppBar';
import HomeContent from './components/HomeContent';
import AboutLibrarySection from './components/AboutLibrarySection';
import BooksContainer from './components/BooksContainer';

function App() {

  return (
    <>
      <AppBar />
      <HomeContent />
      <AboutLibrarySection />
      <BooksContainer />
    </>
  )
}

export default App
