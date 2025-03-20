import { useState, useEffect } from "react";
import "./movie1.css";

function App() {
  const [choice, setChoice] = useState('add');
  const [watched, setWatched] = useState([]);
  const [towatch, setToWatch] = useState([]);
  
  function addWatched(title, year, poster) {
    const alreadyExists = watched.some(item => item.title === title);
    if (!alreadyExists) {
      setWatched(prevWatched => [...prevWatched, { title, year, poster }]);
    }
  }
  
  function addToWatch(title, year, poster) {
    const alreadyExists = towatch.some(item => item.title === title);
    if (!alreadyExists) {
      setToWatch(prevToWatch => [...prevToWatch, { title, year, poster }]);
    }
  }

  function MovieSearch() {
    const [data, setData] = useState(null);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
      const searchMovies = async () => {
        if (search.trim() !== "") {
          setIsLoading(true);
          try {
            const response = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=148f7e34`);
            const movieData = await response.json();
            setData(movieData);
          } catch (error) {
            console.error("Error fetching movies:", error);
          } finally {
            setIsLoading(false);
          }
        }
      };
      
      const timer = setTimeout(searchMovies, 500);
      return () => clearTimeout(timer);
    }, [search]);

    return (
      <div className="films">
        <input className="inputs" value={search} placeholder="Search for a movie..." onChange={(e) => setSearch(e.target.value)}
        />
        
        {isLoading && <div className="loading">Searching movies...</div>}
        
        <div className="fc">
          {search !== "" && data?.Response === "True" ? (
            data.Search.map((item, index) => (
              <MovieCard 
                key={`${item.imdbID}-${index}`}
                poster={item.Poster}
                title={item.Title}
                year={item.Year}
                onAddWatched={() => addWatched(item.Title, item.Year, item.Poster)}
                onAddToWatch={() => addToWatch(item.Title, item.Year, item.Poster)}
              />
            ))
          ) : (
            search !== "" && data?.Response === "False" ? (
              <div className="no-results">{data.Error}</div>
            ) : null
          )}
        </div>
      </div>
    );
  }

  function MovieCard({ poster, title, year, onAddWatched, onAddToWatch }) {
    return (
      <div className="film">
        <img src={poster} className="poster" alt={`${title} poster`} />
        <div className="yb">
          <h4>{title}</h4>
          <h5>{year}</h5>
          <div className="button-group">                     
            <button onClick={onAddWatched} className="watched">Watched</button>
            <button onClick={onAddToWatch} className="watched">Watch Later</button>
          </div>
        </div>
      </div>
    );
  }

  function WatchedList() {
    return (
      <>
        <h2 className="section-title">Movies You've Watched</h2>
        <div className="fc">
          {watched.length > 0 ? (
            watched.map((item, index) => (
              <div className="film" key={`watched-${index}`}>
                <img src={item.poster} className="poster" alt={`${item.title} poster`} />
                <div className="yb">
                  <h4>{item.title}</h4>
                  <h5>{item.year}</h5>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-list">No movies in your watched list yet</div>
          )}
        </div>
      </>
    );
  }

  function ToWatchList() {
    return (
      <>
        <h2 className="section-title">Movies To Watch</h2>
        <div className="fc">
          {towatch.length > 0 ? (
            towatch.map((item, index) => (
              <div className="film" key={`towatch-${index}`}>
                <img src={item.poster}  className="poster" alt={`${item.title} poster`} />
                <div className="yb">
                  <h4>{item.title}</h4>
                  <h5>{item.year}</h5>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-list">No movies in your watch list yet</div>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="all">
      <div className="navbar">
        <h1 className="logo">MOVIELAND</h1>
        <div className="watchedlist">
          <button 
            onClick={() => setChoice("towatch")} 
            className={`w ${choice === "towatch" ? "active" : ""}`}
          >
            WATCH LIST
          </button>
          <button 
            onClick={() => setChoice("watched")} 
            className={`w ${choice === "watched" ? "active" : ""}`}
          >
            WATCHED
          </button>
          <button 
            onClick={() => setChoice("add")} 
            className={`add ${choice === "add" ? "active-add" : ""}`}
          >
            ADD
          </button>
        </div>
      </div>
      <div className="container">
        {choice === "towatch" ? (
          <ToWatchList />
        ) : choice === "watched" ? (
          <WatchedList />
        ) : (
          <MovieSearch />
        )}
      </div>  
    </div>
  );
}

export default App;