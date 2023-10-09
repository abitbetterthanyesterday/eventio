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
import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "@/core/layouts/Layout"
import { useForm } from "@mantine/form"
import { useMutation, useQuery } from "@blitzjs/rpc"
import createGlider, { CreateGliderSchema } from "@/gliders/mutations/createGlider"
import { z } from "zod"
import { notifications } from "@mantine/notifications"
import { IconCheck, IconCross } from "@tabler/icons-react"
import { CurrencyInput } from "@/core/components/CurrencyInput"
import getBrands from "@/gliders/queries/getBrands"
import getModels from "@/gliders/queries/getModels"
import { GliderClassEnum, GliderTypeEnum } from "@/gliders/schema"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { useRouter } from "next/router"

type Values = z.infer<typeof CreateGliderSchema> & {
  modelName: string
}

export const initialValues: Omit<Values, "seller"> = {
  year: new Date().getFullYear(),
  description: "",
  price: 0,
  minWeight: 60,
  maxWeight: 90,
  model: 0,
  modelName: "",
  hours: 50,
  class: GliderClassEnum.Enum.A,
  type: GliderTypeEnum.Enum["Cross country"],
}

const NewGliderPage: BlitzPage = () => {
  const user = useCurrentUser()
  const form = useForm<Values>({
    initialValues: { ...initialValues, seller: user?.id ?? -1 },
    transformValues: (values) => ({
      ...values,
      model: models?.find(({ name }) => name === values.modelName)?.id ?? 0,
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
  const router = useRouter()

  async function handleSubmit(values: Values) {
    try {
      await $createGlider(values)
      await router.push(Routes.GlidersIndexPage())
      notifications.show({
        title: "Glider created",
        message: "Your glider has been created",
        color: "green",
        icon: <IconCheck />,
      })
    } catch {
      notifications.show({
        title: "Error",
        message: "An error occurred",
        color: "red",
        icon: <IconCross />,
      })
    }
  }

  const marks = [
    { value: 40, label: "40" },
    { value: 60, label: "60" },
    { value: 80, label: "80" },
    { value: 100, label: "100" },
    { value: 120, label: "120" },
    { value: 140, label: "140" },
  ]

  return (
    <Layout title={"New glider"}>
      <Container size={"sm"} h={"100%"}>
        <form onSubmit={form.onSubmit(handleSubmit)} role={"form"}>
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
              disabled={!shouldGetModels}
              {...form.getInputProps("modelName")}
            />

            <Stack gap={2}>
              <Text size={"sm"}>Type</Text>
              <SegmentedControl aria-label={"Type"} data={Object.values(GliderTypeEnum.Enum)} />
            </Stack>

            <Stack gap={2}>
              <Text size={"sm"}>Certification</Text>
              <SegmentedControl
                aria-label={"Certification"}
                data={Object.values(GliderClassEnum.Enum)}
              />
            </Stack>

            <Stack gap={2}>
              <Text size={"sm"}>Weight range</Text>
              <RangeSlider
                step={5}
                min={30}
                label={null}
                marks={marks}
                max={150}
                value={[
                  form.values["minWeight"] ?? initialValues.minWeight,
                  form.values["maxWeight"] ?? initialValues.maxWeight,
                ]}
                onChange={(value) => {
                  form.setFieldValue("minWeight", value[0])
                  form.setFieldValue("maxWeight", value[1])
                }}
                thumbSize={"40"}
                thumbChildren={[
                  <Text key={"min"} size={"sm"} data-testid={"weight-range-min"}>
                    {form.values["minWeight"]}
                  </Text>,
                  <Text key={"max"} size={"sm"} data-testid={"weight-range-max"}>
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

            <CurrencyInput min={0} label={"Asking price"} {...form.getInputProps("price")} />

            <Button type={"submit"}>Submit</Button>
          </Stack>
        </form>
      </Container>
    </Layout>
  )
}

export default NewGliderPage
