import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideBar.module.css';

export default function SideBar({ isOpen = false }) {
  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
      aria-label="Sidebar"
    >
      <nav className={styles.nav}>
        <NavLink
          to="/pos"
          end
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          aria-label="POS"
        >
          <i className={`ri-mac-line ${styles.icon}`} />
          <span className={styles.label}>POS</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          aria-label="Orders"
        >
          <i className={`ri-shopping-cart-line ${styles.icon}`} />
          <span className={styles.label}>Orders</span>
        </NavLink>
      </nav>
    </aside>
  );
}