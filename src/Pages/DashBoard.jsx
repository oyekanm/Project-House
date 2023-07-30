import React, { useState } from "react";
import GetCategory from "../libs/Queries/GetCategory";
import GetLanguage from "../libs/Queries/GetLanguage";
import axios from "axios";
import { useMutation } from "@apollo/client";
import CREATE__PROJECT from "../libs/Mutations/CreateProject";

function DashBoard() {
  const session = sessionStorage.getItem("key");
  const [createProject] = useMutation(CREATE__PROJECT);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [project, setProject] = useState({
    name: "",
    author: "oyekanmi",
    url: "",
    github: "",
    image: "",
    language: [],
    category: [],
  });
  const categories = GetCategory();
  const languages = GetLanguage();

  const changeCategory = (e) => {
    if (project.category.includes(e.target.value)) return;
    setProject((prev) => {
      return {
        ...prev,
        category: [...prev.category, e.target.value],
      };
    });
  };
  const changeLanguage = (e) => {
    if (project.language.includes(e.target.value)) return;
    setProject((prev) => {
      return {
        ...prev,
        language: [...prev.language, e.target.value],
      };
    });
  };

  const onchange = (e) => {
    setProject((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const onchangeImage = (e) => {
    setLoading(true);
    const preset_key = `${process.env.REACT_APP_PRESET__KEY}`;
    const cloud = `${process.env.REACT_APP_CLOUD}`;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);

    // console.log(file);
    axios
      .post(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, formData)
      .then((res) => {
        const { url } = res.data;
        setProject((prev) => {
          return {
            ...prev,
            image: url,
          };
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setErrors(err.message);
      });
  };
  const onsubmit = (e) => {
    e.preventDefault();
    if (
      project.name &&
      project.author &&
      project.category &&
      project.github &&
      project.image &&
      project.language &&
      project.url
    ) {
      createProject({
        variables: {
          name: project.name,
          author: project.author,
          url: project.url,
          github: project.github,
          image: project.image,
          language: project.language,
          category: project.category,
          key: session,
        },
      });
      setProject({
        name: "",
        author: "oyekanmi",
        url: "",
        github: "",
        image: "",
        language: "",
        category: "",
      });
    }
  };

  return (
    <section className="Dashboard__home" onSubmit={onsubmit}>
      <form action="">
        <div className="Dashboard__form--group">
          <label className="Dashboard__label">name</label>
          <input
            type="text"
            value={project.name}
            name="name"
            onChange={(e) => onchange(e)}
            className="Dashboard__input"
          />
        </div>
        <div className="Dashboard__form--group">
          <label className="Dashboard__label">author</label>
          <input
            type="text"
            value={project.author}
            name="author"
            onChange={(e) => onchange(e)}
            className="Dashboard__input"
          />
        </div>
        <div className="Dashboard__form--group">
          <label className="Dashboard__label">url</label>
          <input
            type="text"
            value={project.url}
            name="url"
            onChange={(e) => onchange(e)}
            className="Dashboard__input"
          />
        </div>
        <div className="Dashboard__form--group">
          <label className="Dashboard__label">github link</label>
          <input
            type="text"
            value={project.github}
            name="github"
            onChange={(e) => onchange(e)}
            className="Dashboard__input"
          />
        </div>
        <div className="Dashboard__form--group">
          <label className="Dashboard__label">image</label>
          <input
            type="file"
            name="image"
            onChange={(e) => onchangeImage(e)}
            className="Dashboard__input"
          />
        </div>
        {loading && <p className="Dashboard__atten">Loading...</p>}
        {project.image && (
          <img
            className="Dashboard__Image"
            src={project.image}
            alt={project?.name + " image"}
          />
        )}
        {errors && <p className="Dashboard__atten">{errors}</p>}
        <div className="Dashboard__form--group">
          <label className="Dashboard__label">category</label>
          <select
            onChange={(e) => changeCategory(e)}
            className="Dashboard__input"
          >
            <option className="" value="">
              Choose Categories
            </option>
            {categories.data &&
              categories.data.getAllCategory.map((cate) => {
                return (
                  <option className="" key={cate._id} value={cate._id}>
                    {cate.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="Dashboard__form--group">
          <label className="Dashboard__label">languange</label>
          <select
            onChange={(e) => changeLanguage(e)}
            className="Dashboard__input"
            defaultValue={""}
          >
            <option className="" value="">
              Choose Languages
            </option>
            {languages.data &&
              languages.data.getAllLanguage.map((cate) => {
                return (
                  <option
                    className="text-[2rem] p-8 font-semibold"
                    key={cate._id}
                    value={cate._id}
                  >
                    {cate.name}
                  </option>
                );
              })}
          </select>
        </div>

        <button type="submit" className="Dashboard__submit">
          save
        </button>
      </form>
    </section>
  );
}

export default DashBoard;
