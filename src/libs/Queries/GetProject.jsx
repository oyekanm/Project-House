import { gql, useQuery } from "@apollo/client";

const GET_PROJECT = gql`
  query {
    getAllProject {
      _id
      name
      category {
        name
      }
      language {
        name
      }
      image
      author
      github
      url
    }
  }
`;
export default function GetLanguage() {
  const data = useQuery(GET_PROJECT);

  return data;
}
