import { gql, useMutation } from "@apollo/client";


const CREATE__PROJECT = gql`
    mutation CreateProject($name:String,$author:String,$url:String,$github:String,$image:String,$category:[String],$language:[String],$key:String)  {
        createProject(name:$name,author:$author,url:$url,github:$github,image:$image,category:$category,language:$language,key:$key){
            name
        }
    }
`;
export default CREATE__PROJECT

