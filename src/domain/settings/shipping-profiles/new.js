import { navigate } from "gatsby"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Box, Flex } from "rebass"

import Button from "../../../components/button"
import Input from "../../../components/input"
import Spinner from "../../../components/spinner"
import useMedusa from "../../../hooks/use-medusa"
import Medusa from "../../../services/api"

const NewShippingProfiles = ({ id }) => {
  const { products, isLoading: isLoadingProducts } = useMedusa("products")

  const [selectedProducts, setSelectedProducts] = useState([])

  const { register, handleSubmit } = useForm()

  const submit = data => {
    Medusa.shippingProfiles.create(data).then(({ data }) => {
      navigate(`/a/settings`)
    })
  }

  if (isLoadingProducts) {
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
          placeholder="E.g.: Express shipping"
          ref={register}
        />
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

export default NewShippingProfiles
