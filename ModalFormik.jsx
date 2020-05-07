// Modal with combination of Formik field / fieldarray / other modals attached.
<Modal isOpen={this.props.isOpen} toggle={this.props.toggleModal}>
  <ModalHeader toggle={this.props.toggleModal}>
    {" "}
    Update Informations
  </ModalHeader>
  <ModalBody>
    <Formik
      initialValues={{
        orgs: [],
      }}
      onSubmit={this.onSubmit}
      validationSchema={validationSchema.OrgModalSchema}
    >
      {({ values, handleSubmit, setFieldValue }) => (
        <React.Fragment>
          <EditModal
            account={{ isActive: true }}
            isOpen={values.payment === "new" ? true : false}
            toggleModal={() => this.togglePayment(setFieldValue)}
            addAccount={this.addAccount}
            isNew={this.state.isNew}
            onSubmit={(values) =>
              this.onNewPaymentSubmit(values, setFieldValue)
            }
            mapTypes={this.mapTypes}
            allTypes={this.props.paymentType}
            allAddress={this.props.locations}
            mapLocation={this.mapLocations}
            text={this.state.text}
            activeText={this.state.activeText}
            onAddressCancel={this.onAddressCancel}
            onSubmitSuccess={this.onSubmitAddressSuccess}
          />
          <Modal isOpen={values.address === "new" ? true : false} id="address">
            <ModalBody className="addressModal">
              <LocationsFormik
                id="org"
                cancel={(e) => this.cancel(e, setFieldValue)}
                onCancel={() => this.onCancel(setFieldValue)}
              />
            </ModalBody>
          </Modal>
          <div>
            <Form className="update" onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Select The Category</Label>
                <Field
                  name="category"
                  component="select"
                  values={values.category}
                  label="Status"
                  className="form-control"
                  as="select"
                >
                  <option value="">Select a Category</option>
                  <option value="1">Update The Email</option>
                  <option value="2">Update The Phone Number</option>
                  <option value="3">Update The Address</option>
                  <option value="4">Update The Payment Option</option>
                </Field>
                <ErrorMessage
                  component="span"
                  name="category"
                  className={Styles.errorMessage}
                />
                <br />
                {values.category && values.category === "1" && (
                  <div>
                    <Label>Select The Email</Label>
                    <Field
                      name="email"
                      component="select"
                      values={values.email}
                      label="Status"
                      className="form-control"
                      as="select"
                    >
                      <option value="">Select a Email</option>
                      {this.props.emails.map((email, index) =>
                        this.mapEmails(email, index)
                      )}
                    </Field>
                    <ErrorMessage
                      component="span"
                      name="email"
                      className={Styles.errorMessage}
                    />
                  </div>
                )}
                {values.category && values.category === "2" && (
                  <div>
                    <Label>Select The Phone Number</Label>
                    <Field
                      name="phone"
                      component="select"
                      values={values.phone}
                      label="Status"
                      className="form-control"
                      as="select"
                    >
                      <option value="">Select a Phone Number</option>
                      {this.props.phones.map((phone, index) =>
                        this.mapPhones(phone, index)
                      )}
                    </Field>
                    <ErrorMessage
                      component="span"
                      name="phone"
                      className={Styles.errorMessage}
                    />
                  </div>
                )}
                {values.category && values.category === "3" && (
                  <div>
                    <Field
                      name="address"
                      component="select"
                      values={values.address}
                      label="Status"
                      className="form-control"
                      as="select"
                    >
                      <option value="">Select an Address</option>
                      {this.props.locations.map((location, index) =>
                        this.mapLocations(location, index)
                      )}
                      <option value="new">New Address</option>
                    </Field>
                    <ErrorMessage
                      component="span"
                      name="address"
                      className={Styles.errorMessage}
                    />
                  </div>
                )}
                {values.category && values.category === "4" && (
                  <div>
                    <Label>Select The Payment</Label>
                    <Field
                      name="payment"
                      component="select"
                      values={values.payment}
                      label="Status"
                      className="form-control"
                      as="select"
                    >
                      <option value="">Select a Payment</option>
                      {this.props.payments.map((payment, index) =>
                        this.mapPayments(payment, index)
                      )}
                      <option value="new">New Payment</option>
                    </Field>
                    <ErrorMessage
                      component="span"
                      name="payment"
                      className={Styles.errorMessage}
                    />
                  </div>
                )}

                <br />
                <Label>Select The Organizations</Label>
                <button
                  type="button"
                  className="btn btn-square btn-info btn-xs"
                  onClick={() => this.updateAll(setFieldValue, values.orgs)}
                  style={{ marginLeft: 5 }}
                  id="btn"
                >
                  Select All
                </button>

                <FieldArray
                  name="orgs"
                  render={(arrayHelpers) => (
                    <ul id="logoo">
                      {this.props.allOrgs.map((org) => (
                        <li
                          key={org.id}
                          id="logoo"
                          onClick={() =>
                            values.orgs.includes(org.id)
                              ? arrayHelpers.remove(values.orgs.indexOf(org.id))
                              : arrayHelpers.push(org.id)
                          }
                        >
                          <Field
                            id={org.id}
                            name="orgs"
                            type="checkbox"
                            value={org.id}
                            checked={
                              values.orgs ? values.orgs.includes(org.id) : false
                            }
                          />
                          <Label
                            for={JSON.stringify(org.id)}
                            id="orgLogo"
                            key={org.id}
                          >
                            <img
                              src={this.imageTypeHandler(org.logo)}
                              alt={org.name}
                            />
                            <span>{org.label}</span>
                          </Label>
                        </li>
                      ))}
                    </ul>
                  )}
                />
                <ErrorMessage
                  component="span"
                  name="orgs"
                  className={Styles.errorMessage}
                />

                <button
                  className="btn btn-info btn-block"
                  type="submit"
                  id="lg-btn"
                >
                  Save
                </button>
              </FormGroup>
            </Form>
          </div>
        </React.Fragment>
      )}
    </Formik>
  </ModalBody>
</Modal>;

// handling different onSubmits in one function.
onSubmit = (formValues) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willEdit) => {
      if (willEdit) {
        let arrayValues = [];
        if (formValues.category === "1") {
          formValues.orgs.forEach((org) => {
            arrayValues.push({
              organizationId: parseInt(org),
              email: formValues.email,
            });
          });

          userOrganizationService
            .updateAllEmails(arrayValues)
            .then(this.onUpdateAllSuccess)
            .catch(this.onError);
        } else if (formValues.category === "2") {
          formValues.orgs.forEach((org) => {
            arrayValues.push({
              organizationId: parseInt(org),
              phoneNumber: formValues.phone,
            });
          });
          userOrganizationService
            .updateAllPhones(arrayValues)
            .then(this.onUpdateAllSuccess)
            .catch(this.onError);
        } else if (formValues.category === "3") {
          formValues.orgs.forEach((org) => {
            arrayValues.push({
              organizationId: parseInt(org),
              locationId: parseInt(formValues.address),
            });
          });
          userOrganizationService
            .updateAllLocations(arrayValues)
            .then(this.onUpdateAllSuccess)
            .catch(this.onError);
        } else if (formValues.category === "4") {
          formValues.orgs.forEach((org) => {
            arrayValues.push({
              organizationId: parseInt(org),
              paymentId: parseInt(formValues.payment),
            });
          });
          userOrganizationService
            .updateAllPayments(arrayValues)
            .then(this.onUpdateAllSuccess)
            .catch(this.onError);
        }
      } else {
        swal({ title: "Edit Canceled!", icon: "info" });
      }
    });
  };