const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SHOPS":
      return { ...state, shops: action.shops };

    case "UPDATE_PRODUCTS":
      return { ...state, products: action.products };

    default:
      return { ...state };
  }
};

export default reducer;
``;
