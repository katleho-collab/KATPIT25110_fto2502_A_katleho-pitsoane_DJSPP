/**
 * Formats an ISO date string into a more readable "DD/MM/YYYY" format.
 *
 * @param {string} isoString - The ISO date string to format (e.g., "2023-10-26T10:00:00.000Z").
 * @returns {string} The formatted date string (e.g., "26/10/2023").
 */
export function formatDate(isoString) {
  const date = new Date(isoString)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0") // Months are 0-indexed
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
