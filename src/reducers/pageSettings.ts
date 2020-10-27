import { createReducer } from "@reduxjs/toolkit";

// actions
import { fetchArtists } from "src/actions/artists";
import { setArtistsPagePaginationPage } from "src/actions/pageSettings";
import { fetchReleases } from "src/actions/releases";

export interface PageSettingsState {
  isLoading: boolean;
  artists: {
    currentPage: number;
    lastSearch: string;
    resultsCount?: number;
    resultsPerPage?: number;
    totalPages?: number;
  };
  releases: {
    totalPages?: number;
  };
}

export const pageSettingsInitialState: PageSettingsState = {
  isLoading: false,
  artists: {
    currentPage: 1,
    lastSearch: "",
  },
  releases: {},
};

export const PageSettingsReducer = createReducer<PageSettingsState>(
  pageSettingsInitialState,
  (builder) => {
    // setSearchPagePagination
    builder.addCase(setArtistsPagePaginationPage, (state, { payload }) => {
      state.artists.currentPage = payload;
    });
    // fetchArtists
    builder.addCase(fetchArtists.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchArtists.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.artists.resultsCount = payload?.pagination.items;
      state.artists.resultsPerPage = payload?.pagination.per_page;
      state.artists.totalPages = payload?.pagination.pages;
    });
    builder.addCase(fetchArtists.rejected, (state) => {
      state.isLoading = false;
      state.artists.resultsCount = undefined;
      state.artists.resultsPerPage = undefined;
      state.artists.totalPages = undefined;
    });
    // fetchReleases
    builder.addCase(fetchReleases.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchReleases.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.releases.totalPages = payload?.pagination.pages;
    });
    builder.addCase(fetchReleases.rejected, (state) => {
      state.isLoading = false;
      state.releases.totalPages = undefined;
    });
  }
);
