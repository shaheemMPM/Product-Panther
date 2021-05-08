import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRequests from "app/requests/queries/getRequests"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const ITEMS_PER_PAGE = 15

export const RequestsList = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ requests, hasMore }] = usePaginatedQuery(getRequests, {
    where: { userId: currentUser?.id },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul className="grid grid-cols-12">
        {requests?.map((request) => {
          return (
            <li key={request.id} className="border p-4 col-span-4">
              <h2 className="font-bold text-lg">{request.title}</h2>
              <Link href={Routes.ShowRequestPage({ requestId: String(request.id) })}>
                <a className="text-blue-500 underline">View request</a>
              </Link>
            </li>
          )
        })}
      </ul>

      <div className="flex flex-row mt-5">
        <button disabled={page === 0} onClick={goToPreviousPage} className="hover:text-blue-600">
          <span className="leading-7 pr-1 align-middle">&lt;</span>
          <span className="align-middle">previous</span>{" "}
        </button>
        <button disabled={!hasMore} onClick={goToNextPage} className="ml-auto hover:text-blue-600">
          <span className="align-middle">next</span>{" "}
          <span className="leading-7 align-middle pl-1">&gt;</span>
        </button>
      </div>
    </div>
  )
}

const RequestsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Requests</title>
      </Head>

      <div className="mt-10">
        <div className="flex flex-row mb-5">
          <h1 className="text-2xl font-medium text-primary text-center">My Requests</h1>
        </div>

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
