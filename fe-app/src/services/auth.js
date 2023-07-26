export default function isAuthenticated() {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    return true
  } else {
    return false
  }
}
