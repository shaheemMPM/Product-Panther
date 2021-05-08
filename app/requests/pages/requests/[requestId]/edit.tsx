import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRequest from "app/requests/queries/getRequest"
import updateRequest from "app/requests/mutations/updateRequest"
import { RequestForm, FORM_ERROR } from "app/requests/components/RequestForm"
import { CreateRequest } from "../../../validations"

export const EditRequest = () => {
  const router = useRouter()
  const requestId = useParam("requestId", "number")
  const [request] = useQuery(getRequest, { id: requestId })
  const [updateRequestMutation] = useMutation(updateRequest)

  return (
    <>
      <Head>
        <title>Edit Request {request.title}</title>
      </Head>

      <div className="mt-10 flex bg-gray-bg1">
        <div className="w-full max-w-2xl m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
          <h1 className="text-xl font-medium text-primary mt-4 mb-8 text-center">Edit Request</h1>

          <RequestForm
            submitText="Update Request"
            schema={CreateRequest}
            initialValues={request}
            onSubmit={async (values) => {
              try {
                const updated = await updateRequestMutation({
                  id: request.id,
                  ...values,
                })
                router.push(Routes.ShowRequestPage({ requestId: String(updated.id) }))
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

const EditRequestPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditRequest />
    </Suspense>
  )
}

EditRequestPage.authenticate = true
EditRequestPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditRequestPage
