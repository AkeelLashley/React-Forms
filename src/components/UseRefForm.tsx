import { FormEvent, useRef } from "react";
// STEP 1: install and Import bootstrap in the main.tsx
// STEP 2: add padding to the body in the index.css

// STEP 2: Create a Basic Form in a Functional Component


const UseRefForm = () => {
  // STEP 5: useState will cause a re-render each time the state is updated, whereas useRef will not cause a re-render. For large forms or complex applications, this can lead to performance improvements.
  const nameRef = useRef<HTMLInputElement>(null); // will be undefined initally if a value is not passed
  const ageRef = useRef<HTMLInputElement>(null);

  //   STEP 6: Create a person object to store the value to be sent to the server
  const person = { name: "", age: 0 };

  // STEP 4: Move the on submit functionality to a seperate handleSubmit function
  const handleSubmit = (event: FormEvent) => {
    // Stop the browser from refreshing
    event.preventDefault();
    // STEP 5 Continue----
    // current property is potentially null, so we need to check for that
    if (nameRef.current !== null) person.name = nameRef.current.value;
    if (ageRef.current !== null) person.age = parseInt(ageRef.current.value);
    console.log(person);
  };

  return (
    // STEP 3: Add an on onSubmit handler to the form
    // We need to give this function a prevent default to stop it from reloading the webpage when we submit the form
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input ref={nameRef} type="text" id="name" className="form-control" />
      </div>

      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input ref={ageRef} type="number" id="age" className="form-control" />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default UseRefForm;

