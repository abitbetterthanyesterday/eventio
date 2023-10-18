import { AuthenticationForm } from "@/auth/components/AuthenticationForm/AuthenticationForm"
import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "@/core/layouts/Layout"

const LoginPage: BlitzPage = () => (
  <Layout title={"login"}>
    <AuthenticationForm />
  </Layout>
)

export default LoginPage

LoginPage.redirectAuthenticatedTo = Routes.Home()
