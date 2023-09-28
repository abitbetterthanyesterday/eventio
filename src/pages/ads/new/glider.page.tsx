import React from "react"
import { Text, TextInput } from "@mantine/core"
import { BlitzPage } from "@blitzjs/next"
import Layout from "@/core/layouts/Layout"
import { Form, useForm } from "@mantine/form"
import { useMutation } from "@blitzjs/rpc"
import createGlider from "@/gliders/mutations/createGlider"
import { CreateGliderSchema } from "@/gliders/mutations/createGlider"
import { z } from "zod"

type Values = z.infer<typeof CreateGliderSchema>
const NewGliderPage: BlitzPage = () => {
  const form = useForm<Values>({
    initialValues: {
      // TODO: Add the remaing of the fields and connect to the form
      year: new Date(),
      description: "",
      price: 0,
    },
  })

  const [$createGlider] = useMutation(createGlider)

  async function handleSubmit(values) {
    await $createGlider(values)
  }

  //TODO Add the rest of the fields
  return (
    <Layout title={"New glider"}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput {...form.getInputProps("name")} placeholder={"name"} />
      </form>
    </Layout>
  )
}

export default NewGliderPage
