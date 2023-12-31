import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./routes/home"
import Profile from "./routes/profile"
import Layout from "./component/layout"
import Login from "./routes/login"
import CreateAccount from './routes/createAccount'
import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import { useEffect, useState } from "react"
import LoadingScreen from "./component/loading-screen"
import { auth } from "./firebase"
import {styled} from "styled-components"
import ProtectedRoute from "./component/protected-route"

const router = createBrowserRouter([{
  path:"/",
  element:<ProtectedRoute><Layout /></ProtectedRoute>,
  children:[{
    path:"",
    element:<Home/>
  },
  {
    path:"profile",
    element: <Profile/>
  },
  ],
  },
  {
      path:'/login',
      element:<Login/>
    },
  {
    path:'/createaccount',
    element:<CreateAccount/>
  }
])


const GlobalStyles = createGlobalStyle`${reset};
*{
  box-sizing:border-box;
}
  body{
    background-color:black;
    color:white;
    font-family:
  }
`;


const Wrapper = styled.div`
  height:100vh;
  display:flex;
  justify-content:center;
`;


function App() {
  const [isLoading,setLoading] = useState(true);
  const init = async () => {
      // wait for firebase to fetch credentials and verify the user
      await auth.authStateReady();

      // Mimic firebase waittime 
      // setTimeout(() => {
      //   setIsLoading(false)
      // }, 2000);
      setLoading(false)
  }

  useEffect(()=>{
    init();
  },[]);
  return (
    <>
      <Wrapper>
        <GlobalStyles/>
        {isLoading ? <LoadingScreen/>:<RouterProvider router={router}></RouterProvider>}
      </Wrapper>
    </>
  )
}

export default App
