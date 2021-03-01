
import './App.css';
import { ApolloClient,ApolloCache, InMemoryCache} from "@apollo/client";



function App() {



  const client = new ApolloClient({
    link : "https://graphql-pokemon2.vercel.app/",
    cache: new InMemoryCache()
  })

  return (
    <div >
     
    </div>
  );
}

export default App;
