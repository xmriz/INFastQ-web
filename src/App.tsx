import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TotalUang from './pages/totalUang';
import Maps from './pages/maps';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TotalUang />
  },
  {
    path: '/maps',
    element: <Maps />
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}



export default App;
