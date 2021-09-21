import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToggleMode from "./ToggleMode";
import Logo from "./icons/Logo";
import Spinner from "./components/Spinner";
import Search from "./icons/Search";
import NominationItem from "./components/NominationItem";
import MovieItem from "./components/Movieitem";
import { Movie } from './types/Movie';

import "./styles/style.css";

enum MainAreaState {
  FRESH = 'FRESH',
  TOO_MANY_RESULT = 'TOO_MANY_RESULT',
  NO_RESULT_FOUND = 'NO_RESULT_FOUND',
  RESULTS_FOUND = 'RESULTS_FOUND',
  ERROR_FETCHING = 'ERROR_FETCHING'
}

function Message({ message, subMessage, image = "https://assets.website-files.com/5bff8886c3964a992e90d465/5c00fa0eb8b0816e1a10dfe6_hero-2.svg" }: any) {
  return (
    <div className='h-full flex items-center justify-center flex flex-col text-black dark:text-white'>
      <img className='h-56' alt="x" src={image} />
      <div className='text-center'>
        <h1 className='text-2xl font-bold'>{message}</h1>
        <p className='font-light'>{subMessage}</p>
      </div>
    </div>
  )
}

function App() {
  const [searchTerm, setSearchterm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Movie[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [showNominations, setShowNominations] = useState<boolean>(true);
  const [nominated, setNominated] = useState<Movie[]>([]);
  const [gridSize, setGridSize] = useState(3)
  const [mainAreasState, setMainAreaState] = useState<MainAreaState>(MainAreaState.FRESH)

  // Sync local nomination list
  useEffect(() => {
    const previousLocalstorageValue: [] =
      JSON.parse(localStorage.getItem("Shopy-Nominated-Items") || '[]');

    setNominated(previousLocalstorageValue || []);
  }, []);

  const searchHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchterm(e.target.value);

    setIsFetching(true);

    try {
      const result = await fetch(
        `https://www.omdbapi.com/?i=tt3896198&apikey=b84cbdb6&s=${e.target.value}`
      );
      const { Response, Search, Error } = await result.json();

      console.log({ Response, Search, Error })

      setIsFetching(false);

      if (Response === "False" && Error === "Too many results.") {
        setMainAreaState(MainAreaState.TOO_MANY_RESULT)
        setSearchResult([]);
      }

      if (Response === "True" && Search === undefined && Error === undefined) {
        setMainAreaState(MainAreaState.NO_RESULT_FOUND)
        setSearchResult([]);
      }

      if (Response === "False" && Error === "Movie not found!") {
        setMainAreaState(MainAreaState.NO_RESULT_FOUND)
        setSearchResult([]);
      }

      if (Response === "True" && Array.isArray(Search)) {
        setMainAreaState(MainAreaState.RESULTS_FOUND)
        setSearchResult(Search);
      }
    } catch (e) {
      setIsFetching(false)
      setMainAreaState(MainAreaState.ERROR_FETCHING)
    }
  };

  const nominate = (movie: Movie) => {
    let previousLocalstorageValue: ([] | Movie[]) =
      JSON.parse(localStorage.getItem("Shopy-Nominated-Items") || '[]');

    localStorage.setItem(
      "Shopy-Nominated-Items",
      JSON.stringify([movie, ...previousLocalstorageValue])
    );

    setNominated((prev) => ([movie, ...prev]));
  };

  const unNominate = (imdbID: string) => {
    const previousNominatedMovies: ([] | Movie[]) =
      JSON.parse(localStorage.getItem("Shopy-Nominated-Items") || '[]');

    const newNominatedMovies = previousNominatedMovies.filter(
      (item) => item.imdbID !== imdbID
    );

    setNominated(newNominatedMovies);

    localStorage.setItem(
      "Shopy-Nominated-Items",
      JSON.stringify(newNominatedMovies)
    );
  };

  return (
    <div className="dark:bg-black min-h-screen flex flex-col">
      <div className="sticky top-0 z-10">
        <header
          className="p-2 px-2 sm:px-10 "
          style={{ backgroundColor: `#002e25` }}
        >
          <div className="flex items-center justify-between w-full">
            <Logo />
            <div className="bg-white dark:bg-gray-900 rounded shadow overflow-hidden flex items-center w-4/5 sm:w-1/3">
              <div className="p-2">
                <Search />
              </div>
              <input
                value={searchTerm}
                onChange={searchHandler}
                className="p-2 flex-1 text-black dark:text-white"
                placeholder="Search Movie"
                style={{ backgroundColor: "inherit" }}
              />
              {isFetching && <Spinner />}
            </div>
            <ToggleMode />
          </div>
        </header>
        <div className="flex items-center px-2 sm:px-12 py-3 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800" >
          {
            searchResult.length > 0 && (
              <span className="text-black dark:text-white hidden sm:block">
                Showing search result for
                <span className="italic font-bold">{` "${searchTerm}"`}</span>
              </span>
            )
          }
          < button
            onClick={() => {
              setShowNominations((prevState) => {
                if (!prevState) setGridSize(3);
                return !prevState;
              });
            }}
            className="shadow rounded p-1 px-2 pr-6 bg-green-200 text-green-800 ml-auto relative"
          >
            {`<- Nominated Movies`}
            <span
              style={{
                top: "-9px",
                right: "-9px",
                width: "25px",
                height: "25px",
                lineHeight: "1",
              }}
              className="rounded-full p-1 bg-green-800 absolute text-white"
            >
              {nominated.length}
            </span>
          </button>
        </div>
      </div>
      <div className="flex p-5 sm:px-12 sm:space-x-10 flex-1">
        <div className='flex-1 pb-10 h-full'>
          {mainAreasState === MainAreaState.RESULTS_FOUND && <div
            className={`w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${gridSize} gap-6`}
          >
            {searchResult.map((data) => (
              <MovieItem
                data={data}
                nominate={nominate}
                isNominated={nominated
                  .map((movie) => movie.imdbID)
                  .includes(data.imdbID)}
              />
            ))}
          </div>}

          {mainAreasState === MainAreaState.FRESH && <Message
            message={'Your Search result will show here'}
            subMessage={'You can start by searching for "Shop"'}
          />
          }

          {mainAreasState === MainAreaState.ERROR_FETCHING &&
            <Message message={"Be more specific with your search"}
              subMessage={'You can start by searching for "Shop"'} />
          }

          {(mainAreasState === MainAreaState.NO_RESULT_FOUND || mainAreasState === MainAreaState.TOO_MANY_RESULT) && <Message
            message={"Can't find anything"}
            subMessage={"No movie matched your Search"} />
          }
        </div>

        <AnimatePresence onExitComplete={() => setGridSize(4)}>
          {showNominations && (
            <motion.div
              className="border rounded p-5 h-full max-h-screen space-y-3 overflow-scroll absolute w-full lg:w-1/3 sm:static"
              style={{ backgroundColor: "#eee3c7", maxHeight: "100vh" }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
            >
              {nominated.map((data) => (
                <motion.div
                  key={data.Poster}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { opacity: 1, x: 0 },
                    hidden: { opacity: 0, x: -100 },
                  }}
                >
                  <NominationItem data={data} unNominate={unNominate} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div >
  );
}

export default App;
