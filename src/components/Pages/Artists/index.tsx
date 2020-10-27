import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { connect } from "react-redux";

import { Box, TextField, Typography } from "@material-ui/core";

// actions
import { fetchArtists } from "src/actions/artists";
// components
import { ArtistsList } from "src/components/ArtistsList";
// getters
import { getArtists } from "src/getters/artists";
import {
  getArtistsPageCurrentPage,
  getArtistsPageLastSearch,
  getArtistsPageResultsCount,
  getArtistsPageTotalPages,
} from "src/getters/pageSettings";
// reducers
import { AppState } from "src/reducers";
import { PageSettingsState } from "src/reducers/pageSettings";
// store
import { AppDispatch } from "src/store";
import {
  setArtistsPageLastSearch,
  setArtistsPagePaginationPage,
} from "src/actions/pageSettings";

interface StateProps {
  artists: API.Artist[];
  currentPage: PageSettingsState["artists"]["currentPage"];
  lastSearch: PageSettingsState["artists"]["lastSearch"];
  resultsCount: PageSettingsState["artists"]["resultsCount"];
  totalPages: PageSettingsState["artists"]["totalPages"];
}

interface DispatchProps {
  fetchArtists: (searchText: string, pageNumber?: number) => void;
  setCurrentPage: (e: ChangeEvent<unknown>, number: number) => void;
  setLastSearch: (searchText: string) => void;
}

type Props = StateProps & DispatchProps;

export const ArtistsPage: FC<Props> = ({
  artists,
  currentPage,
  lastSearch,
  resultsCount,
  totalPages,
  fetchArtists,
  setCurrentPage,
  setLastSearch,
}) => {
  const [searchText, setSearchText] = useState(lastSearch);

  useEffect(() => {
    if (searchText) {
      fetchArtists(searchText, currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, fetchArtists]);

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLastSearch(searchText);

    if (lastSearch !== searchText) {
      setCurrentPage({} as ChangeEvent, 1);
      fetchArtists(searchText);
    } else {
      fetchArtists(searchText, currentPage);
    }
  };

  return (
    <div className="artists-page">
      <header className="artists-page-header">
        <Typography variant="h1" align="center">
          Artist Search
        </Typography>
      </header>
      <Box width="100%" maxWidth="1080px" margin="0 auto">
        <form onSubmit={onSubmit}>
          <TextField
            label="Artist Search"
            fullWidth
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form>
        <ArtistsList
          artists={artists}
          resultsCount={resultsCount}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </div>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  artists: getArtists(state),
  currentPage: getArtistsPageCurrentPage(state),
  lastSearch: getArtistsPageLastSearch(state),
  resultsCount: getArtistsPageResultsCount(state),
  totalPages: getArtistsPageTotalPages(state),
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  fetchArtists: (searchText, pageNumber) => {
    dispatch(fetchArtists({ searchText, pageNumber }));
  },
  setCurrentPage: (e, number) => {
    dispatch(setArtistsPagePaginationPage(number));
  },
  setLastSearch: (searchText) => {
    dispatch(setArtistsPageLastSearch(searchText));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsPage);
