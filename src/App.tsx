import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TotalUang from './pages/totalUang';
import Maps from './pages/maps';
import Wifi from './pages/wifi';
import Masjid from './pages/masjid';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TotalUang />
  },
  {
    path: '/maps',
    element: <Maps />
  },
  {
    path: '/wifi',
    element: <Wifi />
  },
  {
    path: '/masjid',
    element: <Masjid />
  }
])

function App() {
  return (
    <div className='bg-[rgba(0,0,0,0.2)] min-h-screen'>
      <RouterProvider router={router} />
    </div>
  )
}



export default App;
