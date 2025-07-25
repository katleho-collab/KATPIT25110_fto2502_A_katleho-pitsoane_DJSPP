import styles from "./Error.module.css"

/**
 * Error component displays an error message.
 *
 * @param {Object} props
 * @param {string} props.message - The error message to display.
 * @param {React.ReactNode} props.children - Optional child elements (e.g., a "Back to Home" link).
 * @returns {JSX.Element} The rendered error message.
 */
export default function Error({ message, children }) {
  return (
    <div className={styles.messageContainer}>
      <div className={styles.error}>
        <h3>Error!</h3>
        <p>{message}</p>
        {children}
      </div>
    </div>
  )
}
