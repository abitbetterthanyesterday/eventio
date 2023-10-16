import { MainAuthenticationForm } from "@/auth/components/MainAuthenticationForm"
import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "@/core/layouts/Layout"

const LoginPage: BlitzPage = () => (
  <Layout title={"login"}>
    <MainAuthenticationForm />
  </Layout>
)

export default LoginPage

LoginPage.redirectAuthenticatedTo = Routes.Home()
