
import React, { useState } from "react";
import "./addproduct.css";
import axios from "axios";
import { MdAllInbox } from "react-icons/md";
import { useSnackbar } from "notistack";

const base_url = process.env.REACT_APP_BASE_URL;
export const Addproduct = () => {
  const [files, setFiles] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());

    const config = {
      url: `${base_url}/add/product`,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },

      data: data,
    };
    axios(config)
      .then((res) => {
        console.log(res.response.message);
        const msg = "Maxsulot muaffaqiyatli qoshildi";
        enqueueSnackbar(msg, { variant: "success" });
        e.target.reset();
      })
      .catch((err) => {
        const msg = "Maxsulot qoshishda xatolik yuz berdi ";
        enqueueSnackbar(msg, { variant: "error" });
        console.log(err);
        e.target.reset();
      });
  };

  const takeImg = (e) => {
    const file = e.target.files[0];
    const img = URL.createObjectURL(file);
    setFiles([img]);
  };

  return (

    <div className="product_box">
      <form className="add_product" onSubmit={handleSubmit}>
 <div>
 <label
          style={files.length ? { border: "none" } : {}}
          className="product_img"
        >
          {files.length ? "" : <MdAllInbox />}
          <input
            type="file"
            name="img"
            accept="image/*"
            required
            onChange={takeImg}
            id="image"
          />
          {files.length > 0 && (
            <img src={files[0]} alt="Selected" className="selected_image" />
          )}
        </label>
 </div>
     <div>
     <input
          type="text"
          name="name"
          placeholder="Maxsulot nomini kiriting"
          required
        />
        <input
          type="number"
          name="review_count"
          placeholder="Maxsulot narxini kiriting"
          required
        />
        <input
          type="text"
          name="text"
          placeholder="Maxsulot haqida tavsif"
          required
        />
        <input type="submit" value="Qo'shish" />
     </div>
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

