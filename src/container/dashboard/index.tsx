import React , {useState ,  FunctionComponent , useEffect } from 'react';
import gql from 'graphql-tag';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import ReactEcharts from "echarts-for-react";
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import styles from './styles'

const DashBoard: FunctionComponent<{ blueCount?: number, orangeCount?: number }> = ({ blueCount = 0 , orangeCount = 0  }) => {

  // Create an http link:
  const httpLink = new HttpLink({
    uri: 'http://13.230.232.143:4000/graphql'
  });

  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: `ws://13.230.232.143:4000/graphql`,
    options: {
      reconnect: true
    }
  });
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  const [blue , setBlue] = useState(blueCount);
  const [orange , setOrange] = useState(orangeCount);

  useEffect(() => {
    client.subscribe({
      query: gql`
        subscription{
          gameUpdated{
            orange
            id,
            blue
          }
        }
      `
      }).subscribe({
        next({data}) {
          if(data && data.gameUpdated){
            let { blue , orange} = data.gameUpdated
            setBlue(blue)
            setOrange(orange)
          }
        },
        error(err) { console.error('err', err); },
    });
  }, [blue,orange , client])

  let getOption = () => ({
    title: {
      text: "Click Result",
      x: "center"
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        name: "Result",
        type: "pie",
        radius: "55%",
        center: ["50%", "50%"],
        data: [
          {
            value: blue,
            name: "Blue",
            itemStyle: {color: 'blue'},
          },
          {
            value: orange,
            name: "Orange",
            itemStyle: {color: 'orange'},
          }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  });

  const chart = (
    <div style={styles.divStyle}>
      <ReactEcharts option={getOption()} style={{ height: 500 }} />
    </div>
  )

  return chart
}

export default DashBoard;