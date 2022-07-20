import React, { Fragment, useState } from 'react';
import { css } from 'twin.macro';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Router from 'next/router';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import useForm from '../lib/useForm';
import {
  Form,
  FormButton,
  Input,
  Label,
  Select,
  Processing,
} from './styles/Form';
import LoadingIcon from './icons/LoadingIcon';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import SelectBox from './forms/ListBox';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in? And What types are they
    $name: String!
    $inventory: Decimal!
    $weight: String!
    $potency: Int!
    $strain: String!
    $environment: String!
    # $price: Int! # $amount: Int! # $threshold: String!
    $description: String!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        inventory: $inventory
        weight: $weight
        potency: $potency
        strain: $strain
        environment: $environment
        description: $description
        # price_threshold: {
        #   create: {
        #     name: $threshold $amount $weight $price
        #     price: $price
        #     amount: $amount
        #     weight: $weight
        #     threshold: $threshold
        #   }
        # }
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      inventory
      weight
      potency
      strain
      environment
      description
      # price_threshold {
      #   name
      #   price
      #   amount
      #   weight
      #   threshold
      # }
      # status
    }
  }
`;

const strains = ['Indica', 'HybridIndica', 'Sativa', 'HybridSativa', 'Hybrid'];
const environments = ['Indoor', 'Outdoor', 'Greenhouse'];

function CreateProduct() {
  const { inputs, clearForm, resetForm, handleChange, setInputs } = useForm({
    image: '',
    name: '',
    inventory: '',
    weight: '',
    potency: 0,
    strain: '',
    environment: '',
    price: 0,
    amount: 0,
    threshold: '',
    description: '',
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const response = await createProduct();
        console.log(response);
        clearForm();
        // Go to that product's page!
        Router.push({
          pathname: `/product/${response.data.createProduct.id}`,
        });
      }}
      tw="max-w-2xl mx-auto"
    >
      <DisplayError error={error} />
      <fieldset tw="my-5" disabled={loading} aria-busy={loading}>
        <Processing loading={loading.toString()}>
          <LoadingIcon tw="animate-spin" />
          Processing
        </Processing>
        <Label htmlFor="name">
          Name
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
            required
          />
        </Label>
        <Label htmlFor="name">
          Inventory Amount
          <Input
            type="text"
            id="inventory"
            name="inventory"
            value={inputs.inventory}
            onChange={handleChange}
            required
          />
        </Label>
        <Label htmlFor="name">
          Potency
          <div tw="flex">
            <Input
              type="range"
              id="potency"
              name="potency"
              min="1"
              max="35"
              placeholder="Enter Potency based on % of THC"
              value={inputs.potency}
              onChange={handleChange}
              tw="flex-1"
              required
            />
            {inputs.potency}%
          </div>
        </Label>
        <Label htmlFor="strain">
          <SelectBox
            options={strains}
            id="strain"
            name="strain"
            inputs={inputs}
            setInputs={setInputs}
          />
        </Label>
        <Label htmlFor="environment">
          <SelectBox
            options={environments}
            id="environment"
            name="environment"
            inputs={inputs}
            setInputs={setInputs}
          />
        </Label>
        {/* <Label htmlFor="price">
          Price
          <Input
            type="text"
            id="price"
            name="price"
            placeholder="Price"
            onChange={handleChange}
          />
        </Label> */}
        <Label htmlFor="weight">
          Weight
          <Select
            id="weight"
            name="weight"
            defaultValue="Pound"
            onChange={handleChange}
            required
          >
            <option value="">Select Weight</option>
            <option value="pound">Pound</option>
            <option value="ounce">Ounce</option>
            <option value="gram">Gram</option>
          </Select>
        </Label>
        <Label htmlFor="image">
          Image
          <Input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            required
          />
        </Label>
        <Label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </Label>
      </fieldset>
      <div tw="flex justify-between">
        <FormButton type="submit">+ Add Product</FormButton>
        <div tw="flex">
          <FormButton type="button" onClick={resetForm}>
            Reset
          </FormButton>
          <FormButton type="button" onClick={clearForm}>
            Clear
          </FormButton>
        </div>
      </div>
    </Form>
  );
}

CreateProduct.propTypes = {};

export default CreateProduct;
