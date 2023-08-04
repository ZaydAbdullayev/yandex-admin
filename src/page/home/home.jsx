import React, { useState, useEffect } from "react";
import "./home.css";
import { ApiGetService, ApiUpdateService } from "../../service/api.service";
import { useDispatch, useSelector } from "react-redux";
import { acUpload } from "../../redux/upload";
import { BsCheck2All } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

export const Home = () => {
  const user = JSON.parse(localStorage.getItem("user")) || [];
  const [stution, setStution] = useState(false);
  const [orders, setOrders] = useState([]);
  const id = user?.user?.id;
  const dispatch = useDispatch();
  const newOrder = useSelector((state) => state.upload);

  useEffect(() => {
    setTimeout(() => {
      ApiGetService.fetching(`get/orders/${id}`)
        .then((res) => {
          setOrders(res?.data?.innerData);
        })
        .catch((err) => console.log(err));
    }, 1000);
  }, [id, newOrder]);

  // to find oreder stution
  const orderStution = (order) => {
    ApiUpdateService.fetching(
      `update/order/${order?.order_id}/${order?.product_id}/${order?.status}`
    )
      .then((res) => {
        dispatch(acUpload());
      })
      .catch((err) => console.log(err));
  };

  // to accept order's product by id
  const orderAccept = (order) => {
    ApiUpdateService.fetching(`update/status/${order.order_id}`, {
      status: order.status,
    })
      .then((res) => {
        setStution(order.order_id);
        dispatch(acUpload());
      })
      .catch((err) => console.log(err));
  };

  // to accept order's all products
  const acceptAllProduct = (order) => {
    ApiUpdateService.fetching(`update/order/${order.id}/${order.status}`)
      .then((res) => {
        dispatch(acUpload());
      })
      .catch((err) => console.log(err));
  };

  const currentOrder = orders.filter((item) => item.status === 0);
  return (
    <div className="home_page">
      <div className="oreders">
        <h1>All Orders</h1>
        <div className="orders_body">
          {currentOrder?.map((order) => {
            const products = JSON.parse(order?.product_data);
            const first = products.find(({ status }) => status === "1");
            const status = products.find(({ status }) => status === "2");
            const change = products.find(({ status }) => status === "3");
            const time = order.receivedAt
              .substring(0, 19)
              .split("T")
              .join(" | ");
            return (
              <div
                key={order?.id}
                className={stution === order.id ? "accepted" : ""}
              >
                <figure className="order_item ">
                  <div>
                    Buyurtmachi : {order.user_id}{" "}
                    <span>buyurtma idsi : {order?.id}</span>{" "}
                    <div className="btn_box">
                      <button
                        onClick={() =>
                          orderAccept({ order_id: order.id, status: 2 })
                        }
                      >
                        Hammasini bekor qilish
                      </button>
                      <button
                        onClick={() =>
                          acceptAllProduct({ id: order.id, status: 2 })
                        }
                      >
                        Hammasini qabul qilish
                      </button>
                    </div>
                  </div>
                  {products?.map((product) => {
                    return (
                      <figcaption key={product?.id}>
                        <img src={product.img} alt="foto" />
                        <pre>
                          <p style={{ textTransform: "capitalize" }}>
                            {product?.name}
                          </p>
                          <p>{product?.description}</p>
                        </pre>
                        <p>{product?.quantity} ta</p>
                        <span>{product?.quantity * product?.price} so'm</span>
                        <div className="order_stution">
                          {product?.status === "2" ? (
                            <>
                              <BsCheck2All style={{ color: "#3CE75B" }} />
                            </>
                          ) : product?.status === "3" ? (
                            <>
                              <RxCross1 style={{ color: "#ff0000" }} />
                            </>
                          ) : (
                            <>
                              <span>Ushbu buyurtmani qabul qilasizmi?</span>
                              <button
                                onClick={() =>
                                  orderStution({
                                    order_id: order?.id,
                                    product_id: product?.id,
                                    status: 3,
                                  })
                                }
                              >
                                Bekor qilish
                              </button>
                              <button
                                onClick={() =>
                                  orderStution({
                                    order_id: order?.id,
                                    product_id: product?.id,
                                    status: 2,
                                  })
                                }
                              >
                                Qabul qilish
                              </button>
                            </>
                          )}
                        </div>
                      </figcaption>
                    );
                  })}
                  <p className="time">{time}</p>
                </figure>
                <div className="order_footer">
                  <button
                    style={
                      change
                        ? {
                            marginTop: "1.5%",
                            zIndex: "9",
                          }
                        : {}
                    }
                  >
                    backword
                  </button>
                  <button
                    onClick={
                      !first &&
                      (() => orderAccept({ order_id: order.id, status: 1 }))
                    }
                    style={status ? { marginTop: "1.5%", zIndex: "9" } : {}}
                  >
                    Tayyorlashga berish
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
