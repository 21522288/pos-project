import React from 'react';
import styles from './ProductItem.module.css';

export default function ProductItem({
  image,
  title,
  subtitle,
  price,
  onAdd = () => {}
}) {
  return (
    <div className="col-12 col-sm-6 col-md-4">
      <div className={`card ${styles.cardRoot}`}>
        <div className="card-body">
          <div className={`position-relative text-center bg-light ${styles.imgWrap}`}>
            <img src={image} alt={title} className="img-fluid rounded" />
          </div>

          <div className="d-flex align-items-center justify-content-between gap-2 mt-3">
            <div>
              <a href="#!" className={`text-dark fs-16 fw-semibold ${styles.title}`}>{title}</a>
              <p className="fs-5 fw-normal mb-0">{subtitle}</p>
            </div>

           
          </div>
        </div>

        <div className="card-footer">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <p className="text-primary mb-0 fw-medium mb-1 fs-14">Price</p>
              <p className="text-dark fw-semibold fs-16 mb-0">
                {price} 
              </p>
            </div>

            <div className="d-flex align-content-center gap-1">
              <button
                type="button"
                className="btn btn-soft-primary avatar-sm rounded d-flex align-items-center justify-content-center"
                onClick={onAdd}
                aria-label="Add to cart"
              >
                <i className="ri-shopping-basket-2-line align-middle fs-20"></i>
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}