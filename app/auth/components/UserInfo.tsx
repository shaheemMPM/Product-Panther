import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Link, useMutation } from "blitz"
import logout from "../mutations/logout"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  if (currentUser) {
    return (
      <>
        <div className="flex flex-row space-x-4 justify-center items-center mt-4">
          <Link href="/products">
            <a className="button small ml-auto hover:text-blue-600">My Products</a>
          </Link>
          <Link href="/requests">
            <a className="button small ml-auto hover:text-blue-600">My Requests</a>
          </Link>
          <button
            className="button small ml-auto hover:text-red-600"
            onClick={async () => {
              await logoutMutation()
            }}
          >
            Logout
          </button>
        </div>
      </>
    )
  } else {
    return (
      <div className="flex flex-row space-x-4 justify-center items-center mt-4">
        <Link href="/signup">
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href="/login">
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </div>
    )
  }
}

export default UserInfo
