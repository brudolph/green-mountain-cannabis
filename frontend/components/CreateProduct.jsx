import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Router from 'next/router';
import useForm from '../lib/useForm';
import { Form, FormButton, Input, Label, Processing } from './styles/Form';
import LoadingIcon from './icons/LoadingIcon';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_FILTERED_QUERY } from './Products';
import Radios from './forms/RadioGroup';
import {
  strainList,
  weights,
  environmentList,
  producttypes,
} from './config/filters';
import FileInput from './forms/FileInput';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in? And What types are they
    $name: String!
    $inventory: Decimal!
    $producttype: String!
    $weight: String!
    $potency: String!
    $strain: String!
    $environment: String!
    # $price: Int! # $amount: Int! # $threshold: String!
    $description: String!
    $image: [ProductImageCreateInput!]
  ) {
    createProduct(
      data: {
        name: $name
        inventory: $inventory
        producttype: $producttype
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
        photo: { create: $image }
      }
    ) {
      id
      name
      producttype
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

export const STRAIN_QUERY = gql`
  query STRAIN_QUERY {
    products {
      strain
    }
  }
`;

function CreateProduct() {
  const { inputs, clearForm, resetForm, handleChange, setInputs } = useForm({
    name: '',
    inventory: '',
    producttype: 'Recreational',
    weight: 'pound',
    image: [],
    potency: '',
    strain: 'Indica',
    environment: 'Indoor',
    price: 0,
    amount: 0,
    threshold: '',
    description: '',
  });

  const [createProduct, { loading, error }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_FILTERED_QUERY }],
    }
  );

  return (
    <>
      <h1 tw="mb-12 text-center">Create Product</h1>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const photoItems = Array.from(inputs.image).map((fileItem) => ({
            image: fileItem,
            altText: inputs.name,
          }));
          inputs.image = photoItems;
          const response = await createProduct();
          clearForm();
          // Go to that product's page!
          Router.push({
            pathname: `/product/${response.data.createProduct.id}`,
          });
        }}
        tw="max-w-4xl mx-auto"
      >
        <DisplayError error={error} />
        <fieldset tw="my-12" disabled={loading} aria-busy={loading}>
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
          <Label htmlFor="inventory">
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
          <Radios
            options={weights}
            id="weight"
            name="weight"
            label="Weight"
            inputs={inputs}
            setInputs={setInputs}
          />
          <Radios
            options={producttypes}
            id="producttype"
            name="producttype"
            label="Product Type"
            inputs={inputs}
            setInputs={setInputs}
          />
          <Label htmlFor="potency">
            Potency
            <Input
              type="text"
              id="potency"
              name="potency"
              value={inputs.potency}
              onChange={handleChange}
              required
            />
          </Label>
          <Radios
            options={strainList}
            id="strain"
            name="strain"
            label="Strain"
            inputs={inputs}
            setInputs={setInputs}
          />
          <Radios
            options={environmentList}
            id="environment"
            name="environment"
            label="Environment"
            inputs={inputs}
            setInputs={setInputs}
          />
          <FileInput
            id="image"
            name="image"
            multiple
            inputs={inputs}
            setInputs={setInputs}
            onChange={handleChange}
            required
          />
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
    </>
  );
}

CreateProduct.propTypes = {};

export default CreateProduct;
