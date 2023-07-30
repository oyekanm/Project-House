import { gql, useQuery } from "@apollo/client"

export const GET_User = gql`
query GetUser($key:String) {
 getUser(key:$key){
  name,
  _id
}
}
`
// export default function GetLanguage({id}) {
//     const data = useQuery(GET_User,{variables: { key:id },})

//     return data
// }
