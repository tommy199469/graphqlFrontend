import React , {useState ,  FunctionComponent , useEffect , useMemo} from 'react';
import gql from 'graphql-tag';
import { ApolloProvider } from 'react-apollo-hooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button , Container}  from 'react-bootstrap';
import { createHttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import ReactEcharts from "echarts-for-react";


const DashBoard: FunctionComponent<{ blueCount?: number, orangeCount?: number }> = ({ blueCount = 0 , orangeCount = 0  }) => {

    const client = new ApolloClient({
        link: createHttpLink({ uri: "http://localhost:4000/graphql" }),
        cache: new InMemoryCache()
    });
  
    const [blue , setBlue] = useState(blueCount);
    const [orange , setOrange] = useState(orangeCount);

    useEffect(() => {
        const intervalId = setInterval(() => { 
            console.log('called');
            try{
                client.query({
                    query: gql`
                        {
                            getNumbers{
                                orange
                                blue
                            }
                        }
                    `
                }).then((result)=>{
                    let data = result && result.data && result.data.getNumbers && result.data.getNumbers
                    if(data){
                        setBlue(data.blue)
                        setOrange(data.orange)
                    }
                })
    
            }catch(error){
                console.log('error' , error );
            }
        }, 5000)
      
        return () => clearInterval(intervalId); //This is important
      
      }, [blue, orange])

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
        <div
            style={{
                marginTop : "20%",
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <ReactEcharts option={getOption()} style={{ height: 500 }} />
        </div>
    )
  return chart
}

export default DashBoard;