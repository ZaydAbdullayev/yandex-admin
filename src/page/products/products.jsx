import React, { useState, useEffect } from "react";
import "./products.css";
import { Link, useLocation } from "react-router-dom";
import {
  ApiGetService,
  ApiUpdateService,
  ApiDeleteService,
} from "../../service/api.service";
import { NumericFormat } from "react-number-format";
import { useSelector, useDispatch } from "react-redux";
import { acUpload } from "../../redux/upload";

import { GoSearch } from "react-icons/go";
import { AiFillDelete } from "react-icons/ai";
import { FaPen, FaCheck } from "react-icons/fa";

const categorys = [
  "ichimliklar",
  "shashliklar",
  "lavashlar",
  "fast food",
  "palov",
  "bishteks",
  "steyklar",
  "gamburgerlar",
  "hot doglar",
];

export const Products = () => {
  const user_id = JSON.parse(localStorage.getItem("user"))?.user?.id;
  const { search, pathname } = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(null);
  const [update, setUpdate] = useState(false);
  const upload = useSelector((state) => state.upload);
  const dispatch = useDispatch();

  console.log(products);

  useEffect(() => {
    ApiGetService.fetching(`get/products/${user_id}`)
      .then((res) => {
        setProducts(res?.data?.innerData);
      })
      .catch((err) => console.log(err));
  }, [user_id, upload]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const category = (search && decodeURIComponent(search.split("=")[1])) || "";

  const filteredProducts = products?.filter((product) => {
    const categoryMatches =
      category === "" ||
      product?.category?.toLowerCase().includes(category.toLowerCase());
    const nameMatches = product?.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return categoryMatches && nameMatches;
  });

  const handleUpdate = (product) => {
    ApiUpdateService.fetching(`update/product/${product.id}`, product)
      .then((res) => {
        console.log(res);
        dispatch(acUpload());
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="product_list">
      <div className="search_container">
        <p>Barcha mahsulotlar ro'yxati</p>
        <form className="search_box">
          <button type="button">
            <GoSearch />
          </button>
          <input
            type="search"
            name="foundname"
            placeholder="Qidirish ? "
            value={searchTerm}
            onChange={handleSearch}
          />
        </form>
      </div>
      <div className="search_src">
        <Link to={pathname}>All</Link>
        {categorys.map((group) => (
          <Link to={`?q/gr=${encodeURIComponent(group)}`} key={group}>
            {group}
          </Link>
        ))}
      </div>

      <div className="all_products">
        {filteredProducts?.map((product) => (
          <div className="item" key={product.id}>
            <label className="img_box">
              <input
                type="file"
                accept="image/*"
                // onChange={(e) => handleUploadImg(e.target.files[0])}
              />
              <img src={product?.img} alt="foto" />
            </label>
            <p style={{ textTransform: "capitalize" }}>{product.name}</p>
            <p style={{ flex: "1" }}>{product.description}</p>
            <NumericFormat
              displayType="text"
              value={product.price}
              thousandSeparator=" "
              suffix=" so'm"
            />
            <div className="status">
              <span
                style={
                  product.status === 1
                    ? { background: "#33ff0989" }
                    : { color: "#aaaa" }
                }
                onClick={() => handleUpdate({ id: product.id, status: 1 })}
              >
                active
              </span>
              <span
                style={
                  product.status === 0
                    ? { background: "#d82" }
                    : { color: "#aaaa" }
                }
                onClick={() => handleUpdate({ id: product.id, status: 0 })}
              >
                passive
              </span>
            </div>
            <button
              style={{
                fontSize: "var(--fs5)",
                color: "#33ff09",
              }}
            >
              {update === product?.id ? (
                <span>
                  <FaCheck />
                </span>
              ) : (
                <span onClick={() => setUpdate(product.id)}>
                  <FaPen />
                </span>
              )}
            </button>
            <button style={{ fontSize: "var(--fs4)", color: "#d82a0c" }}>
              <AiFillDelete />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
