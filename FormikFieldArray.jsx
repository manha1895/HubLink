<Formik
enableReinitialize={true}
initialValues={
  this.state.answers
    ? this.state.answers
    : {
        qAndA: [
          { answers: "", questionid: "" },
          { answers: "", questionid: "" },
          { answers: "", questionid: "" },
        ],
      }
}
onSubmit={this.onSubmit}
validationSchema={validationSchema.ValidationQAndA}
>
{({
  values,
  handleSubmit,
  isValid,
  handleChange,
  handleBlur,
  resetForm,
}) => (
  <Form className="form-group" onSubmit={handleSubmit}>
    <FieldArray name="qAndA">
      {({ remove, push }) => (
        <div>
          {values.qAndA &&
            values.qAndA.map((qAndA, index) => (
              <div key={index}>
                <Label
                  htmlFor={`qAndA.${index}.questionId`}
                >{`Security Question ${index + 1}`}</Label>
                <Field
                  disabled={this.state.disabled}
                  name={`qAndA.${index}.questionId`}
                  values={`values.${index}.questionId`}
                  component="select"
                  className="form-control"
                  as="select"
                >
                  <option value="">Select A Question</option>
                  {this.state.questions.map((q) =>
                    this.mapQ(
                      q,
                      values.qAndA.map((q) =>
                        parseInt(q.questionId)
                      )
                    )
                  )}
                </Field>
                {!this.state.disabled && (
                  <ErrorMessage
                    component="span"
                    name={`qAndA.${index}.questionId`}
                    className={Styles.errorMessage}
                  />
                )}

                <br />
                <Label
                  htmlFor={`qAndA.${index}.answer`}
                >{`Security Answer ${index + 1}`}</Label>
                <Field
                  disabled={this.state.disabled}
                  onChange={handleChange}
                  name={`qAndA.${index}.answer`}
                  className="form-control"
                  placeholder={"Write the Answer Here"}
                  values={`values.${index}.answer`}
                  type="text"
                  onBlur={handleBlur}
                  autoComplete="off"
                />
                {!this.state.disabled && (
                  <ErrorMessage
                    component="span"
                    name={`qAndA.${index}.answer`}
                    className={Styles.errorMessage}
                  />
                )}

                {!this.state.disabled && (
                  <i
                    className="icofont icofont-ui-delete"
                    onClick={() => remove(index)}
                    disabled={this.state.disabled}
                  ></i>
                )}
              </div>
            ))}

          {!this.state.disabled && (
            <button
              type="button"
              className="btn btn-info btn-block"
              id="btn"
              onClick={() => push({ questionId: "", answer: "" })}
              disabled={
                this.state.disabled ||
                (values.qAndA && values.qAndA.length >= 3)
              }
            >
              Add Question
            </button>
          )}

          <br />
        </div>
      )}
    </FieldArray>

    <div className="form-footer">
      {!this.state.disabled && (
        <button
          className="btn btn-info btn-block"
          type="submit"
          id="btn"
          disabled={!isValid}
        >
          Save
        </button>
      )}

      {this.state.disabled ? (
        <button
          className="btn btn-info btn-block"
          type="button"
          id="btn"
          onClick={this.disabled}
        >
          Edit
        </button>
      ) : (
        <button
          className="btn btn-info btn-block"
          type="reset"
          id="btn"
          onClick={() => {
            resetForm();
            this.setState((prevState) => {
              return {
                disabled: !prevState.disabled,
              };
            });
          }}
        >
          Cancel
        </button>
      )}
    </div>
  </Form>
)}
</Formik>