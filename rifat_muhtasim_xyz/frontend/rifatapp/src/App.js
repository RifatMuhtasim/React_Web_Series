import React from 'react';
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import { Urls} from './urls';
import { Layout } from './layout/base';
import { TransactionProvider} from './contract/TransactionsContext';


function App() {
  return (
    <div className="App">
      <TransactionProvider>
        <Router>
          <Layout>
            <Urls />
          </Layout>
        </Router>
      </TransactionProvider>
    </div>
  );
}

export default App;
