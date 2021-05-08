import { useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import createProduct from "app/products/mutations/createProduct"
import { ProductForm, FORM_ERROR } from "app/products/components/ProductForm"
import { CreateProduct } from "app/products/validations"

const NewProductPage: BlitzPage = () => {
  const router = useRouter()
  const [createProductMutation] = useMutation(createProduct)

  return (
    <div className="mt-10 flex bg-gray-bg1">
      <div className="w-full max-w-2xl m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-xl font-medium text-primary mt-4 mb-8 text-center">
          Create New Product
        </h1>

        <ProductForm
          submitText="Create Product"
          schema={CreateProduct}
          initialValues={{}}
          onSubmit={async (values) => {
            try {
              const product = await createProductMutation(values)
              router.push(`/products/${product.id}`)
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
  )
}

NewProductPage.authenticate = true
NewProductPage.getLayout = (page) => <Layout title={"Create New Product"}>{page}</Layout>

export default NewProductPage
