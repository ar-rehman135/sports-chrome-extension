import * as Yup from "yup";

export const verificationSchema = Yup.object().shape({
  code: Yup.string().length(6, "The code needs to have 6 digits").required("The code is required"),
});
