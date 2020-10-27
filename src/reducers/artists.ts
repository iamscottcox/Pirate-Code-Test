import { createReducer } from "@reduxjs/toolkit";
import { fetchArtists } from "src/actions/artists";

export type ArtistsState = API.Artist[];

export const initialArtistsState: ArtistsState = [];

export const ArtistsReducer = createReducer<ArtistsState>(
  initialArtistsState,
  (builder) => {
    builder.addCase(
      fetchArtists.fulfilled,
      (state, { payload }) => payload?.results || []
    );
  }
);

export default ArtistsReducer;
