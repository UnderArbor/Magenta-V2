import React from "react";
import LoadingIcon from "./LoadingIcon";
import SearchIcon from "../../../utils/icons/search.svg";
import SearchOptions from "./SearchOptions";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = ({
  searchCard,
  query,
  queryChange,
  results,
  setResults,
  searchRef,
  searchFocused,
}) => {
  const searchVariants = {
    hidden: {
      x: -15,
      opacity: 0,
    },
    kindaHidden: {
      x: 0,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        easing: "easeIn",
        delay: 0.8,
      },
    },
    kindaVisible: {
      x: 0,
      opacity: 0.7,
      transition: {
        duration: 0.5,
        easing: "easeIn",
        delay: 0.8,
      },
    },
    exit: {
      x: -30,
      transition: {
        duration: 0.3,
        easing: "easeOut",
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={searchRef}
        className={`searchArea ${searchFocused ? "focusedSearch" : null}`}
        variants={searchVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="searchContainer">
          <motion.input
            className="search searchBar"
            variants={searchVariants}
            initial="hidden"
            animate="kindaVisible"
            value={query.userQuery}
            style={{
              color:
                results.cards.length === 0 && query.userQuery !== ""
                  ? "red"
                  : null,
            }}
            onChange={(e) => {
              queryChange(e);
            }}
            onKeyDown={(e) => {
              switch (e.key) {
                case "Enter":
                  return searchCard(results.cards[results.resultIndex]);
                case "ArrowDown":
                  if (results.resultIndex + 1 < results.cards.length) {
                    setResults({
                      ...results,
                      resultIndex: results.resultIndex + 1,
                    });
                  }
                  return;
                case "ArrowUp":
                  if (results.resultIndex > 0) {
                    return setResults({
                      ...results,
                      resultIndex: results.resultIndex - 1,
                    });
                  }
                  return;
              }
            }}
          ></motion.input>
          <motion.input
            className="search ghostBar"
            variants={searchVariants}
            placeholder={
              query.userQuery === ""
                ? "Search Card Name"
                : results.cards.length === 0
                ? ""
                : query.userQuery.concat(
                    results.cards[results.resultIndex].slice(
                      query.userQuery.length
                    )
                  )
            }
            disabled
          ></motion.input>
        </div>
        {/* {query.loading ? (
          <LoadingIcon right={"9px"} top={"24px"} size={"10px"} />
        ) : ( */}
        <motion.img
          variants={searchVariants}
          onClick={() => searchCard(results.cards[results.resultIndex])}
          className="searchIcon"
          src={SearchIcon}
        />
        {/* )} */}
        {results.cards.length > 0 && (
          <SearchOptions
            results={results}
            setResults={setResults}
            searchCard={searchCard}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchBar;
