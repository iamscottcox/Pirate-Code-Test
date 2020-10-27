import Axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

enum ActionTypes {
  FETCH_ARTISTS = "FETCH_ARTISTS",
}

export const fetchArtists = createAsyncThunk<
  API.Response<API.Artist[]> | null,
  {
    searchText: string;
    pageNumber?: number;
  }
>(ActionTypes.FETCH_ARTISTS, async ({ searchText = "", pageNumber = 1 }) => {
  try {
    const response = await Axios.get<API.Response<API.Artist[]>>(
      `https://api.discogs.com/database/search?q=${searchText}&type=artist&per_page=100&page=${pageNumber}`,
      {
        headers: {
          Authorization: `Discogs token=jFjPgGkhDPUtSJbONaeKkMsPsmdbcbfEORRVAVlj`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return null;
  }
});
