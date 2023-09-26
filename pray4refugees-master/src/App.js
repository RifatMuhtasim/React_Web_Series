import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import { Layout} from './layout/base'
import { Main_urls } from './urls';
import { ProgressBar } from './components/circular_progress';


function App() {
  const [ loading, setLoading] = useState(true)
  useEffect(() => {
    let mounted = true

    const fetch_data = () => {
        if(mounted){
          setTimeout(() => {
            setLoading(false)
          }, 100)
        }
    }

    fetch_data()
    return function cleanup(){ mounted = false}
  }, [])

  
  return (
    <div className="App">
      { loading ? 
        <React.Fragment>
          <ProgressBar />
        </React.Fragment>  
      :

      <React.Fragment>
          <Router>
            <Layout>
              <Main_urls />
            </Layout>
          </Router>
      </React.Fragment>
      }
    </div>
  );
}
export default App;
