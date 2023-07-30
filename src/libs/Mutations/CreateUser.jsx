import { gql} from "@apollo/client";


const CREATE__USER = gql`
    mutation SingnUp($name:String,$email:String, $password:String)  {
        SignUp(name:$name,email:$email,password:$password){
            key
        }
    }
`;
export default CREATE__USER