import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import CartList from './Component/CartList';


import './App.css';

function App() {
  return (
    <div className="App container" style={{background: '#f9f6f6'}}>
      <section>
        <CartList />
      </section>
    </div>

  );
}

export default App;
