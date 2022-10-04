import { useEffect, useState } from "react";
import "./App.css";
import Quote from "./components/Quote";
import { MdTrendingFlat, MdCached } from "react-icons/md";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import axios from "axios";
import "./ColorMode.css";

const App = () => {
  // Colormode functionality
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  // App functionality
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState(null);
  const [genre, setGenre] = useState(null);
  const [quotesEl, setQuotesEl] = useState(null);

  function getQuote() {
    axios
      .get("https://quote-garden.herokuapp.com/api/v3/quotes/random")
      .then((response) => {
        const data = response.data.data[0];
        setQuote(data.quoteText);
        setAuthor(data.quoteAuthor);
        setGenre(data.quoteGenre);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getQuote();
  }, []);

  function getAllQuotes() {
    axios
      .get(`https://quote-garden.herokuapp.com/api/v3/quotes?author=${author}`)
      .then((response) => {
        const data = response.data.data;
        console.log(data);
        setQuotesEl(
          data.map((quoteObj) => {
            return <Quote key={quoteObj._id} quote={quoteObj.quoteText} />;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className={`App ${theme}`}>
      <header>
        <div className="random-btn" onClick={getQuote}>
          random <MdCached className="random-icon" size="2.2em" />
        </div>
        <div className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? <BsFillSunFill /> : <BsFillMoonFill />}
        </div>
      </header>
      <main>
        {quote && <Quote quote={quote} />}
        {quote ? null : (
          <div className="allquotes">
            <p className="author">{author}</p>
            {quotesEl}
          </div>
        )}

        {quote && (
          <section
            className="person"
            onClick={() => {
              setQuote(null);
              getAllQuotes();
            }}
          >
            <div>
              <p className="name">{author}</p>
              <p className="about">{genre}</p>
            </div>
            <div>
              <MdTrendingFlat size="2.5em" color="#fff" />
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;
