import styles from './Header.module.css'

const Header = ({ onToggle }) => {
  return (
    <header className={styles.appheader}>
      
      <div className="d-flex align-items-center">
        <button
          type="button"
          className={`${styles.buttonToggleMenu} btn d-flex`}
          aria-label="Show Full Sidebar"
          onClick={onToggle}
        >
          <i className={`ri-menu-2-line ${styles.icon} text-white`}></i>
        </button>
      </div>

      <div className="flex-grow-1 text-center fw-bold text-white">
        MyPOS
      </div>

      <div className="d-flex align-items-center">
        {/* action bên phải nếu cần */}
      </div>

    </header>
  )
}

export default Header
