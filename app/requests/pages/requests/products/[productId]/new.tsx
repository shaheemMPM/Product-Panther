import { useRouter, useMutation, BlitzPage, useParam } from "blitz"
import Layout from "app/core/layouts/Layout"
import createRequest from "app/requests/mutations/createRequest"
import { RequestForm, FORM_ERROR } from "app/requests/components/RequestForm"
import { CreateRequest } from "../../../../validations"

const NewRequestPage: BlitzPage = () => {
  const productId = useParam("productId", "number") || 1
  console.log(productId)
  const router = useRouter()
  const [createRequestMutation] = useMutation(createRequest)

  return (
    <div className="mt-10 flex bg-gray-bg1">
      <div className="w-full max-w-2xl m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-xl font-medium text-primary mt-4 mb-8 text-center">
          Create New Request
        </h1>

        <RequestForm
          submitText="Create Request"
          schema={CreateRequest}
          initialValues={{ title: "", description: "", productId: productId }}
          onSubmit={async (values) => {
            console.log(values)
            try {
              await createRequestMutation({ ...values, productId: productId })
              router.push(`/products/${productId}`)
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

NewRequestPage.authenticate = true
NewRequestPage.getLayout = (page) => <Layout title={"Create New Request"}>{page}</Layout>

export default NewRequestPage
