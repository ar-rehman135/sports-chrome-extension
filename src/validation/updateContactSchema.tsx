import * as Yup from "yup";

const updateContactSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Required")
    .matches(/.+([ ]{1}).+/, "Please Enter a valid FullName"),
  email: Yup.string()
    .email("Please enter a valid email!")
    .required("The email is required!"),
  phone: Yup.string().matches(
    /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
    "Please enter a valid phone number!"
  ),
  nearAccount: Yup.string(),
});

export default updateContactSchema;
