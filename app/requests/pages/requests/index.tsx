import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRequests from "app/requests/queries/getRequests"

const ITEMS_PER_PAGE = 100

export const RequestsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ requests, hasMore }] = usePaginatedQuery(getRequests, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            <Link href={Routes.ShowRequestPage({ requestId: String(request.id) })}>
              <a>{request.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const RequestsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Requests</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <RequestsList />
        </Suspense>
      </div>
    </>
  )
}

RequestsPage.authenticate = true
RequestsPage.getLayout = (page) => <Layout>{page}</Layout>

export default RequestsPage
