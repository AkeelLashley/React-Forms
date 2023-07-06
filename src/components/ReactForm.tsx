// STEP 1: Install and import React Hook Form "npm i react-hook-form"
import { FieldValues, useForm } from "react-hook-form";

const ReactForm = () => {
  // STEP 2: Destructure useForm OLD CODE const form = useForm() console.log(form)
  const { register, handleSubmit } = useForm();
  //   Functions for programiltally controlling the form
  // console.log(register);

  
  //   STEP 3: create an obSubmit function to handle the form submission
  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age")}
          type="number"
          id="age"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ReactForm;
