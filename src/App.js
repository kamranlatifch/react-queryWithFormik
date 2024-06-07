      import { ChakraProvider, Heading, Switch } from '@chakra-ui/react';
      import './App.css';
      import { QueryClient,QueryClientProvider } from 'react-query';
      import Home from './Home/Home';
      // import { ReactQueryDevtools } from 'react-query-devtools';
      import { Route, BrowserRouter, Routes } from 'react-router-dom';
      function App() {

        const queryClient=new QueryClient();
        return (
          <ChakraProvider>
            <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" exact element={<Home/>}/>
                  
                </Routes>
              </BrowserRouter>
            {/* <ReactQueryDevtools/> */}
            </QueryClientProvider> 
          </ChakraProvider>
        );
      }

      export default App;

      // cd6807e42e3e13a8d56a28acd067d23e76d2b2b254f449e970cebf0406c09a13