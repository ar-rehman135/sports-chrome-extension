import * as Yup from "yup";

const createContactSchema = Yup.object().shape({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  email: Yup.string()
    .email("Please enter a valid email!")
    .required("The email is required!"),
  phone: Yup.string().matches(
    /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
    "Please enter a valid phone number!"
  ),
  nearAccount: Yup.string(),
});

export default createContactSchema;
