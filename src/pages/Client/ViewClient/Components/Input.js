import React from "react";

export const InputField = ({ value, name, type }) => (
  <div>
    <input value={value} name={name} type={type} />
  </div>
);
