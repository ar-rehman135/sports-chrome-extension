import * as Yup from "yup";

const PasscodeSchema = Yup.object().shape({
  code: Yup.string().required("Passcode is required"),
  repeatCode: Yup.string()
    .oneOf([Yup.ref("code"), null], "Passcodes don't match")
    .required("Passscode confirmation is required"),
});

export default PasscodeSchema;
