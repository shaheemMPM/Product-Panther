import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProduct from "app/products/queries/getProduct"
import deleteProduct from "app/products/mutations/deleteProduct"
import voteOnRequest from "app/requests/mutations/voteOnRequest"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

export const Product = () => {
  const router = useRouter()
  const productId = useParam("productId", "number")
  const [deleteProductMutation] = useMutation(deleteProduct)
  const [voteOnRequestMutation] = useMutation(voteOnRequest)
  const [product] = useQuery(getProduct, { id: productId })
  const currentUser = useCurrentUser()

  return (
    <>
      <Head>
        <title>Product {product.id}</title>
      </Head>

      <div>
        <h1>Product {product.id}</h1>
        <header className="flex flex-row mb-4 items-center">
          <h2 className="text-base tracking-wider uppercase leading-tight font-semibold text-gray-600">
            Product Feature Requests
          </h2>
          <span className="ml-auto">
            <Link href="/requests/new">
              <a className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded text-white font-bold">
                New Request
              </a>
            </Link>
          </span>
        </header>
        <ul className="space-y-4 p-4 bg-gray-200 rounded">
          {product.requests.map((request, ind) => {
            return (
              <li className="p-4 shadow rounded flex flex-row space-x-4 bg-white" key={ind}>
                <div className="border rounded">
                  <button
                    onClick={async () => {
                      try {
                        await voteOnRequestMutation({
                          data: {
                            requestId: request.id,
                            userId: currentUser?.id,
                          },
                        })
                      } catch (error) {
                        alert("error")
                        console.log(error)
                      }
                    }}
                    className="flex flex-col space-y-4 p-3 rounded shadow-sm hover:bg-yellow-200"
                  >
                    <span>123</span>
                    <span>Vote</span>
                  </button>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl">{request.title}</span>
                  <span className="text-xl">{request.description}</span>
                </div>
              </li>
            )
          })}
        </ul>

        {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}

        <Link href={Routes.EditProductPage({ productId: String(product.id) })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteProductMutation({ id: product.id })
              router.push(Routes.ProductsPage())
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

const ShowProductPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ProductsPage()}>
          <a>Products</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Product />
      </Suspense>
    </div>
  )
}

ShowProductPage.authenticate = true
ShowProductPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowProductPage
