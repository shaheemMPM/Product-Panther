import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProducts from "app/products/queries/getProducts"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const ITEMS_PER_PAGE = 15

export const ProductsList = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ products, hasMore }] = usePaginatedQuery(getProducts, {
    where: { userId: currentUser?.id },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div className="mt-5">
      <ul className="grid grid-cols-12">
        {products?.map((product) => {
          return (
            <li key={product.id} className="border p-4 col-span-4">
              <h2 className="font-bold text-lg">{product.name}</h2>
              <Link href={`/products/${product.id}`}>
                <a className="text-blue-500 underline">View requests</a>
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

const ProductsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <div className="mt-10">
        <div className="flex flex-row">
          <h1 className="text-2xl font-medium text-primary text-center">My Products</h1>
          <Link href={Routes.NewProductPage()}>
            <a className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded text-white font-bold ml-auto">
              Create Product
            </a>
          </Link>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <ProductsList />
        </Suspense>
      </div>
    </>
  )
}

ProductsPage.authenticate = true
ProductsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ProductsPage
