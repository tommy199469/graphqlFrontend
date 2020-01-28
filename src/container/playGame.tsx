import React , {useState ,  FunctionComponent , useEffect} from 'react';
import gql from 'graphql-tag';
import { ApolloProvider } from 'react-apollo-hooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button , Container}  from 'react-bootstrap';
import { createHttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";


const PlayGame: FunctionComponent<{ blueCount?: number, orangeCount?: number , backgroundColor?:String }> = ({ blueCount = 0 , orangeCount=0  }) => {

  const client = new ApolloClient({
    link: createHttpLink({ uri: "http://localhost:4000/graphql" }),
    cache: new InMemoryCache()
  });
  
  const [blue , setBlue] = useState(blueCount);
  const [orange , setOrange] = useState(0);
  const [id] = useState(new Date().getTime().toString());

  const handleCount = (color:String) => {
    color == 'blue' ? setBlue(blue+1) : setOrange(orange+1)
  }
  
  useEffect(() => {
    // 使用瀏覽器 API 更新文件標題
    let variables = {id, blue , orange}
    try{
      client.mutate({
        mutation: gql`
        mutation ($id: String!, $blue: Int! , $orange: Int!) {
          updateGame(id:$id , blue:$blue , orange:$orange){
            id
            blue
            orange
          }
        }
      `,
        variables
      })
    }catch(error){
      console.log('error' , error );
    }
  },[id,blue,orange]);



  return (
    <Container style={{
      display: 'flex',
      flex: 1,
      marginTop : "25%",
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{padding : 50 }}>
        <Button size="lg" variant="primary" onClick={ ()=> handleCount('blue')}>+</Button>
      </div>
      <div style={{padding : 50 }}>
        <Button size="lg" variant="warning" onClick={() => handleCount('orange')}>+</Button>
      </div>
    </Container>
  );
}

export default PlayGame;
