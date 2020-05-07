<Modal isOpen={props.isOpen} toggle={props.toggleModal}>
      <ModalHeader toggle={props.toggleModal}>Account Detail</ModalHeader>
      <ModalBody>
        <Formik
          enableReinitialize={true}
          initialValues={props.account}
          onSubmit={props.onSubmit}
          validationSchema={
            props.isNew ? ValidationSchema : EditValidationSchema
          }
        >
          {({
            values,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
            setFieldValue,
          }) => (
            <React.Fragment>
              <div className="col-md-4 text-center">
                {props.isNew && (
                  <Card
                    number={values.accountNumber ? values.accountNumber : ""}
                    name={values.nameHolder ? values.nameHolder : ""}
                    expiry={
                      values.expirationYear
                        ? `${values.expirationMonth}/${values.expirationYear}`
                        : ""
                    }
                    cvc={values.cvv ? values.cvv : ""}
                  />
                )}
                {!props.isNew && (
                  <CardImg
                    src={props.account.cardImage}
                    className="img-fluid"
                    id="imageFixed"
                  />
                )}

                <br />
                <Modal
                  isOpen={values.locationId === "0" ? true : false}
                  id="address"
                >
                  <ModalBody className="addressModal">
                    <LocationsFormik
                      id="payment"
                      cancel={(e) => props.onAddressCancel(e, setFieldValue)}
                      onCancel={() => props.onSubmitSuccess(setFieldValue)}
                    />
                  </ModalBody>
                </Modal>
              </div>

              <div>
                <Form className="theme-form mega-form" onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>Payment Type</Label>
                    <Field
                      name="paymentTypeId"
                      component="select"
                      values={values.paymentTypeId}
                      label="Status"
                      className="form-control"
                      as="select"
                    >
                      {!values.paymentTypeId && (
                        <option value="">Select a Payment Type</option>
                      )}
                      {props.allTypes.map(props.mapTypes)}
                    </Field>
                    <ErrorMessage
                      component="span"
                      name="paymentTypeId"
                      className={Styles.errorMessage}
                    />
                  </FormGroup>
                  {values.paymentTypeId && (
                    <div>
                      <FormGroup>
                        <Label htmlFor="nameHolder">Full Name</Label>
                        <Field
                          name="nameHolder"
                          placeholder="Must be Valid FullName"
                          type="text"
                          className="form-control"
                          value={values.nameHolder || ""}
                          onBlur={handleBlur}
                          autoComplete="off"
                        />
                        <ErrorMessage
                          component="span"
                          name="nameHolder"
                          className={Styles.errorMessage}
                        />
                      </FormGroup>
                      {props.isNew && (
                        <React.Fragment>
                          <FormGroup>
                            <Label htmlFor="accountNumber">
                              Account Number
                            </Label>
                            <Field
                              type="tel"
                              name="accountNumber"
                              className="form-control"
                              placeholder={
                                values.accountNumber
                                  ? values.accountNumber
                                  : "Must be Valid Card Number"
                              }
                              value={values.accountNumber || ""}
                              onBlur={handleBlur}
                              autoComplete="off"
                            />
                            <ErrorMessage
                              component="span"
                              name="accountNumber"
                              className={Styles.errorMessage}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label htmlFor="cvv">CVV</Label>
                            <Field
                              type="tel"
                              name="cvv"
                              placeholder="Must be 3-4 Digits"
                              className="form-control"
                              value={values.cvv || ""}
                              onBlur={handleBlur}
                              autoComplete="off"
                            />
                            <ErrorMessage
                              component="span"
                              name="cvv"
                              className={Styles.errorMessage}
                            />
                          </FormGroup>
                        </React.Fragment>
                      )}

                      <FormGroup>
                        <Label>Expiration Month</Label>
                        <Field
                          name="expirationMonth"
                          component="select"
                          values={values.expirationMonth}
                          label="Status"
                          className="form-control"
                          as="select"
                        >
                          <option value="">Select a Expiration Month</option>
                          <option value={props.isNew ? "01" : "1"}>
                            January
                          </option>
                          <option value={props.isNew ? "02" : "2"}>
                            February
                          </option>
                          <option value={props.isNew ? "03" : "3"}>
                            March
                          </option>
                          <option value={props.isNew ? "04" : "4"}>
                            April
                          </option>
                          <option value={props.isNew ? "05" : "5"}>May</option>
                          <option value={props.isNew ? "06" : "6"}>June</option>
                          <option value={props.isNew ? "07" : "7"}>July</option>
                          <option value={props.isNew ? "08" : "8"}>
                            August
                          </option>
                          <option value={props.isNew ? "09" : "9"}>
                            September
                          </option>
                          <option value="10">October</option>
                          <option value="11">November</option>
                          <option value="12">December</option>
                        </Field>
                        <ErrorMessage
                          component="span"
                          name="expirationMonth"
                          className={Styles.errorMessage}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="expirationYear">Expiration Year</Label>
                        <Field
                          type="text"
                          name="expirationYear"
                          placeholder="Please Type a Full Year"
                          className="form-control"
                          value={values.expirationYear || ""}
                          onBlur={handleBlur}
                          autoComplete="off"
                        />
                        <ErrorMessage
                          component="span"
                          name="expirationYear"
                          className={Styles.errorMessage}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label>Address</Label>
                        <Field
                          component="select"
                          name="locationId"
                          className="form-control"
                          values={values.locationId}
                          as="select"
                        >
                          <option value="">Select an Address</option>
                          {props.allAddress.map(props.mapLocation)}
                          <option value={0}>New Address</option>
                        </Field>
                        <ErrorMessage
                          component="span"
                          name="locationId"
                          className={Styles.errorMessage}
                        />
                      </FormGroup>

                      <FormGroup className="form-group form-check-inline">
                        <Label htmlFor="isPrimary" className="col-form-label">
                          Set As Primary
                        </Label>
                        <Field
                          name="isPrimary"
                          type="checkbox"
                          className="form-control"
                          checked={values.isPrimary || false}
                        />
                      </FormGroup>

                      <FormGroup className="form-group form-check-inline">
                        <Label htmlFor="isActive" className="col-form-label">
                          Set As Active
                        </Label>
                        <Field
                          name="isActive"
                          type="checkbox"
                          className="form-control"
                          checked={values.isActive || false}
                        />
                      </FormGroup>
                    </div>
                  )}
                  <div style={{ color: "red" }}>
                    {values.isPrimary && !values.isActive && props.text}

                    {!values.isPrimary && !values.isActive && props.activeText}
                  </div>
                  <br />
                  <div className="btn-group" role="group">
                    <button
                      type="submit"
                      className="btn btn-default btn-sm"
                      id="smallbtn"
                      disabled={!isValid || isSubmitting}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={props.toggleModal}
                      className="btn btn-default btn-sm"
                    >
                      Cancel
                    </button>
                    {props.account.id && (
                      <button
                        type="button"
                        onClick={props.deleteAccount}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </Form>
              </div>
            </React.Fragment>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};