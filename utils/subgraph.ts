import axios from "axios";

const subgraphUrl = process.env.NEXT_PUBLIC_GRAPH_URL as string

export const fetchFromSubgraph = async (query: string, variables?: any) => {
        const {data} = await axios.post(subgraphUrl, {
        query,
        variables
      });
      return data.data;
      
}