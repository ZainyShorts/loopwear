import { gql } from "@apollo/client"

export const GET_PROPERTIES = gql`
  query getProperties( 
    $filter: PropertyFilterInput
    $sortBy: String
    $sortOrder: String 
 
  ) {
    getProperties( 
      filter: $filter
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      _id
      roadLocation
      developmentName
      subDevelopmentName
      projectName
      propertyType
      projectLocation
      unitNumber
      bedrooms
      unitLocation
      vacancyStatus
      listed
      primaryPrice
      resalePrice
      Rent
      createdAt
      unitView
    }
  }
`

