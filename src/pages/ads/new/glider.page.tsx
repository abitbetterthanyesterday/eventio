import React from "react"
import {
  Autocomplete,
  Button,
  Checkbox,
  Container,
  NumberInput,
  Paper,
  RangeSlider,
  SegmentedControl,
  Stack,
  Text,
  Textarea,
} from "@mantine/core"
import { BlitzPage } from "@blitzjs/next"
import Layout from "@/core/layouts/Layout"
import { useForm } from "@mantine/form"
import { useMutation, useQuery } from "@blitzjs/rpc"
import createGlider from "@/gliders/mutations/createGlider"
import { CreateGliderSchema } from "@/gliders/mutations/createGlider"
import { z } from "zod"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"
import { CurrencyInput } from "@/core/components/CurrencyInput"
import getBrands from "@/gliders/queries/getBrands"
import getModels from "@/gliders/queries/getModels"

type Values = Omit<z.infer<typeof CreateGliderSchema>, "brand"> & {
  brandName: string
}
const NewGliderPage: BlitzPage = () => {
  const form = useForm<Values>({
    initialValues: {
      // TODO: Add the remaing of the fields and connect to the form
      year: new Date().getFullYear(),
      description: "",
      price: 0,
      minWeight: 60,
      maxWeight: 90,
      brandName: "",
      model: "",
      hours: 50,
    },
    transformValues: (values) => ({
      ...values,
      brand: brands.find(({ name }) => name === values.brandName)?.id,
    }),
  })
  const [brands] = useQuery(getBrands, undefined)
  const brandId = Number(getBrandIdFromName(form.values["brandName"]))
  const shouldGetModels = !isNaN(brandId)
  const [models] = useQuery(
    getModels,
    { brandId },
    {
      enabled: shouldGetModels,
    }
  )

  function getBrandIdFromName(name: string) {
    return Number(brands.find(({ name: brandName }) => brandName === name)?.id)
  }

  const [$createGlider] = useMutation(createGlider)

  async function handleSubmit(values) {
    // await $createGlider(values)
    notifications.show({
      title: "Glider created",
      message: "Your glider has been created",
      color: "green",
      icon: <IconCheck />,
    })
  }

  const marks = [
    { value: 40, label: "40" },
    { value: 60, label: "60" },
    { value: 80, label: "80" },
    { value: 100, label: "100" },
    { value: 120, label: "120" },
    { value: 140, label: "140" },
  ]

  //TODO Connect to the backend
  //TODO make responsive on mobile
  return (
    <Layout title={"New glider"}>
      <Container size={"sm"} h={"100%"}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Text size={"xl"}>New Glider Ad</Text>

            <Paper w={"100%"} bg={"gray.9"} h={350} radius={"md"} shadow={"lg"}>
              <Stack align={"center"} justify={"center"} h={"100%"}>
                <Text c={"dimmed"}>Coming soon</Text>
                <Text c={"dimmed"}>Upload images</Text>
              </Stack>
            </Paper>

            <Autocomplete
              description={
                "If you can't find your brand, select 'other' and add it in the description"
              }
              label={"Brand"}
              placeholder={"Advance, Skywalk..."}
              data={brands.map(({ name }) => name)}
              {...form.getInputProps("brandName")}
            />

            <Autocomplete
              description={"The model of your glider"}
              label={"Model"}
              data={models?.map(({ name }) => name) ?? []}
              placeholder={"Advance, Skywalk..."}
              disabled={form.values["brand"]?.length === 0}
              {...form.getInputProps("model")}
            />

            <Stack gap={2}>
              <Text size={"sm"}>Type</Text>
              <SegmentedControl
                data={["Cross country", "Acro", "Tandem", "Mini", "Speed", "Other"]}
              />
            </Stack>

            <Stack gap={2}>
              <Text size={"sm"}>Certification</Text>
              <SegmentedControl data={["A", "B", "B+", "C", "D", "Competition", "Open"]} />
            </Stack>

            <Stack gap={2}>
              <Text size={"sm"}>Weight range</Text>
              <RangeSlider
                step={5}
                min={30}
                label={null}
                marks={marks}
                max={150}
                value={[form.values["minWeight"] ?? 60, form.values["maxWeight"] ?? 90]}
                onChange={(value) => {
                  form.setFieldValue("minWeight", value[0])
                  form.setFieldValue("maxWeight", value[1])
                }}
                thumbSize={"40"}
                thumbChildren={[
                  <Text key={"min"} size={"sm"}>
                    {form.values["minWeight"]}
                  </Text>,
                  <Text key={"max"} size={"sm"}>
                    {form.values["maxWeight"]}
                  </Text>,
                ]}
              />
            </Stack>

            <NumberInput
              description={"You can find this information on the tag inside your glider"}
              min={1979}
              max={new Date().getFullYear()}
              label={"Year"}
              {...form.getInputProps("year")}
            />

            <NumberInput
              min={0}
              max={1000}
              label={"Hours"}
              description={"If you are not sure, give an estimate"}
              {...form.getInputProps("hours")}
            />

            <Stack gap={2}>
              <Text>Extras</Text>
              <Stack gap={8}>
                <Checkbox label="Comes with a certificate of inspection" />
                <Checkbox label={"Comes with the glider backpack"} />
                <Checkbox label={"Comes with a concertina / sausage bag"} />
              </Stack>
            </Stack>

            <Textarea
              label={"Description"}
              description={"Anything you want to add?"}
              placeholder={"In great condition, bought last year."}
              {...form.getInputProps("description")}
            />

            <CurrencyInput label={"Asking price"} {...form.getInputProps("price")} />

            <Button type={"submit"}>Submit</Button>
          </Stack>
        </form>
      </Container>
    </Layout>
  )
}

export default NewGliderPage
