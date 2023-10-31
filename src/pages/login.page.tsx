import { AuthenticationFormContainer } from "@/auth/components/AuthenticationForm/AuthenticationFormContainer"
import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "@/core/layouts/Layout"

const LoginPage: BlitzPage = () => (
  <Layout title={"login"}>
    <AuthenticationFormContainer />
  </Layout>
)

export default LoginPage

LoginPage.redirectAuthenticatedTo = Routes.Home()
