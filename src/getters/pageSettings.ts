import { AppState } from "src/reducers";

export const getIsLoading = (state: AppState) => state.pageSettings.isLoading;

// Artists Page
export const getArtistsPageCurrentPage = (state: AppState) =>
  state.pageSettings.artists.currentPage;
export const getArtistsPageTotalPages = (state: AppState) =>
  state.pageSettings.artists.totalPages;
export const getArtistsPageResultsCount = (state: AppState) =>
  state.pageSettings.artists.resultsCount;
export const getArtistsPageResultsPerPage = (state: AppState) =>
  state.pageSettings.artists.resultsPerPage;
export const getArtistsPageLastSearch = (state: AppState) =>
  state.pageSettings.artists.lastSearch;

// Releases Page

export const getReleasesPageTotalPages = (state: AppState) =>
  state.pageSettings.releases.totalPages;
