import { Link, Routes, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div className="mt-10 flex bg-gray-bg1">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Create an Account
        </h1>

        <Form
          submitText="Create Account"
          schema={Signup}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              await signupMutation(values)
              props.onSuccess?.()
            } catch (error) {
              if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                // This error comes from Prisma
                return { email: "This email is already being used" }
              } else {
                return { [FORM_ERROR]: error.toString() }
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" />
          <LabeledTextField
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
        </Form>
        <div className="flex flex-row mt-8">
          <div className="text-blue-600 underline">
            <Link href={Routes.LoginPage()}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupForm
