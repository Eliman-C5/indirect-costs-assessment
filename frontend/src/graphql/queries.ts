// frontend/src/graphql/queries.ts

import { gql } from '@apollo/client';

/**
 * QUERY: Fetches all necessary data for the UI:
 * 1. All available Plants.
 * 2. All Volume Ranges (Table Headers).
 * 3. Operations and their associated Costs (Filtered by selected Plant ID).
 * * NOTE: The query uses a dynamic variable ($plantaId) but also fetches 'getPlantas'
 * and 'getRangos' unconditionally to build the static parts of the UI.
 */

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

/**
 * MUTATION: The central mutation to save or update indirect costs.
 * Uses the complex Upsert logic defined in the backend resolver (saveCostos).
 */
export const SAVE_COSTS_MUTATION = gql`
  mutation SaveCosts($plantId: ID!, $operationName: String!, $costs: [CostInput!]!) {
    saveCosts(plantId: $plantId, operationName: $operationName, costs: $costs) {
      id
      name
    }
  }
`;

/**
 * MUTATION: Allows the user to add a new operation (a new row) to a specific plant.
 */
export const CREATE_OPERATION_MUTATION = gql`
  mutation CreateOperation($name: String!) {
    createOperation(name: $name) {
      id
      name
    }
  }
`;
