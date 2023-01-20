import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  walletName: Yup.string().required("The near account is required"),
});

export default loginSchema;
