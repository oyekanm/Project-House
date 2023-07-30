import React, { useState } from "react";

function Category({ Data,filterBtn }) {
  // const cate = Data.map((data) => data.category)
  // const ca = cate.map(c=>c.map(c=>c.name))
  // const joins = ca.join(",").split(",")
  let joins 
  let category = [];


  if(Data){
    const cate = Data.map((data) => data.category)
  const ca = cate.map(c=>c.map(c=>c.name))
  joins = ca.join(",").split(",")
  category = ["all", ...new Set(joins.map(c=>c))]
  }

//  console.log(category);
  return (
   <>
    {category.map((category, index) => {
      return (
        <button
        onClick={() => filterBtn(category)}
        type="button"
        key={index}
        className="filter-btn"
        >
        {category}
        </button>
        );
      })}
   </>
  );
}

export default Category;
