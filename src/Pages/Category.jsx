import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import CREATE__CATEGORY from "../libs/Mutations/CreateCategory";

function Category() {
  const [name, setName] = useState("");
  const [createCategory] = useMutation(CREATE__CATEGORY);
  const session = sessionStorage.getItem("key");

  const onsubmit = (e) => {
    e.preventDefault();
    createCategory({
      variables: {
        name: name,
        key: session,
      },
    });
    setName("");
  };
  return (
    <main>
      <form onSubmit={onsubmit}>
        <div className="Dashboard__form--group">
          <label className="Dashboard__label">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="Dashboard__input"
          />
        </div>
        <button type="submit" className="Dashboard__submit">
          save
        </button>
      </form>
    </main>
  );
}

export default Category;
