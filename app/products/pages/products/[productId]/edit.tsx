import { Suspense } from "react"
import { Head, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProduct from "app/products/queries/getProduct"
import updateProduct from "app/products/mutations/updateProduct"
import { ProductForm, FORM_ERROR } from "app/products/components/ProductForm"

export const EditProduct = () => {
  const router = useRouter()
  const productId = useParam("productId", "string")
  const [product, { setQueryData }] = useQuery(getProduct, { id: Number(productId) })
  const [updateProductMutation] = useMutation(updateProduct)

  return (
    <>
      <Head>
        <title>Edit Product {product.name}</title>
      </Head>

      <div className="mt-10 flex bg-gray-bg1">
        <div className="w-full max-w-2xl m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
          <h1 className="text-xl font-medium text-primary mt-4 mb-8 text-center">Edit Product</h1>

          <ProductForm
            submitText="Update Product"
            initialValues={product}
            onSubmit={async (values) => {
              try {
                const updated = await updateProductMutation({
                  id: product.id,
                  name: values.name,
                  description: values.description,
                })
                await setQueryData(updated)
                router.push(Routes.ShowProductPage({ productId: String(updated.id) }))
              } catch (error) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </div>
      </div>
    </>
  )
}

const EditProductPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProduct />
      </Suspense>
    </div>
  )
}

EditProductPage.authenticate = true
EditProductPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditProductPage
