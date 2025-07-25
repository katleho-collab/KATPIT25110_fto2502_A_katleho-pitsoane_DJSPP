import styles from "./Loading.module.css"

/**
 * Loading component displays a spinner and a message while content is loading.
 *
 * @param {Object} props
 * @param {string} props.message - The message to display below the spinner.
 * @returns {JSX.Element} The rendered loading indicator.
 */
export default function Loading({ message = "Loading..." }) {
  return (
    <div className={styles.messageContainer}>
      <div className={styles.spinner}></div>
      <p>{message}</p>
    </div>
  )
}
