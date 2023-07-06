// STEP 1: Use schemea based validation because it would take too long to validation each field in our form for all the different edge cases using the conventional approach

// Theres a few library that can make our life easier to handle the verification like yup and zod along with a few others, we will be using zod

import { FieldValues, useForm } from "react-hook-form";

// STEP 1: Install zod 'npm install zod'
import { z } from "zod";

// STEP 5: import resolver
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "../model/categories";

// STEP 2: Define the schema of our object
const schema = z.object({
  // STEP 8: Pass the custom error message
  name: z.string().min(3, {
    message: "Name must be at least 3 characters",
  }),
  age: z.number({ invalid_type_error: "age field is required" }).min(21),


  // Validating the Category Section
  category: z.enum(categories, {
    errorMap: () => ({
      message: "Select a category",
    }),
  }),
});

// Replace the interface with something else because we can access the values of the schema to know what the structure of our form fields are

// STEP 3: This will return a typescript type which is basically the same as an interface (type is used for more complex structures)

type FormData = z.infer<typeof schema>;

// STEP 4: Now we need to integrate react hook forms with zod to do this we use react hook resolver
// npm install '@hookform/resolvers

const ZodValidation = () => {
  // STEP 6: pass the schema to the form using the resolver
  //   STEP 9: Destructure formState: {errors, isValid}
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

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
        {/* STEP 7: WE now only need 1 validation check instead of having 1 for use use case. Remove the type as well */}
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age", { valueAsNumber: true })}
          type="number"
          id="age"
          className="form-control"
        />
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
      </div>

      <div>
        <select {...register("category")} id="category">
          <option value=""></option>
          {categories.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>
        {/* Adding Error Message to Category Section */}
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      {/* STEP 10: Disable the button if the form is not valid "disabled={!isValid}" */}
      <button disabled={!isValid} className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ZodValidation;
