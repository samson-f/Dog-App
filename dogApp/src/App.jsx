import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import {Layout} from './components/Layout';
import { BreedImgs, FavorateImgs, RandomImgs } from './components/ImageCollections';
import Child from './components/Child';
import { DogsContextProvider } from './components/Context';

function App() {

  return <DogsContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='' element={<RandomImgs/>}/>
          <Route path='/favorites' element={<><FavorateImgs/></>}/>
          <Route path='/breeds/:breed?' element={<BreedImgs/>}/>
        </Route>
        <Route path='/child' element={<Child/>}/>
      </Routes>
    </BrowserRouter>
  </DogsContextProvider>
}

export default App
