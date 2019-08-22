import * as Yup from "yup";

const addSchema = Yup.object().shape({
  itemBrand: Yup.string().required("Requires Item Brand"),

  itemName: Yup.string().required("Requires Item Name"),

  gender: Yup.string().required("Requires Item Name"),

  itemTypeId: Yup.number().required("Requires Item Type"),

  sizeId: Yup.number().required("Requires Size"),

  color: Yup.string().required("Requires Color"),

  price: Yup.number().required("Requires Number")
});

export { addSchema };
