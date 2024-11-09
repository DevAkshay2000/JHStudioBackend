const obj = {
  menuId: 23,
  postUrl: "/sample",
  fields: [
    {
      label: "name",
      name: "fname",
      error: "this field is required",
      warning: "this is warning",
      //in case data is empty then we can redirect user to this
      warningUrl: "/warning",
      type: "text",
    },
  ],
};
