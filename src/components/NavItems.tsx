import React from "react";
import { Link } from "react-router-dom";

const NavItems: React.FC = () => {
  return (
    <>
      {/*Provide the appropriate navigational links in the "to" prop*/}
      <h4>
        Ready to Get Fit? <Link to="/fitness-form">Join Now</Link>
      </h4>
      <h4>
        Review and Update Fitness Insights{" "}
        <Link to="/view-form">Click here</Link>
      </h4>
    </>
  );
};

export default NavItems;
