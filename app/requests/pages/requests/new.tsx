import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createRequest from "app/requests/mutations/createRequest"
import { RequestForm, FORM_ERROR } from "app/requests/components/RequestForm"
import { CreateRequest } from "../../validations"

const NewRequestPage: BlitzPage = () => {
  const router = useRouter()
  const [createRequestMutation] = useMutation(createRequest)

  return (
    <div>
      <h1>Create New Request</h1>

      <RequestForm
        submitText="Create Request"
        schema={CreateRequest}
        initialValues={{}}
        onSubmit={async (values) => {
          try {
            const request = await createRequestMutation(values)
            router.push(`/requests/${request.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.RequestsPage()}>
          <a>Requests</a>
        </Link>
      </p>
    </div>
  )
}

NewRequestPage.authenticate = true
NewRequestPage.getLayout = (page) => <Layout title={"Create New Request"}>{page}</Layout>

export default NewRequestPage
