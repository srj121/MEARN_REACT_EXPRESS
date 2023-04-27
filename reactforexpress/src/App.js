import './App.css';
import DeletByName from './components/DeleteByName';
import GetByAge from './components/GetByAge';
import Home from './components/Home';
import GetName from './components/getName';


function App() {
  return (
    <div className="App">
      <Home/>
      <GetName/>
      <GetByAge/>
      <DeletByName/>
      
    </div>
  );
}

export default App;
