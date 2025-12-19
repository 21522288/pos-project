import React from 'react';
import styles from './ProductInCard.module.css';

export default function ProductInCard({
  image = 'assets/images/food-icon/pic12.png',
  title = 'Italian Burata Pizza',
  size = '12-Inch',
  price = '$12.00',
  qty = 1,
  onIncrement = () => {},
  onDecrement = () => {},
  onRemove = () => {},
  onViewDetails = () => {}
}) {
  return (
    <div className={`mt-3 border border-dark p-2 p-2 rounded ${styles.root}`}>
      <div className="d-flex flex-wrap align-items-center gap-3">
        <div className={`rounded bg-light d-flex align-items-center justify-content-center ${styles.avatarWrap}`}>
          <img src={image} alt={title} className={`img-fluid ${styles.avatarImg}`} />
        </div>

        <div>
          <a href="#!" onClick={(e) => { e.preventDefault(); onViewDetails(); }} className="text-dark fs-15 fw-bold">{title}</a>
          <p className="fs-14 my-1">{size}</p>
        </div>

        <div className="ms-lg-auto">
          <div className={`border bg-body-secondary p-1 mt-1 rounded d-inline-flex overflow-visible ${styles.inputStep}`}>
            <button
              type="button"
              className={`bg-light text-dark border-0 rounded fs-20 lh-1 ${styles.stepBtn}`}
              onClick={onDecrement}
              aria-label="Decrease quantity"
            >
              −
            </button>

            <input
              type="number"
              className={`text-dark text-center border-0 bg-body-secondary rounded h-100 ${styles.qtyInput}`}
              value={qty}
              min="0"
              max="100"
              readOnly
              aria-label="Quantity"
            />

            <button
              type="button"
              className={`bg-light text-dark border-0 rounded fs-20 lh-1 ${styles.stepBtn}`}
              onClick={onIncrement}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <hr />

      <div className="d-flex align-items-center justify-content-between px-1">
        <div>
          <p className="text-dark fw-semibold fs-16 mb-0">
            {price} 
          </p>
        </div>

        <div className="d-flex align-content-center gap-1">
          <button
            type="button"
            className="btn btn-soft-danger avatar-sm rounded d-flex align-items-center justify-content-center"
            onClick={onRemove}
            aria-label="Remove item"
          >
            <i className="ri-delete-bin-5-line align-middle fs-20"></i>
          </button>
        </div>
      </div>
    </div>
  );
}