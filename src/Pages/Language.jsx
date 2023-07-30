import React, { useState } from 'react'
import { useMutation } from '@apollo/client';

import CREATE__LANGUAGE from '../libs/Mutations/CreateLanguage';

function Language() {
  const [name, setName] = useState("");
  const [createLanguage] = useMutation(CREATE__LANGUAGE)
  const session = sessionStorage.getItem("key");

  const onsubmit = (e) => {
    e.preventDefault();
    createLanguage({
      variables: {
        name: name,
        key: session,
      },
    });
  setName("")
  };
  return (
    <main>
      <form onSubmit={onsubmit}>
      <div className="Dashboard__form--group">
        <label className="Dashboard__label">Language Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="Dashboard__input"
        />
        </div>
        <button type="submit" className='Dashboard__submit'>save</button>
      </form>
    </main>
  );
}

export default Language