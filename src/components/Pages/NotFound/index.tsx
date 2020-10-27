import React from "react";
import { Link as BrowserLink } from "react-router-dom";

import { Box, Link, Typography } from "@material-ui/core";

export const NotFoundPage = () => {
  return (
    <Box>
      <Typography align="center" variant="h1">
        Page Not Found
      </Typography>
      <Typography align="center" variant="h6">
        <Link component={BrowserLink} to="/">
          Return Home
        </Link>
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
