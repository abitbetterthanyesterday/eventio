import { ReactNode } from "react"

type Env = "development" | "production" | "test"

type ShowOnlyForEnvProps = {
  env: Env
  children: ReactNode
}
export const ShowOnlyForEnv = ({ env, children }: ShowOnlyForEnvProps) => {
  if (process.env.NODE_ENV !== env) return null
  return <>{children}</>
}
