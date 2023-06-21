import axios from "axios";
import React, { useState } from "react";
import "./AddProduct.css";
import { acLoading } from "../../Redux/Loading";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function AddProduct() {
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(acLoading(true));
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    for (let item of files) {
      formData.append("img", item);
    }
    const config = {
      url: "https://server.pandashop.uz/fashion",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        key: "new",
      },

      data: formData,
    };
    axios(config)
      .then((res) => {
        navigate("/products");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => dispatch(acLoading(false)));
  };
  return (
    <div className="AddProduct">
      <form className="form-add-product" onSubmit={handleSubmit}>
        <label>
          <span>Maxsulot Nomi</span>
          <input
            type="text"
            name="name"
            placeholder="Kofta"
            required
            autoComplete="off"
          />
        </label>
        <label>
          <span>Mavsumi</span>
          <select name="season" required>
            <option value="Baxor">Baxor</option>
            <option value="Yoz">Yoz</option>
            <option value="Kuz">Kuz</option>
            <option value="Qish">Qish</option>
            <option value="">Barcha fasllar uchun</option>
          </select>
        </label>
        <label>
          <span>Kim Uchun</span>
          <select name="for_whom" required>
            <option value="men">Erkaklar Uchun</option>
            <option value="men">Ayollar Uchun</option>
            <option value="men">Bolalar Uchun</option>
          </select>
        </label>
        <label>
          <span>O'lchamlari</span>
          <input type="text" name="size" required placeholder="XX, XXL" />
        </label>
        <label>
          <span>Narxi</span>
          <input type="number" name="price" required placeholder="00000000" />
        </label>
        <label>
          <span>Turi</span>
          <input type="text" name="type" placeholder="Ko'ylak" />
        </label>
        <label className="select-file">
          <p>Maxsulot rasmlari</p>
          <input
            type="file"
            name="image"
            accept="image/jpg, image/jpeg, image/png"
            required
            onChange={(e) => {
              const imgData = [];
              for (let i = 0; i < e.target.files.length; i++) {
                imgData.push(e.target.files[i]);
              }
              setFiles(imgData);
            }}
          />
        </label>

        <div className="view-product-img">
          {files.map((item, index) => {
            const img = URL.createObjectURL(item);

            return (
              <figure key={index}>
                <img src={img} alt="" />
              </figure>
            );
          })}
        </div>
        <input type="submit" value="Yangi Maxsulot qo'shish" />
      </form>
    </div>
  );
}
