import React from "react";
import { Formik, Field, FastField } from "formik";
import swal from "sweetalert";
import { connect } from "react-redux";
import { add, update, getItems } from "../../state/items/actions";

class ItemsForm extends React.Component {
  state = {
    form: {
      color: "",
      sizeId: "",
      reviewStarsId: 5,
      itemName: "",
      itemDetails: "",
      itemTypeId: "",
      imageUrl: "",
      gender: "",
      price: "",
      itemBrand: "",
      id: ""
    }
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      const items = this.props.items;
      const index = items.findIndex(item => item.id === Number(id));
      const newItem = items[index];
      this.setState(() => {
        return {
          form: newItem
        };
      });
    }
  }

  clickHandler = values => {
    const { id } = this.props.match.params;
    if (id) {
      this.props
        .update(values, id)
        .then(this.onUpdateItemByIdSuccess)
        .catch(this.onError);
    } else {
      this.props
        .add(values)
        .then(this.onInsertItemSuccess)
        .catch(this.onError);
    }
  };

  onUpdateItemByIdSuccess = () => {
    swal({
      title: "Update Success!",
      text: "Thank you for submitting the form",
      icon: "success",
      button: "Ok"
    });
  };

  onInsertItemSuccess = () => {
    swal({
      title: "Submit Success!",
      text: "Thank you for submitting the form",
      icon: "success",
      button: "Ok"
    });
  };

  onError = () => {
    swal({
      title: "Uh Oh",
      text: "Please go back and complete the form",
      icon: "warning",
      dangerMode: true
    });
  };
  render() {
    return (
      <div>
        <Formik
          enableReinitialize={true}
          validationSchema={this.state.targetSchema}
          initialValues={this.state.form}
          onSubmit={this.clickHandler}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid
            } = props;
            return (
              <div className="row justify-content-center">
                <div className="card-default card col-md-8">
                  <div className="card-body">
                    <div className="row font-weight-bold">
                      <h3 className="pr-2">Items Form</h3>
                      <p className="text-muted"> *Required</p>
                    </div>
                    <form className="pt-4" onSubmit={handleSubmit}>
                      <div className="position-relative form-group">
                        <div className="form-group row">
                          <label
                            className="text-bold col-xl-3 col-md-3 col-4 col-form-label text-left"
                            labelfor="itemBrand"
                          >
                            * Item Brand
                          </label>
                          <div className="col-xl-9 col-md-9 col-8">
                            <Field
                              id="itemBrand"
                              type="text"
                              name="itemBrand"
                              placeholder="Ex: Nike"
                              onBlur={handleBlur}
                              className={
                                errors.itemBrand && touched.itemBrand
                                  ? "text-input error input-feedback input-group-text form-control is-invalid"
                                  : "text-input form-control"
                              }
                            />
                          </div>
                          {errors.itemBrand && touched.itemBrand && (
                            <p className="input-feedback is-invalid text-danger">
                              {errors.itemBrand}
                            </p>
                          )}
                        </div>

                        <div className="form-group row">
                          <label
                            className="text-bold col-xl-3 col-md-3 col-4 col-form-label text-left"
                            labelfor="itemName"
                          >
                            * Item Name
                          </label>
                          <div className="col-xl-9 col-md-9 col-8">
                            <Field
                              id="itemName"
                              type="text"
                              name="itemName"
                              placeholder="Ex: Air Jordan 1"
                              onBlur={handleBlur}
                              className={
                                errors.itemName && touched.itemName
                                  ? "text-input error input-feedback input-group-text form-control is-invalid"
                                  : "text-input form-control"
                              }
                            />
                          </div>
                          {errors.itemName && touched.itemName && (
                            <p className="input-feedback is-invalid text-danger">
                              {errors.itemName}
                            </p>
                          )}
                        </div>

                        <div className="form-group row">
                          <label
                            className="text-bold col-xl-3 col-md-3 col-4 col-form-label text-left"
                            labelfor="gender"
                          >
                            * Gender
                          </label>
                          <div className="col-xl-9 col-md-9 col-8">
                            <Field
                              id="gender"
                              component="select"
                              name="gender"
                              onBlur={handleBlur}
                              className={
                                errors.gender && touched.gender
                                  ? "text-input error input-feedback input-group-text form-control is-invalid"
                                  : "text-input form-control"
                              }
                            >
                              <option values={values.gender}>Select</option>
                              <option values={values.gender}>Men</option>
                              <option values={values.gender}>Women</option>
                              <option values={values.gender}>Unisex</option>
                            </Field>
                          </div>
                          {errors.gender && touched.gender && (
                            <p className="input-feedback is-invalid text-danger">
                              {errors.gender}
                            </p>
                          )}
                        </div>

                        <div className="form-group row">
                          <label
                            className="text-bold col-xl-3 col-md-3 col-4 col-form-label text-left"
                            labelfor="itemTypeId"
                          >
                            * Item Type
                          </label>
                          <div className="col-xl-9 col-md-9 col-8">
                            <Field
                              component="select"
                              name="itemTypeId"
                              onBlur={handleBlur}
                              className={
                                errors.itemTypeId && touched.itemTypeId
                                  ? "text-input error input-feedback input-group-text form-control is-invalid"
                                  : "text-input form-control"
                              }
                            >
                              <option values={values.itemTypeId}>Select</option>
                              <option value={1}>Top</option>
                              <option value={2}>Bottom</option>
                              <option value={3}>Shoes</option>
                            </Field>
                          </div>
                          {errors.itemTypeId && touched.itemTypeId && (
                            <p className="input-feedback is-invalid text-danger">
                              {errors.itemTypeId}
                            </p>
                          )}
                        </div>

                        <div className="form-group row">
                          <label
                            className="text-bold col-xl-3 col-md-3 col-4 col-form-label text-left"
                            labelfor="sizeId"
                          >
                            * Size
                          </label>
                          <div className="col-xl-9 col-md-9 col-8">
                            <Field
                              component="select"
                              id="sizeId"
                              name="sizeId"
                              onBlur={handleBlur}
                              className={
                                errors.sizeId && touched.sizeId
                                  ? "text-input error input-feedback input-group-text form-control is-invalid"
                                  : "text-input form-control"
                              }
                            >
                              <option values={values.sizeId}>Select</option>
                              <option value={1}>S</option>
                              <option value={2}>M</option>
                              <option value={3}>L</option>
                            </Field>
                          </div>
                          {errors.sizeId && touched.sizeId && (
                            <p className="input-feedback is-invalid text-danger">
                              {errors.sizeId}
                            </p>
                          )}
                        </div>

                        <div className="form-group row">
                          <label
                            className="text-bold col-xl-3 col-md-3 col-4 col-form-label text-left"
                            labelfor="color"
                          >
                            * Color
                          </label>
                          <div className="col-xl-9 col-md-9 col-8">
                            <Field
                              id="color"
                              type="text"
                              name="color"
                              placeholder="Ex: Black/White"
                              onBlur={handleBlur}
                              className={
                                errors.color && touched.color
                                  ? "text-input error input-feedback input-group-text form-control is-invalid"
                                  : "text-input form-control"
                              }
                            />
                          </div>
                          {errors.color && touched.color && (
                            <p className="input-feedback is-invalid text-danger">
                              {errors.color}
                            </p>
                          )}
                        </div>

                        <div className="form-group row">
                          <label
                            className="text-bold col-xl-3 col-md-3 col-4 col-form-label text-left"
                            labelfor="price"
                          >
                            * Price
                          </label>
                          <div className="col-xl-9 col-md-9 col-8">
                            <Field
                              id="price"
                              type="number"
                              name="price"
                              placeholder="Ex: 59.99"
                              onBlur={handleBlur}
                              className={
                                errors.price && touched.price
                                  ? "text-input error input-feedback input-group-text form-control is-invalid"
                                  : "text-input form-control"
                              }
                            />
                          </div>
                          {errors.price && touched.price && (
                            <p className="input-feedback is-invalid text-danger">
                              {errors.price}
                            </p>
                          )}
                        </div>

                        <div className="form-group row">
                          <label
                            className="text-bold col-xl-3 col-md-3 col-4 col-form-label text-left"
                            htmlFor="itemDetails"
                          >
                            Item Details{" "}
                          </label>
                          <div className="col-xl-9 col-md-9 col-8">
                            <FastField
                              onBlur={handleBlur}
                              component="textarea"
                              name="itemDetails"
                              style={{ height: "160px", width: "100%" }}
                              value={values.itemDetails}
                              className={
                                errors.itemDetails && touched.itemDetails
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                            />
                          </div>
                          {errors.itemDetails && touched.itemDetails && (
                            <p className="invalid-feedback">
                              {errors.itemDetails}
                            </p>
                          )}
                        </div>

                        <div className="form-group row">
                          <label
                            className="text-bold col-xl-3 col-md-3 col-4 col-form-label text-left"
                            labelfor="imageUrl"
                          >
                            * ImageUrl
                          </label>
                          <div className="col-xl-9 col-md-9 col-8">
                            <Field
                              id="imageUrl"
                              type="text"
                              name="imageUrl"
                              onBlur={handleBlur}
                              className={
                                errors.imageUrl && touched.imageUrl
                                  ? "text-input error input-feedback input-group-text form-control is-invalid"
                                  : "text-input form-control"
                              }
                            />
                          </div>
                          {errors.imageUrl && touched.imageUrl && (
                            <p className="input-feedback is-invalid text-danger">
                              {errors.imageUrl}
                            </p>
                          )}
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting || !isValid}
                          onClick={handleSubmit}
                          color="success"
                          size="lg"
                          target="_blank"
                          className="float-right"
                        >
                          Upload
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  };
};

const mapDispatchToProps = { add, update, getItems };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsForm);
