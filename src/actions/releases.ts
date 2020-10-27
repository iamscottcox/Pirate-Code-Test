import Axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

enum ActionTypes {
  FETCH_RELEASES = "FETCH_RELEASES",
}

export const fetchReleases = createAsyncThunk<
  API.Response<any> | null,
  {
    id: string;
    sort?: API.SortTypes;
    sortOrder?: API.SortOrders;
    pageNumber: number;
  }
>(
  ActionTypes.FETCH_RELEASES,
  async ({ id, sort = "year", sortOrder = "desc", pageNumber = 1 }) => {
    try {
      const response = await Axios.get<API.Response<API.Release[]>>(
        `https://api.discogs.com/artists/${id}/releases?sort=${sort}&sort_order=${sortOrder}&per_page=100&page=${pageNumber}`,
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
  }
);
