import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  mode: Yup.string().required("Required"),
  email: Yup.string().when("mode", {
    is: "email",
    then: Yup.string()
      .email("Please enter a valid email!")
      .required("The email is required!"),
  }),

  phone: Yup.string().min(10).required('Phone is Required'),
  countryCode: Yup.string().min(2).max(4).required('Country Code is Required'),
});

export const EmailSchema = Yup.object().shape({
  mode: Yup.string().required("Required"),
  email: Yup.string().when("mode", {
    is: "email",
    then: Yup.string()
      .email("Please enter a valid email!")
      .required("The email is required!"),
  }),
});

export const PhoneSchema = Yup.object().shape({
  phone: Yup.string().min(10).required('Phone is Required'),
  countryCode: Yup.string().min(2).max(4).required('Country Code is Required'),
});

export default signUpSchema;
