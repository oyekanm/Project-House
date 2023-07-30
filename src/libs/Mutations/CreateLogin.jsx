import { gql} from "@apollo/client";


const CREATE__LOGIN = gql`
    mutation Login($email:String, $password:String)  {
        login(email:$email,password:$password){
            key
        }
    }
`;
export default CREATE__LOGIN