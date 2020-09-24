import React,{ useReducer } from 'react';
import './styles/App.scss';
import Buttons from './components/DoggieButtons';
import DoggieContext from './context/doggieContext'
import DoggieReducer from './reducer/doggieReducer'
import Image from './components/Image'
import ModalReducer from './reducer/modalReducer';

const App = function App() {
  const [doggies, dispatchDoggie] = useReducer(DoggieReducer,
    {
    singleDoggie: "",
    doggieList: [],
    imgList: [],
    error: {},
    singleImg: "",
    isLoading: true
  })

  const [modal,dispatchModal] = useReducer(ModalReducer,{
    modalControl: false
  })
  return (
    <DoggieContext.Provider className="App" value={{doggieState: {doggies,dispatchDoggie}, modalState: {modal,dispatchModal}}}>
        <h1 className='header'>Doggie App!</h1>
        <Image />
        <Buttons />
    </DoggieContext.Provider>
  );
}

export default App;
