import React, { useEffect, useState } from "react";
import "./makingFoods.css";
import { useSelector, useDispatch } from "react-redux";
import { ApiGetService, ApiUpdateService } from "../../service/api.service";
import { acUpload } from "../../redux/upload";

export const MakingFoods = () => {
  const user = JSON.parse(localStorage.getItem("user")) || [];
  const newOrder = useSelector((state) => state.upload);
  const [orders, setOrders] = useState([]);
  const [stution, setStution] = useState(null);
  const id = user?.user?.id;
  const dispatch = useDispatch();

  useEffect(() => {
    ApiGetService.fetching(`get/orders/${id}`)
      .then((res) => {
        setOrders(res?.data?.innerData);
      })
      .catch((err) => console.log(err));
  }, [id, newOrder]);

  const orderAccept = (order) => {
    setStution(order.order_id);
    ApiUpdateService.fetching(`update/status/${order.order_id}`, {
      status: order.status,
    })
      .then((res) => {
        dispatch(acUpload());
      })
      .catch((err) => console.log(err));
  };

  const currentOrder = orders?.filter((item) => item.status === 1);

  return (
    <div className="making_foods_box">
      <h1>Tayyorlanayotgan taomlar</h1>
      <div className="orders_body">
        {currentOrder?.map((order) => {
          const products = JSON.parse(order?.product_data);
          const time = order.receivedAt.substring(0, 19).split("T").join(" | ");
          return (
            <div
              key={order?.id}
              className={stution === order.id ? "accepted" : ""}
            >
              <figure className="cooking_food">
                <div>
                  <span>buyurtma idsi : {order?.id}</span>{" "}
                  <button
                    onClick={() =>
                      orderAccept({ order_id: order.id, status: 2 })
                    }
                  >
                    Buyurtma tayyor
                  </button>
                </div>
                {products?.map((product) => {
                  return (
                    <figcaption key={product?.id} className="order_product">
                      <img src={product.img} alt="foto" />
                      <pre>
                        <p style={{ textTransform: "capitalize" }}>
                          {product?.name}
                        </p>
                        <p>{product?.describtion}</p>
                      </pre>
                      <p>{product?.quantity} ta</p>
                    </figcaption>
                  );
                })}
                <p className="time">{time}</p>
              </figure>
            </div>
          );
        })}
      </div>
    </div>
  );
};
