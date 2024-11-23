import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Signup from './components/Signup.jsx'
import Signin from './components/Signin.jsx'
import Profile from './components/Profile.jsx'

//bike related
import Bikes from './components/bike/Bikes.jsx'
import BikeCreate from './components/bike/BikeCreate.jsx'
import BikeUpdate from './components/bike/BikeUpdate.jsx'
import BikeDelete from './components/bike/BikeDelete.jsx'
import BikeComponents from './components/bike/BikeComponents.jsx';
import CreateBikeComponent from './components/bike/CreateBikeComponent.jsx';
import UpdateBikeComponent from './components/bike/UpdateBikeComponent.jsx';
import BikeComponentDelete from './components/bike/BikeComponentDelete.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/bikes",
    element: <Bikes />,
  },
  {
    path: "/bikes/create",
    element: <BikeCreate />,
  },
  {
    path: "/bikes/:bikeId/components/create",
    element: <CreateBikeComponent />,
  },
  {
    path: "/components/:componentId/update",
    element: <UpdateBikeComponent />,
  },
  {
    path: "/bikes/:bikeId/update",
    element: <BikeUpdate />,
  },
  {path: "/bikes/:bikeId/delete",
  element: <BikeDelete />,
},
{path: "/components/:componentId/delete",
  element: <BikeComponentDelete />,
},
{
  path: "bikes/:bikeId/components",
  element:<BikeComponents/>,
},
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Signin />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

export default router;