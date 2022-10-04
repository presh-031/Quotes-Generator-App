import { useEffect, useState } from "react";
import "./App.css";
import Quote from "./components/Quote";
import { MdTrendingFlat, MdCached } from "react-icons/md";
import axios from "axios";

const App = () => {
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
      })
      .catch((error) => {
        console.log(error);
      });
    // setQuotesEl("");
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
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //   const data = await res.json();

  //   // console.log(data.data);
  //   const allQuotes = data.data;
  //   setQuotesEl(
  //     allQuotes.map((quoteObj) => {
  //       return <Quote key={quoteObj._id} quote={quoteObj.quoteText} />;
  //     })
  //   );
  //   setQuote("");
  // }
  return (
    <div className="App">
      <header>
        <div className="random-btn" onClick={getQuote}>
          random <MdCached className="random-icon" size="2.2em" />
        </div>
      </header>
      <main>
        {quote && <Quote quote={quote} />}
        {/* <div>{quotesEl}</div> */}

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
