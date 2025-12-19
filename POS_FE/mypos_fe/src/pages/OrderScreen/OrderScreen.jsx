import { useEffect, useState } from "react";
import headerStyles from '../../components/Header/Header.module.css';
import styles from './OrderScreen.module.css';
import { connection, startConnection } from '../../services/signalRService';
import Api from '../../apis/Api';



function formatCurrency(n){ return `$${new Intl.NumberFormat('vi-VN').format(n)}`; }
function formatDateTime(dateStr) {
  const date = new Date(dateStr);

  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
export default function OrderScreen(){
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await Api.getAllOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load orders', err);
      setError('Không tải được danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
    startConnection();

    connection.on("OrderCreated", (order) => {
      console.log("New order received via SignalR:", order);
      setOrders((prev) => [order, ...prev]);
    });

    return () => {
      connection.off("OrderCreated");
    };
  }, []);
  return (
    <main>
      <div className={`container-fluid ${styles.wrapper}`}>
          <div className={`card ${styles.cardWrapper}`}>
          <div className="card-body">
            <div className={styles.cardHeader}>
              <h5 className="mb-0">Orders Summary</h5>
            </div>

        {loading ? (
          <div className="d-flex justify-content-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">{error}</div>
        ) : (
        <div className="table-responsive">
          <table className="table align-middle mb-0 table-hover table-centered">
            <thead className="bg-light-subtle fs-12 text-uppercase">
              <tr>
                <th>Order No.</th>
                <th>Items Name</th>
                <th>Quantity</th>
                <th>Price Per Item</th>
                <th>Total Price</th>
                <th>Payment Date&Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => {
                const total = order.items.reduce((s,it) => s + it.qty * it.price, 0);
                return (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>
                      {order.items.map((it, idx) => (
                        <p className="mb-1" key={idx}>
                          <span className="fw-semibold text-dark me-1">{idx+1}.</span>{it.name}
                        </p>
                      ))}
                    </td>

                    <td>
                      {order.items.map((it, idx) => (
                        <p className="mb-1" key={idx}>{it.qty}</p>
                      ))}
                    </td>

                    <td>
                      {order.items.map((it, idx) => (
                        <p className="mb-1" key={idx}>{formatCurrency(it.price)}</p>
                      ))}
                    </td>
                    <td>
                      <p className="mb-0 fw-bold">{formatCurrency(total)}</p>
                    </td>

                    <td>{formatDateTime(order.date)}</td>
                
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        )}
      </div>
       </div>
          </div>
    </main>
  );
}