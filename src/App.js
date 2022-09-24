import { useState } from "react";
import "./App.css";
import Quote from "./components/Quote";
import { MdTrendingFlat, MdCached } from "react-icons/md";

const App = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  async function getQuotes() {
    const res = await fetch("https://quote-garden.herokuapp.com/api/v3/quotes/random");
    const data = await res.json();

    const newQuote = data.data[0].quoteText;
    const newQuoteAuthor = data.data[0].quoteAuthor;
    const newQuoteGenre = data.data[0].quoteGenre;

    setQuote(newQuote);
    setAuthor(newQuoteAuthor);
    setGenre(newQuoteGenre);
  }

  return (
    <div className="App">
      <header>
        <div className="random-btn" onClick={getQuotes}>
          random <MdCached className="random-icon" size="2.2em" />
        </div>
      </header>
      <main>
        <Quote quote={quote} />

        <section className="person">
          <div>
            <p className="name">{author}</p>
            <p className="about">{genre}</p>
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
