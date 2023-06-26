import React, { useState } from "react";
import "./restaurant.css";
import axios from "axios";

import { MdOutlineAddBusiness } from "react-icons/md";

const base_url = process.env.REACT_APP_BASE_URL;
export const Restaurant = () => {
  const [files, setFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    console.log(data);

    const config = {
      url: `${base_url}/add/restaurant`,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },

      data: data,
    };
    axios(config)
      .then((res) => {
        console.log(res);
        e.target.reset();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("done");
      });
  };

  const takeImg = (e) => {
    const file = e.target.files[0];
    const img = URL.createObjectURL(file);
    setFiles([img]);
  };

  return (
    <div className="restaurant_box">
      <form className="add_reastaurant" onSubmit={handleSubmit}>
        <label
          style={files.length ? { border: "none" } : {}}
          className="add_img"
        >
          {files.length ? "" : <MdOutlineAddBusiness />}
          <input
            type="file"
            name="img"
            accept="image/jpg, image/jpeg, image/png"
            required
            onChange={takeImg}
          />
          {files.length > 0 && (
            <img src={files[0]} alt="Selected" className="selected_image" />
          )}
        </label>
        <input
          type="text"
          name="name"
          placeholder="Restoran nomini kiriting"
          required
        />
        <div className="delivery_time">
          <p>Yetkazib berish vaqtini kiriting</p>
          <label>
            <input type="number" name="delivery_time_from" required />
            <p>dan</p>
            <input type="number" name="delivery_time_till" required />
            <p>gacha</p>
          </label>
        </div>
        <input
          type="text"
          name="review_count"
          placeholder="Sharhlar soni"
          required
        />
        <input
          type="text"
          name="rating"
          placeholder="Restoranning reytingi"
          required
        />
        <input type="submit" value="Qo'shish" />
      </form>
    </div>
  );
};

export const Customer = () => {
  return (
    <div className="curtomer">
      <h1>Sizga bu sahifaga kirish uchun ruxsat berilmagan!!!</h1>
    </div>
  );
};
