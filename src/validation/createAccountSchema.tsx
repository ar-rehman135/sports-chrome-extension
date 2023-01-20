import * as Yup from "yup";

const createAccountSchema = Yup.object().shape({
  fullName: Yup.string().required("Required"),
  walletName: Yup.string().required("Required"),
});

export default createAccountSchema;
