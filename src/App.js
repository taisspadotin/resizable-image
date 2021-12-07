import './App.css';
import Element from "./Element/";

function App() {
  return (
    <div className="App" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15px'}}>
      <Element>
        <div style={{background: 'red', padding: '15px'}}>
          teste
        </div>
      </Element>
    </div>
  );
}

export default App;
