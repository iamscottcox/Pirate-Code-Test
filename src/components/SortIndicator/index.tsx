import React, { FC } from "react";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

interface OwnProps {
  sortType: API.SortTypes;
  selectedSortType: API.SortTypes;
  sortOrder: API.SortOrders;
}

type Props = OwnProps;

export const SortIndicator: FC<Props> = ({
  sortType,
  selectedSortType,
  sortOrder,
}) => {
  if (sortType === selectedSortType) {
    if (sortOrder === "asc") {
      return <ArrowDropUpIcon />;
    } else if (sortOrder === "desc") {
      return <ArrowDropDownIcon />;
    }
  }

  return null;
};
