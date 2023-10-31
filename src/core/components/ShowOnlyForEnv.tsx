import { ReactNode } from "react"
import { useGetEnv } from "@/core/hooks/useGetEnv"

type Env = "development" | "production" | "test"

type ShowOnlyForEnvProps = {
  env: Env
  children: ReactNode
}

/**
 * Show children only if the current environment matches the env prop
 */
export const ShowOnlyForEnv = ({ env, children }: ShowOnlyForEnvProps) => {
  const currentEnv = useGetEnv()
  if (currentEnv !== env) return null
  return <>{children}</>
}
