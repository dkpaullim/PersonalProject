import axios from "axios";
import * as serviceHelper from "./serviceHelpers";

const siteUrl = "http://localhost:50000";

const update = (id, payload) => {
  const config = {
    method: "PUT",
    url: `${siteUrl}/api/items/${id}`,
    data: payload,
    withCredentials: true,
    crossDomain: true
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

const insert = payload => {
  const config = {
    method: "POST",
    url: `${siteUrl}/api/items`,
    data: payload,
    withCredentials: true,
    crossDomain: true
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

const getItems = payload => {
  const config = {
    method: "GET",
    url: `${siteUrl}/api/items`,
    data: payload,
    withCredentials: true,
    crossDomain: true
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

const getById = id => {
  const config = {
    method: "GET",
    url: `${siteUrl}/api/items/${id}`,
    withCredentials: true,
    crossDomain: true
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

const deleteItem = id => {
  const config = {
    method: "DELETE",
    url: `${siteUrl}/api/items/${id}`,
    withCredentials: true,
    crossDomain: true
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

const uploadFile = p => {
  debugger;
  const config = {
    method: "POST",
    url: `${siteUrl}/api/files/upload`,
    data: p,
    withCredentials: true,
    CrossDomain: true
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

// const displayItems = (pageIndex, pageSize) => {
//   const config = {
//     method: "GET",
//     url: `${siteUrl}/api/items/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
//     withCredentials: true,
//     crossDomain: true
//   };

//   return axios(config)
//     .then(serviceHelper.onGlobalSuccess)
//     .catch(serviceHelper.onGlobalError);
// };

// const searchItems = (pageIndex, pageSize, query) => {
//   const config = {
//     method: "GET",
//     url: `${siteUrl}/api/items/search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
//     withCredentials: true,
//     crossDomain: true
//   };

//   return axios(config)
//     .then(serviceHelper.onGlobalSuccess)
//     .catch(serviceHelper.onGlobalError);
// };

// const getAllTypes = () => {
//   const config = {
//     method: "GET",
//     url: `${siteUrl}/api/items/all/options`,
//     withCredentials: true,
//     crossDomain: true
//   };
//   return axios(config)
//     .then(serviceHelper.onGlobalSuccess)
//     .catch(serviceHelper.onGlobalError);
// };

export {
  insert,
  getItems,
  deleteItem,
  update,
  getById,
  uploadFile
  //   displayItems,
  //   searchItems,
  //   getAllTypes
};
