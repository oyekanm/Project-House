import { gql} from "@apollo/client";


const CREATE__LANGUAGE = gql`
    mutation CreateLanguage($name:String,$key:String)  {
        createLanguage(name:$name,key:$key){
            name,
        }
    }
`;
export default CREATE__LANGUAGE