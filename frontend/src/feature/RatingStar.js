import React from "react";
const RatingStar = ({ data, update }) => {
  let sum = 0;
  let value = 0;

  /* average-rating function */

  if (data) {
    for (let i = 0; i < data.ratings.length; i++) {
      sum += data.ratings[i].rating;
    }

    if (sum >= 0.5) {
      let averageRating = sum / data.ratings.length;
      value = averageRating;
    }
  }

  return (
    <>
      {data && (
        <>
          <span className="star">
            <i
              className={
                value >= 1
                  ? "fas fa-star"
                  : value >= 0.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            ></i>
          </span>
          <span className="star">
            <i
              className={
                value >= 2
                  ? "fas fa-star"
                  : value >= 1.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            ></i>
          </span>
          <span className="star">
            <i
              className={
                value >= 3
                  ? "fas fa-star"
                  : value >= 2.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            ></i>
          </span>
          <span className="star">
            <i
              className={
                value >= 4
                  ? "fas fa-star"
                  : value >= 3.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            ></i>
          </span>
          <span className="star">
            <i
              className={
                value >= 5
                  ? "fas fa-star"
                  : value >= 4.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            ></i>
          </span>
           <p>({data.ratings.length})</p>
        </>
      )}
    </>
  );
};

export default RatingStar;
