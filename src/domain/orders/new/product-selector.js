import React, { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { Box, Flex, Text } from "rebass"

import Button from "../../../components/button"
import Input from "../../../components/input"
import Modal from "../../../components/modal"
import MultiSelect from "../../../components/multi-select"
import useMedusa from "../../../hooks/use-medusa"

const ProductSelector = ({
  onClick,
  products,
  selectedProducts,
  setSelectedProducts,
}) => {
  const [variants, setVariants] = useEffect([])
  const { handleSubmit } = useForm({
    defaultValues: {
      toAdd: [],
    },
  })

  const onSubmit = data => {}

  return (
    <Modal onClick={onClick}>
      <Modal.Body as="form" onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Text>Browse products</Text>
        </Modal.Header>
        <Modal.Content
          flexDirection="column"
          minHeight="400px"
          minWidth="500px"
        >
          <MultiSelect
            options={
              products &&
              products.map(el => ({
                label: el.title,
                value: el._id,
              }))
            }
            value={selectedProducts}
            onChange={setSelectedProducts}
          />
        </Modal.Content>
        <Modal.Footer justifyContent="flex-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  )
}

export default ProductSelector
