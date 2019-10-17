import React from "react";

export const Field = ({ component: Component, ...props }) => (
  <div>
    <Component {...props} />
  </div>
);
