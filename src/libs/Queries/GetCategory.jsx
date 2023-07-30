import { useQuery,gql } from "@apollo/client";

const GET_CATEGORY = gql`
query {
    getAllCategory{
         _id,
       name,
   }
   }
`


export default function GetCategory() {
 const data = useQuery(GET_CATEGORY)

 return data
}
