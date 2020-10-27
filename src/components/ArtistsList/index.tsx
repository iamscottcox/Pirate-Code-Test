import React, { ChangeEvent, FC } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Link,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

interface OwnProps {
  artists: API.Artist[];
  currentPage?: number;
  resultsCount?: number;
  totalPages?: number;
  setCurrentPage: (e: ChangeEvent<unknown>, number: number) => void;
}

type Props = OwnProps;

const useStyles = makeStyles((theme) => ({
  styles: {
    "& .artists-list-item": {
      marginBottom: theme.spacing(1),
      "& .artists-list-item-link": {
        display: "flex",
        alignItems: "center",
        "& img": {
          width: "150px",
          marginRight: theme.spacing(2),
        },
        "& h6": {
          flex: "1 1 auto",
        },
      },
    },
  },
}));

export const ArtistsList: FC<Props> = ({
  artists,
  currentPage,
  resultsCount,
  totalPages,
  setCurrentPage,
}) => {
  const { styles } = useStyles();

  return artists.length > 0 ? (
    <List className={styles}>
      <Pagination
        page={currentPage}
        count={totalPages}
        onChange={setCurrentPage}
      />
      <Typography>{resultsCount} Results</Typography>
      {artists.map(({ title, cover_image, id }) => {
        return (
          <ListItem className="artists-list-item" key={id}>
            <Link
              className="artists-list-item-link"
              component={RouterLink}
              to={`/artists/${id}`}
            >
              <img
                className="artists-list-item-image"
                src={
                  cover_image.includes("spacer.gif")
                    ? "https://via.placeholder.com/150"
                    : cover_image
                }
                alt={title}
              />
              <Typography className="artists-list-item-title" variant="h6">
                {title}
              </Typography>
            </Link>
          </ListItem>
        );
      })}
      <Pagination
        page={currentPage}
        count={totalPages}
        onChange={setCurrentPage}
      />
    </List>
  ) : null;
};

export default ArtistsList;
