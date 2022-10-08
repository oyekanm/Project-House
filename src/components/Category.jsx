import React from "react";

function Category({ category, filterBtn }) {
  return (
    <button
      onClick={() => filterBtn(category)}
      type="button"
      className="filter-btn"
    >
      {category}
    </button>
  );
}

export default Category;
