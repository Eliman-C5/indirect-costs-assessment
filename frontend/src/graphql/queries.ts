import { gql } from '@apollo/client';

export const GET_PLANTS = gql`
  query GET_PLANTS {
    getPlants {
      id
      name
    }
  }
`;

export const GET_OPERATIONS_WITH_COSTS = gql`
  query GetOperationsWithCosts($plantId: ID!) {
    getOperationsWithCosts(plantId: $plantId) {
      id
      name
      indirectCosts {
        id
        cost
        rangeVolume {
          id
          name
          order
        }
      }
    }
  }
`;

export const CREATE_PLANT = gql`
  mutation CreatePlant($name: String!) {
    createPlant(name: $name) {
      id
      name
    }
  }
`;

export const SAVE_COSTS = gql`
  mutation SaveCosts($plantId: ID!, $operationName: String!, $costs: [CostInput!]!) {
    saveCosts(plantId: $plantId, operationName: $operationName, costs: $costs) {
      id
      name
      indirectCosts {
        id
        cost
        rangeVolume {
          id
          name
          order
        }
      }
    }
  }
`;

export const CREATE_OPERATION = gql`
  mutation CreateOperation($name: String!, $plantId: ID!) {
    createOperation(name: $name, plantId: $plantId) {
      id
      name
      indirectCosts {
        id
        cost
        rangeVolume {
          id
          name
          order
        }
      }
    }
  }
`;

export const SAVE_COSTS_MUTATION = gql`
  mutation SaveCosts($plantId: ID!, $operationName: String!, $costs: [CostInput!]!) {
    saveCosts(plantId: $plantId, operationName: $operationName, costs: $costs) {
      id
      name
    }
  }
`;

export const CREATE_OPERATION_MUTATION = gql`
  mutation CreateOperation($name: String!) {
    createOperation(name: $name) {
      id
      name
    }
  }
`;

export const DELETE_OPERATION = gql`
mutation DeleteOperation($deleteOperationId: ID!) {
  deleteOperation(id: $deleteOperationId)
}`