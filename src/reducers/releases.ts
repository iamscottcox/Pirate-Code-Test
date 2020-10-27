import { createReducer } from "@reduxjs/toolkit";
import { fetchReleases } from "src/actions/releases";

export type ReleasesState = API.Release[];

const initialState: ReleasesState = [];

export const ReleasesReducer = createReducer<ReleasesState>(
  initialState,
  (builder) => {
    builder.addCase(
      fetchReleases.fulfilled,
      (state, { payload }) => payload?.releases || []
    );
  }
);
