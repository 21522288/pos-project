import React, { useState, useMemo, useEffect } from 'react';
import Header from "../../components/Header/Header";
import ProductItem from '../../components/ProductItem/ProductItem';
import ProductInCard from '../../components/ProductInCard/ProductInCard';
import headerStyles from '../../components/Header/Header.module.css';
import styles from './PosScreen.module.css';
import Api from '../../apis/Api';

// products will be loaded from API

function parsePrice(priceStr = '$0') {
  return Number((priceStr + '').replace(/[^0-9.-]+/g, '')) || 0;
}
function formatPrice(n = 0) {
  return `$${new Intl.NumberFormat('vi-VN').format(n)}`;
}

const PosScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await Api.getAllProducts();
        if (mounted) setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load products', err);
        if (mounted) setError('Không tải được sản phẩm');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);
  
  const createOrder = async () => {
    if (cart.length === 0) {
      alert('Giỏ hàng trống!');
      return;
    }

    try {
      // Build order payload
      const orderPayload = {
        OrderItems: cart.map(item => ({
          ProductId: item.id,
          Name: item.title,
          Qty: item.qty,
          Price: item.price,
        })),
      };

      const response = await Api.createOrder(orderPayload);
      
      // Success
      alert(`Thanh toán thành công! Mã đơn: ${response.orderId || 'N/A'}`);
      clearCart();
      
    } catch (error) {
      console.error('Create order failed:', error);
      alert('Tạo đơn thất bại. Vui lòng thử lại!');
    }
  };

  const addToCart = (product) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { id: product.id, title: product.title, image: product.image||'', price: product.price|| '$0.00', size: product.subtitle, qty: 1 }];
    });
  };

  const increment = (id) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
  const decrement = (id) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty - 1) } : i).filter(i => i.qty > 0));
  const remove = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const clearCart = () => setCart([]);

  const summary = useMemo(() => {
    const items = cart.reduce((s, it) => s + it.qty, 0);
    const subtotal = cart.reduce((s, it) => s + parsePrice(it.price) * it.qty, 0);
    const payable = subtotal;
    return { items, subtotal, payable };
  }, [cart]);

  return (
    <main>
      <div className={`container-fluid ${styles.pageWrapper}`}>
        <div className={styles.layout}>
          {/* Left: product grid */}
          <section className={styles.left}>
            {loading ? (
              <div className="d-flex justify-content-center py-4">
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger" role="alert">{error}</div>
            ) : (
              <div className="row g-2">
                {(products || []).map(p => (
                  <ProductItem
                    key={p.id}
                    image={p.image}
                    title={p.title}
                    subtitle={p.subtitle}
                    price={formatPrice(p.price)}
                    onAdd={() => addToCart(p)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Right: order summary with product-in-card list + totals */}
          <aside className={styles.right}>
            <div className="card" style={{ width: '95%' }}>
              <div className="card-body">
                <h5 className="card-title mb-3">Order Summary</h5>

                {/* list of items in cart */}
                <div>
                  {cart.length === 0 ? (
                    <p className="text-muted">No items in cart.</p>
                  ) : (
                    cart.map(item => (
                      <ProductInCard
                        key={item.id}
                        image={item.image}
                        title={item.title}
                        size={item.size}
                        price={formatPrice(item.price)}
                        qty={item.qty}
                        onIncrement={() => increment(item.id)}
                        onDecrement={() => decrement(item.id)}
                        onRemove={() => remove(item.id)}
                        onViewDetails={() => {}}
                      />
                    ))
                  )}
                </div>

                {/* summary table */}
                <div className="mt-3">
                  <div className="table-responsive">
                    <table className="table table-bordered bg-light-subtle">
                      <tbody>
                        <tr>
                          <td><p className="d-flex mb-0 align-items-center gap-1">Items :</p></td>
                          <td className="text-end text-dark fw-medium">{summary.items} (Items)</td>
                        </tr>
                        <tr>
                          <td><p className="d-flex mb-0 align-items-center gap-1">Subtotal :</p></td>
                          <td className="text-end text-dark fw-medium">{formatPrice(summary.subtotal)}</td>
                        </tr>
                        <tr>
                          <td><p className="d-flex mb-0 align-items-center gap-1 fw-semibold text-danger">Payable Amount :</p></td>
                          <td className="text-end text-success fw-semibold">{formatPrice(summary.payable)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* action buttons */}
                <div className="gap-1 hstack mt-3">
                  <button type="button" className="btn btn-danger w-100" onClick={clearCart}>
                    <i className="ri-close-circle-line me-1"></i> Cancel
                  </button>
                  <button type="button" className="btn btn-primary w-100" onClick={createOrder}>
                    <i className="ri-shopping-basket-2-line me-1"></i> Payment
                  </button>
                </div>

              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
export default PosScreen;