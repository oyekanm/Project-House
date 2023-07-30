import { gql} from "@apollo/client";


const CREATE__CATEGORY = gql`
    mutation CreateCategory($name:String,$key:String)  {
        createCategory(name:$name,key:$key){
            name,
        }
    }
`;
export default CREATE__CATEGORY