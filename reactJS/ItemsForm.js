import React from "react";
import { Formik, Field, FastField } from "formik";
import * as itemsService from "../../services/itemsService";
import swal from "sweetalert";
import FileUpload from "./../items/ItemFileUpload";
import { Button } from "reactstrap";
import * as itemSchema from "./schema/itemSchema.js";

class ItemsForm extends React.Component {
  state = {
    targetSchema: itemSchema.addSchema,
    // selectors: {
    //   companyStatus: [],
    //   companyStatusComponent: [],
    //   industryType: [],
    //   industryTypeComponent: []
    // },
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
    },
    currentFile: ""
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      const { id } = this.props.match.params;
      itemsService
        .getById(id)
        .then(this.onGetItemByIdSuccess)
        .catch(this.onGetItemByIdError);
    }
  }

  loadFile = file => {
    this.setState({
      currentFile: file
    });
  };

  uploadFile = (loaded, currentValues) => {
    if (loaded) {
      const fd = new FormData();
      fd.append("file", loaded, loaded.name);
      itemsService.uploadFile(fd).then(resp => {
        debugger;
        const url = currentValues;
        url.imageUrl = resp[0];
        this.setState(() => {
          return {
            ...this.state.form,
            imageUrl: resp[0]
          };
        });
      });
      // .then(
      //   swal({
      //     title: "Sweet!",
      //     text: "Your file has been uploaded!",
      //     icon: "success",
      //     timer: 1000,
      //     button: false
      //   })
      // )
      // .catch(this.onError);
    }
  };

  onGetItemByIdSuccess = resp => {
    this.setState(() => {
      const form = {
        color: resp.color,
        sizeId: resp.sizeId,
        reviewStarsId: 5,
        itemName: resp.itemName,
        itemDetails: resp.itemDetails,
        itemTypeId: resp.itemTypeId,
        imageUrl: resp.imageUrl,
        gender: resp.gender,
        price: resp.price,
        itemBrand: resp.itemBrand,
        id: resp.id
      };
      return {
        form
      };
    });
  };

  clickHandler = (values, { resetForm }) => {
    const { id } = this.props.match.params;
    if (id) {
      itemsService
        .update(id, values)
        .then(this.onUpdateItemByIdSuccess)
        .catch(this.onError);
    } else {
      itemsService
        .insert(values)
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
    }).then(this.props.history.push(`/items`));
  };

  onInsertItemSuccess = () => {
    swal({
      title: "Submit Success!",
      text: "Thank you for submitting the form",
      icon: "success",
      button: "Ok"
    }).then(this.props.history.push(`/items`));
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
              // setFieldValue,
              isValid
            } = props;
            return (
              <div className="row justify-content-center">
                <div className="card-default card col-md-8 mb-3">
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
                              value={values.itemBrand}
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
                              value={values.itemName}
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
                              value={values.gender}
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
                              value={values.itemTypeId}
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
                              value={values.color}
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
                              value={values.price}
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
                          <label className="col">
                            <img
                              className="ml-auto img-thumbnail rounded-circle thumb96 img-fluid float-left"
                              alt=""
                              src={
                                values.imageUrl
                                  ? values.imageUrl
                                  : "https://personalproject-items.s3-us-west-1.amazonaws.com/personalproject-items084fe5d6-144d-4346-a7fa-7dc4f7e24634_21973754.jpg"
                              }
                            />
                          </label>
                          <div className="col-9">
                            <FileUpload
                              name="imageUrl"
                              currentFile={this.state.currentFile}
                              uploadFile={this.uploadFile}
                              loadFile={this.loadFile}
                              currentValues={values}
                            />
                          </div>
                        </div>
                        <Button
                          type="submit"
                          disabled={isSubmitting || !isValid}
                          onClick={handleSubmit}
                          color="secondary"
                          className="float-right"
                        >
                          Add
                        </Button>
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

export default ItemsForm;
