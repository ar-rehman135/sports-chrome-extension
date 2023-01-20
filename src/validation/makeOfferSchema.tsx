import * as Yup from "yup";

const makeOfferSchema = Yup.object().shape({
  amount: Yup.number().required("Required"),
  date: Yup.date(),
});

export default makeOfferSchema;
