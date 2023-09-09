import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TotalUang from './pages/totalUang';
import Maps from './pages/maps';
import MasjidLoc from './pages/masjidLoc';

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
    path: '/masjid',
    element: <MasjidLoc />
  },
])

function App() {
  return (
    <div className='bg-[rgba(0,0,0,0.2)] min-h-screen mt-16'>
      <RouterProvider router={router} />
    </div>
  )
}



export default App;
