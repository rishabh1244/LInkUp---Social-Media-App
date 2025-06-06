import AuthBox from './AuthBox'
import styles from "./Auth.module.css"

export default function Auth() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <AuthBox />
        <div className={styles.background}>
          <div className={styles.overlay}>
            <h1 className={styles.title}>Welcome to Social Media</h1>
            <p className={styles.subtitle}>Connect with your friends and the world around you.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
