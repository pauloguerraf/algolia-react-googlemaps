import React, { useEffect, useState } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-hooks-web";
import CustomGeoSearch from "./components/CustomGeoSearch";
import CustomHitsList from "./components/CustomHitsList";
import CustomSearchBox from "./components/CustomSearchBox";
import styled from "styled-components";

const searchClient = algoliasearch(
  "ACX2FTGRTB",
  "cf823e3650e3393ab788b85ea0df5616"
);

function Hit({ hit }) {
  return JSON.stringify(hit);
}

function App() {
  return (
    <>
      <h1>Algolia Search Interface</h1>
      <InstantSearch
        searchClient={searchClient}
        indexName="dev_react-hooks-zip-geosearch"
      >
        <CustomSearchBox placeholder="Enter a Zip Code" />
        <SearchPanel>
          <CustomHitsList />
          <CustomGeoSearch zoom={4}></CustomGeoSearch>
        </SearchPanel>
      </InstantSearch>
    </>
  );
}
const SearchPanel = styled.div`
  margin-top: 40px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export default App;
