import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import BookList from './BookList';
import CategoryFilter from './CategoryFilter';
import WelcomeBand from './WelcomeBand';

function App() {

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const [count, setCount] = useState(0);

  return (
    <>
    <div className='container mt-4' >
      <div className='row bg-primary text-white'>
        <WelcomeBand />
      </div>
      <div className='row'>
        <div className='col-md-3'>
          <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
        </div>
        <div className='col-md-9'>
          <BookList selectedCategories={selectedCategories}/>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
