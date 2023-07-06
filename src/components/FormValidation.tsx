import { FieldValues, useForm } from "react-hook-form";

// STEP 3 Define the struture of the Form
interface FormData {
  name: string;
  age: number;
}

const FormValidation = () => {
  // destructure the formState to get errors formState: {errors}
  // Continue Step 3 by passing the FormData Structure to the useForm hook "useForm<FormData>()"
  const { register, handleSubmit, formState } = useForm();
  //  STEP 2: Display what proptiers are in formState
  console.log(formState); // formState.errors

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name", { required: true, minLength: 3 })}
          type="text"
          id="name"
          className="form-control"
        />
        {/* STEP 4: Display an error message based on a condition */}
        {formState.errors.name?.type === "required" && (
          <p className="text-danger">The name field is required.</p>
        )}
        {/* STEP 4: Display an error message based on a condition */}
        {formState.errors.name?.type === "minLength" && (
          <p className="text-danger">
            The name is too short minimum 3 characters.
          </p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          // STEP 1: Only allow the form to submit if these condition are met
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

export default FormValidation;
