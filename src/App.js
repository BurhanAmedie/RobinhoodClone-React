import logo from './logo.svg';
import './App.css';
import Header from "./Header"
import NewsFeed from "./NewsFeed"
import Stats from "./Stats"

function App() {
  return (
    <div className="app">
      <div className="app__header">
        {/* header sidebar */}
        <Header />
      </div>
      <div className="app__body">
        <div className="app__container">
          {/* graph and current ammount */}
          <NewsFeed />
          {/* stock price and shares */}
          <Stats />
        </div>
      </div>
    </div>
  );
}

export default App;
