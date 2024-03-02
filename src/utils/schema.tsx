import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().required().min(3),
  dob: yup.number().required().positive().integer(),
  sex: yup
    .mixed()
    .oneOf(["Male", "Female"] as const)
    .defined(),
  mobile: yup.number().test({
    test(value, ctx) {
      if (value?.toString().length !== 10)
        return ctx.createError({ message: "Mobile Number is not 10 digits" });
      return true;
    },
  }),
  govidtype: yup
    .mixed()
    .oneOf(["Aadhar", "PAN"] as const)
    .defined(),
  govid: yup
    .string()
    .required()
    .when("govidtype", {
      is: (value: string) => (value === "Aadhar" ? true : false),
      then: (schema) =>
        schema.test({
          test(value, ctx) {
            if (
              value.startsWith("0") ||
              value.startsWith("1") ||
              value.length !== 12
            )
              return ctx.createError({
                message: "Aadhar cannot start with 0 and 1",
              });
            return true;
          },
        }),
      otherwise: (schema) =>
        schema.test({
          test(value, ctx) {
            if (value.length !== 10)
              return ctx.createError({
                message: "PAN does not has 10 characters",
              });
            return true;
          },
        }),
    }),
});

export type UserDetailsT = yup.InferType<typeof userSchema>;

export const addressSchema = yup.object().shape({
  address: yup.string().nullable(),
  state: yup.string().nullable(),
  city: yup.string().nullable(),
  country: yup.string().nullable(),
  pincode: yup.number(),
});

export type AddressT = yup.InferType<typeof addressSchema>;
