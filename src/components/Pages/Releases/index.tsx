import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { AppState } from "src/reducers";
import { AppDispatch } from "src/store";
import { fetchReleases } from "src/actions/releases";
import { getReleases } from "src/getters/releases";
import { SortIndicator } from "src/components/SortIndicator";
import { Pagination } from "@material-ui/lab";
import { PageSettingsState } from "src/reducers/pageSettings";
import { getReleasesPageTotalPages } from "src/getters/pageSettings";

interface MatchParams {
  id: string;
}

interface StateProps {
  releases: API.Release[];
  totalPages: PageSettingsState["releases"]["totalPages"];
}

interface DispatchProps {
  fetchReleases: (
    id: string,
    sort: API.SortTypes,
    sortOrder: API.SortOrders,
    pageNumber: number
  ) => void;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

export const ReleasesPage: FC<Props> = ({
  releases,
  totalPages,
  fetchReleases,
  match,
}) => {
  const {
    params: { id },
  } = match;

  const [sort, setSort] = useState<API.SortTypes>("year");
  const [sortOrder, setSortOrder] = useState<API.SortOrders>("desc");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetchReleases(id, sort, sortOrder, currentPage);
  }, [fetchReleases, id, sort, sortOrder, currentPage]);

  const handleCellClick = (sortType: API.SortTypes) => (
    e: React.MouseEvent
  ) => {
    setCurrentPage(1);
    if (sort !== sortType) {
      setSortOrder("desc");
      setSort(sortType);
    } else if (sortOrder === "desc") {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    }
  };

  return releases.length > 0 ? (
    <Box>
      <Pagination
        page={currentPage}
        count={totalPages}
        onChange={(e, number) => setCurrentPage(number)}
      />
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell onClick={handleCellClick("title")}>
                Title{" "}
                <SortIndicator
                  sortType={"title"}
                  selectedSortType={sort}
                  sortOrder={sortOrder}
                />
              </TableCell>
              <TableCell onClick={handleCellClick("year")}>
                Year{" "}
                <SortIndicator
                  sortType={"year"}
                  selectedSortType={sort}
                  sortOrder={sortOrder}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {releases.map(({ title, id, thumb, year }) => (
              <TableRow key={id}>
                <TableCell>
                  <img src={thumb} alt={`${title} cover art`} />
                </TableCell>
                <TableCell>{title}</TableCell>
                <TableCell>{year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        page={currentPage}
        count={totalPages}
        onChange={(e, number) => setCurrentPage(number)}
      />
    </Box>
  ) : (
    <Typography variant="h6">There are no releases to display</Typography>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  totalPages: getReleasesPageTotalPages(state),
  releases: getReleases(state),
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  fetchReleases: (id, sort, sortOrder, pageNumber) => {
    dispatch(fetchReleases({ id, sort, sortOrder, pageNumber }));
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReleasesPage)
);
