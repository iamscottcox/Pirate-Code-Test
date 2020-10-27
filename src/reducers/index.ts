import { combineReducers } from "@reduxjs/toolkit";
import { ArtistsReducer } from "src/reducers/artists";
import { PageSettingsReducer } from "src/reducers/pageSettings";
import { ReleasesReducer } from "src/reducers/releases";

export const rootReducer = combineReducers({
  artists: ArtistsReducer,
  pageSettings: PageSettingsReducer,
  releases: ReleasesReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
