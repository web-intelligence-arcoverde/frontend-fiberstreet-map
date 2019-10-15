import { useCallback, useState } from "react";

// create a custom useFormHandler hook that returns initial values,
// a handleChange function to update the field values and a handleSubmit
// function to handle form submissions.
const useFormHandler = initialState => {
  const [values, setValues] = useState(initialState);

  // the handleChange function will first deconstruct e.target.name and
  // e.target.value, then in the setValues callback function, it'll
  // spread out any previous state before updating the changed field via
  // [name] (e.target.name) and updating it with "value" (e.target.value)
  const handleChange = useCallback(
    ({ target: { name, value } }) =>
      setValues(prevState => ({ ...prevState, error: "", [name]: value })),
    []
  );

  return {
    handleChange,
    values
  };
};

export default useFormHandler;
