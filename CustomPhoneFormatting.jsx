// Handle Change in form
onPhoneChange(value, setFieldValue, target) {
    const input = value.replace(/\D/g, "").substring(0, 10);

    const first = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);
    if (target === "primary") {
      if (input.length > 6) {
        setFieldValue("primary", `(${first}) ${middle}-${last}`);
      } else if (input.length > 3) {
        setFieldValue("primary", `(${first}) ${middle}`);
      } else if (input.length >= 0) {
        setFieldValue("primary", `${input}`);
      }
    } else {
      if (input.length > 6) {
        setFieldValue("secondary", `(${first}) ${middle}-${last}`);
      } else if (input.length > 3) {
        setFieldValue("secondary", `(${first}) ${middle}`);
      } else if (input.length >= 0) {
        setFieldValue("secondary", `${input}`);
      }
    }
  }
//return strings to phone format.
  onPhoneFormat = (value) => {
    return `(${value.substring(0, 3)})${value.substring(
      3,
      6
    )}-${value.substring(6, 10)}`;
  };