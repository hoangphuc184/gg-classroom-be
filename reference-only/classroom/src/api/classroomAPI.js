import React from "react";
import axiosClient from "./axiosClient";

const classroomAPI = {
  getAllClasses: (params) => {
    const url = "/classes";
    return axiosClient.get(url, { params });
  },
  createClass: (data) => {
    const url = "/classes";
    console.log({ data });
    return axiosClient.post(url, data);
  },
};
export default classroomAPI;
