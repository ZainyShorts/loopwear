import { gql } from "@apollo/client";

export function  Add_User(){
    return gql`
   mutation AddUser($addUserInput: addUserInput!)  {
    addUser(addUserInput: $addUserInput)
   }
  `
}

export function  Get_User(){
    return gql`
   query GetUser($deScopeId: deScopeId!)  {
    getUser(deScopeId: $deScopeId){
        subscription
    }
   }
  `
}

export function Make_Payment(){
    return  gql`
    mutation MakePayment($paymentInput: [paymentInput!]!, $deScopeId: String!, $path: String!) {
        makePayment(paymentInput: $paymentInput, deScopeId: $deScopeId, path: $path)
    }
    `;
} 



  
