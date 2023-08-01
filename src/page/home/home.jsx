import React, { useState, useEffect } from "react";
import "./home.css";

import img from "../../assets/images/kokteyl.jpg";
import { BsCheck2All } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

export const Home = () => {
  const [stution, setStution] = useState(null);
  return (
    <div className="home_page">
      <div className="oreders">
        <h1>All Orders</h1>
        <div className="orders_body">
          <figure className="order_item">
            <div>
              Buyurtmachi : <span>buyurtma raqami :</span>{" "}
              <div className="btn_box">
                <button>Hammasini bekor qilish</button>
                <button>Hammasini qabul qilish</button>
              </div>
            </div>
            <figcaption>
              <img src={img} alt="foto" />
              <pre>
                <p>name</p>
                <p>describtion</p>
              </pre>
              <p>?? ta</p>
              <span>price so'm</span>
              <div className="order_stution">
                {stution === 1 ? (
                  <>
                    <BsCheck2All style={{ color: "#26db26" }} />
                  </>
                ) : stution === 0 ? (
                  <>
                    <RxCross1 style={{ color: "red" }} />
                  </>
                ) : (
                  <>
                    <span>Ushbu buyurtmani qabul qilasizmi?</span>
                    <button onClick={() => setStution(0)}>Bekor qilish</button>
                    <button onClick={() => setStution(1)}>Qabul qilish</button>
                  </>
                )}
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
};
