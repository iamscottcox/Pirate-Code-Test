import { createAction } from "@reduxjs/toolkit";
import { PageSettingsState } from "src/reducers/pageSettings";

enum ActionTypes {
  SET_ARTISTS_PAGE_CURRENT_PAGE = "SET_ARTISTS_PAGE_CURRENT_PAGE",
  SET_LAST_SEARCH = "SET_LAST_SEARCH",
}

export const setArtistsPagePaginationPage = createAction<
  PageSettingsState["artists"]["currentPage"]
>(ActionTypes.SET_ARTISTS_PAGE_CURRENT_PAGE);

export const setArtistsPageLastSearch = createAction<
  PageSettingsState["artists"]["lastSearch"]
>(ActionTypes.SET_LAST_SEARCH);
