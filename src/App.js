    import { ChakraProvider, Heading, Switch } from '@chakra-ui/react';
    import './App.css';
    import { QueryClient,QueryClientProvider } from 'react-query';
    import Home from './Home/Home';
    import { Route, Router, Routes } from 'react-router-dom';
    function App() {

      const queryClient=new QueryClient();
      return (
        <ChakraProvider>
        <QueryClientProvider client={queryClient}>
        {/* <Heading> Welcome To React Query Practice with with Formik and Yup
        </Heading>
        <Home/> */}
        <Router>
    <Switch>

      <Route path='/' exact>
        <Home/>
      </Route>
    </Switch>

        </Router>
        </QueryClientProvider> 
        </ChakraProvider>
      );
    }

    export default App;

    // cd6807e42e3e13a8d56a28acd067d23e76d2b2b254f449e970cebf0406c09a13