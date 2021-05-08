import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRequest from "app/requests/queries/getRequest"
import deleteRequest from "app/requests/mutations/deleteRequest"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const RequestActions = (requestId) => {
  const currentUser = useCurrentUser()
  const router = useRouter()
  const [deleteRequestMutation] = useMutation(deleteRequest)
  if (currentUser) {
    return (
      <div className="mt-5 mb-10">
        <Link href={Routes.EditRequestPage({ requestId: String(requestId.requestId) })}>
          <a className="hover:text-blue-600">Edit</a>
        </Link>

        <button
          type="button"
          className="hover:text-red-600"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteRequestMutation({ id: requestId.requestId })
              router.push(Routes.RequestsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    )
  }
  return <div></div>
}

export const Request = () => {
  const requestId = useParam("requestId", "number")
  const [request] = useQuery(getRequest, { id: requestId })

  return (
    <>
      <Head>
        <title>Request {request.title}</title>
      </Head>

      <div>
        <h1 className="font-bold font-sans break-normal text-gray-900 pt-6text-2xl md:text-2xl">
          {request.title}
        </h1>
        <h1 className="font-semibold font-sans break-normal text-gray-900 pt-6 pb-2 text-lg">
          Product : {request?.product?.name}
        </h1>
        <p className="text-sm md:text-base font-normal text-gray-600">{request.description}</p>
        <RequestActions requestId={request.id} />
      </div>
    </>
  )
}

const ShowRequestPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Request />
      </Suspense>
    </div>
  )
}

ShowRequestPage.authenticate = true
ShowRequestPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowRequestPage
