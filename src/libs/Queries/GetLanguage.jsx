import { gql, useQuery } from "@apollo/client"

const GET_LANGUAGE = gql`
query {
    getAllLanguage{
         _id,
       name,
   }
   }
`
export default function GetLanguage() {
    const data = useQuery(GET_LANGUAGE)

    return data
}
