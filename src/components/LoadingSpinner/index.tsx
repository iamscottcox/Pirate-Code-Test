import { CircularProgress, makeStyles } from "@material-ui/core";
import React, { FC } from "react";
import { connect } from "react-redux";
import { getIsLoading } from "src/getters/pageSettings";
import { AppState } from "src/reducers";

interface StateProps {
  isLoading: boolean;
}

type Props = StateProps;

const useStyles = makeStyles((theme) => ({
  styles: {
    position: "absolute",
    background: theme.palette.background.default,
    opacity: 0.8,
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
}));

export const LoadingSpinner: FC<Props> = ({ isLoading }) => {
  const { styles } = useStyles();

  return isLoading === true ? (
    <div className={styles}>
      <CircularProgress />
    </div>
  ) : null;
};

const mapStateToProps = (state: AppState): StateProps => ({
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(LoadingSpinner);
