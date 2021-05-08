import { Suspense, useState } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProduct from "app/products/queries/getProduct"
import deleteProduct from "app/products/mutations/deleteProduct"
import voteOnRequest from "app/requests/mutations/voteOnRequest"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import classNames from "classnames"
import { useGetDay } from "app/core/hooks/getDate"
import Modal from "app/core/components/Modal"

const ProductActions = (productId) => {
  const currentUser = useCurrentUser()
  const router = useRouter()
  const [deleteProductMutation] = useMutation(deleteProduct)
  if (currentUser) {
    return (
      <div className="mt-5 mb-10">
        <Link href={Routes.EditProductPage({ productId: productId.productId })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteProductMutation({ id: Number(productId.productId) })
              router.push(Routes.ProductsPage())
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

const NewRequestButton = (productId) => {
  const currentUser = useCurrentUser()
  if (currentUser) {
    return (
      <span className="ml-auto">
        <Link href={`/requests/products/${productId.productId}/new`}>
          <a className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded text-white font-bold">
            New Request
          </a>
        </Link>
      </span>
    )
  } else {
    return (
      <span className="ml-auto">
        <Link href="/login">
          <a className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded text-white font-bold">
            New Request
          </a>
        </Link>
      </span>
    )
  }
}

export const Product = () => {
  const productId = useParam("productId", "number")
  const [voteOnRequestMutation] = useMutation(voteOnRequest)
  const [product, { refetch }] = useQuery(getProduct, { id: productId })
  const [isModal, setIsModal] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalBody, setModalBody] = useState("")
  const currentUser = useCurrentUser()

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>

      <div>
        <div className="font-sans">
          <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-2xl md:text-2xl">
            {product.name}
          </h1>
          <p className="text-sm md:text-base font-normal text-gray-600">
            Published {useGetDay(product.createdAt)}
          </p>
        </div>
        <p className="py-6">{product.description}</p>
        <header className="flex flex-row mb-4 mt-5 items-center">
          <h2 className="text-base tracking-wider uppercase leading-tight font-semibold text-gray-600">
            Product Feature Requests
          </h2>
          <NewRequestButton productId={product.id} />
        </header>
        <Modal
          title={modalTitle}
          isActive={isModal}
          body={modalBody}
          onClose={() => {
            setIsModal(false)
            setModalTitle("")
            setModalBody("")
          }}
        />
        <ul className="space-y-4 p-4 bg-gray-200 rounded mb-10">
          {product.requests.map((request, ind) => {
            const hasVoted = request.votesOnRequest.find(
              (voteOnRequest) => voteOnRequest.userId === currentUser?.id
            )

            return (
              <li className="p-4 shadow rounded flex flex-row space-x-4 bg-white" key={ind}>
                <div className="border rounded">
                  <button
                    onClick={async () => {
                      if (currentUser) {
                        if (hasVoted) {
                          setIsModal(true)
                          setModalTitle("Already Voted")
                          setModalBody("Your vote has been already recorded on this request")
                        } else {
                          try {
                            await voteOnRequestMutation({
                              data: {
                                requestId: request.id,
                                userId: currentUser?.id,
                              },
                            })
                            refetch()
                          } catch (error) {
                            console.log(error)
                          }
                        }
                      } else {
                        setIsModal(true)
                        setModalTitle("Login")
                        setModalBody("You need to login to be able to vote")
                      }
                    }}
                    className={classNames(
                      `flex flex-col space-y-4 p-3 rounded shadow-sm hover:bg-yellow-200`,
                      {
                        "bg-blue-200": hasVoted,
                      }
                    )}
                  >
                    <span className="self-center">{request.votesOnRequest.length}</span>
                    <span className="self-center">Vote</span>
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
        <ProductActions productId={product.id} />
      </div>
    </>
  )
}

const ShowProductPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Product />
    </Suspense>
  )
}

ShowProductPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowProductPage
