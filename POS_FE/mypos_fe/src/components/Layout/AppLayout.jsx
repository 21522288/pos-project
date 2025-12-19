import React, { useState } from 'react';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import stylesHeader from '../Header/Header.module.css';
import styles from './AppLayout.module.css'

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <>
      <div className={styles.app}>
        <Header onToggle={toggleSidebar} />

        <SideBar isOpen={sidebarOpen} />
        <main className={` ${styles.content}`} style={{ marginLeft: sidebarOpen ? 220 : 0, width: sidebarOpen ? '80vw' : '100vw', marginTop:'80px' }}>
           {children}
        </main>
      </div>
    </>
  );
}