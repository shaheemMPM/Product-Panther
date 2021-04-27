import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRequest from "app/requests/queries/getRequest"
import deleteRequest from "app/requests/mutations/deleteRequest"

export const Request = () => {
  const router = useRouter()
  const requestId = useParam("requestId", "number")
  const [deleteRequestMutation] = useMutation(deleteRequest)
  const [request] = useQuery(getRequest, { id: requestId })

  return (
    <>
      <Head>
        <title>Request {request.id}</title>
      </Head>

      <div>
        <h1>Request {request.id}</h1>
        <pre>{JSON.stringify(request, null, 2)}</pre>

        <Link href={Routes.EditRequestPage({ requestId: String(request.id) })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteRequestMutation({ id: request.id })
              router.push(Routes.RequestsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowRequestPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.RequestsPage()}>
          <a>Requests</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Request />
      </Suspense>
    </div>
  )
}

ShowRequestPage.authenticate = true
ShowRequestPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowRequestPage
