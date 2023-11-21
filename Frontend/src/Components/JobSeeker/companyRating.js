import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const CompanyRating = (props) => {
  const ratingEval = () => {
    let temp = [];

    if (props.rating >= 0) {
      for (var i = 0; i < Math.floor(props.rating / 1); i++) {
        temp.push(
          <StarIcon style={{ fontSize: "small", color: props.color }} />
        );
      }

      if (props.rating % 1 === 0.5) {
        temp.push(
          <StarHalfIcon style={{ fontSize: "small", color: props.color }} />
        );
      }
      if (5 - props.rating > 0) {
        let end = Math.floor(5 - props.rating / 1);
        for (var j = 0; j < end; j++) {
          temp.push(
            <StarBorderIcon style={{ fontSize: "small", color: props.color }} />
          );
        }
      }
    } else {
      return null;
    }

    return temp.map((starIcon) => starIcon);
  };
  return <div style={{ marginRight: 10 }}>{ratingEval()}</div>;
};

export default CompanyRating;
