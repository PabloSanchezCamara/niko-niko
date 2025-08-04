import { useContext } from 'react';

import {
  Grid,
  SearchBar,
  SearchContext,
  SearchContextManager
} from '@giphy/react-components';

import { SearchBarStyled, WrapperStyled } from './GiphySearcher.styled';

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

const GiphySearcher = ({ selectedGif }) => (
  <SearchContextManager apiKey={API_KEY}>
    <GiphyComponents selectedGif={selectedGif} />
  </SearchContextManager>
);

const GiphyComponents = ({ selectedGif }) => {
  const { fetchGifs, searchKey } = useContext(SearchContext);
  return (
    <>
      <SearchBarStyled>
        <SearchBar />
      </SearchBarStyled>
      <WrapperStyled>
        <Grid
          key={searchKey}
          columns={2}
          width={300}
          fetchGifs={fetchGifs}
          onGifClick={(gif, event) => {
            event.preventDefault();
            selectedGif(gif);
          }}
        />
      </WrapperStyled>
    </>
  );
};

export default GiphySearcher;
