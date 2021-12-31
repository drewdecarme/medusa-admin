import styled from "@emotion/styled"
import { navigate } from "gatsby"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Box, Flex, Text } from "rebass"

import Button from "../../../components/button"
import Input from "../../../components/input"
import Spinner from "../../../components/spinner"
import Typography from "../../../components/typography"
import useMedusa from "../../../hooks/use-medusa"
import Medusa from "../../../services/api"

const StyledLabel = styled.div`
  ${Typography.Base}

  padding-bottom: 10px;
`

const ShippingProfileDetail = ({ id }) => {
  const {
    shipping_profile,
    isLoading: isLoadingProfile,
  } = useMedusa("shippingProfiles", { id })
  const { products, isLoading: isLoadingProducts } = useMedusa("products")

  const [selectedProducts, setSelectedProducts] = useState([])

  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (shipping_profile) {
      reset({
        name: shipping_profile.name,
        shipping_options: shipping_profile.shipping_options,
      })
      setSelectedProducts(
        shipping_profile.products.map(product => ({
          label: product.title,
          value: product._id,
        }))
      )
    }
  }, [shipping_profile, isLoadingProfile])

  const submit = data => {
    data.products = selectedProducts.map(product => product.value)
    Medusa.shippingProfiles.update(id, data).then(() => {
      navigate("/a/settings")
    })
  }

  if (isLoadingProfile || isLoadingProducts) {
    return (
      <Flex flexDirection="column" alignItems="center" height="100vh" mt="auto">
        <Box height="75px" width="75px" mt="50%">
          <Spinner dark />
        </Box>
      </Flex>
    )
  }

  return (
    <Flex as="form" onSubmit={handleSubmit(submit)} flexDirection="column">
      <Box width={3 / 7}>
        <Input
          mb={3}
          name="name"
          label="Name"
          ref={register({ required: true })}
        />
        <StyledLabel>
          Products that can be processed using the profile
        </StyledLabel>
        <StyledMultiSelect
          options={products.map(el => ({
            label: el.title,
            value: el._id,
          }))}
          selectAllLabel={"All"}
          overrideStrings={{
            allItemsAreSelected: "All products",
          }}
          value={selectedProducts}
          onChange={setSelectedProducts}
        />
      </Box>
      <Flex pt={5}>
        <Box ml="auto" />
        <Button variant={"cta"} type="submit">
          Save
        </Button>
      </Flex>
    </Flex>
  )
}

export default ShippingProfileDetail
