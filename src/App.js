import { MdTrendingFlat, MdCached } from "react-icons/md";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header>
        <div>random</div>
        <MdCached size="2.2em" />
      </header>
      <main>
        <section className="quote">
          <p>
            “The first rule of any technology used in a business is that automation applied to an efficient operation
            will magnify the efficiency. The second is that automation applied to an inefficient operation will magnify
            the inefficiency.”
          </p>
        </section>

        <section className="person">
          <div>
            <p className="name">Bill Gates</p>
            <p className="about">business</p>
          </div>
          <div>
            <MdTrendingFlat size="2.5em" color="#fff" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
