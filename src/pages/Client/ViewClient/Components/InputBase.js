import React from "react";

const onHandleChange = onChange => event => {
  const { value } = event.target;
  onChange(value);
};

export const Field = ({ component: Component, ...props }) => (
  <div>
    <Component {...props} />
  </div>
);
