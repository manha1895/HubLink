import * as Yup from "yup";
import valid from "card-validator";

let ValidationSchema = Yup.object().shape({
  nameHolder: Yup.string()
    .required("Must Enter The Valid Name")
    .min(2, "Must Have Valid Name")
    .max(200, "Must Be Less Than 200 characters"),
  accountNumber: Yup.string()
    .required("Must Enter The Number")
    .test("accountNumber", "Credit Card Number is Invalid", (value) =>
      value ? valid.number(value.replace(/\s+/g, "")).isValid : false
    ),
  cvv: Yup.string()
    .required("Must Enter The Valid CVV")
    .min(3, "Must Enter The Valid CVV")
    .max(3, "Must Enter The Valid CVV")
    .when("paymentTypeId", {
      is: 3,
      then: Yup.string()
        .required("Must Enter The Valid CVV")
        .min(4, "Must Enter The Valid CVV")
        .max(4, "Must Enter The Valid CVV"),
    }),

  expirationMonth: Yup.number()
    .required("Must Select The Valid Expiration Month")
    .min(1, "Must Be Between 1 - 12")
    .max(12, "Must Be Between 1 - 12"),
  expirationYear: Yup.string()
    .required("Must Enter The Valid Expiration Year")
    .test("test-year", "Expiration Year is invalid", (value) =>
      value ? valid.expirationYear(value).isValid : false
    ),
  locationId: Yup.number().required("Must Select The Valid Address"),
  paymentTypeId: Yup.number().required("Must Select The Valid PaymentTypeId"),
  isPrimary: Yup.boolean(),
  isActive: Yup.boolean().test("true", function (isActive) {
    if (this.parent.isPrimary === true) {
      return isActive ? true : false;
    } else {
      return true;
    }
  }),
});

export { ValidationSchema };
