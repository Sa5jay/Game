import Sidebar from '@/components/Sidebar'
import React from 'react'
import Card from '@/components/Cards/Card'
import { BounceLoader } from 'react-spinners'

interface Props {
  id: number;
  name: string;
  image_background: string;
}


const Stores = () => {
  const [stores, setStores] = React.useState<Props[]>([]);
  const [loading, setLoading] = React.useState(false);
      const fetchstores = async () => {
        if(loading) return;
      setLoading(true);
        const res = await fetch(
          `https://api.rawg.io/api/stores?key=${import.meta.env.VITE_API_KEY}`
        );
        const data = await res.json();
        setStores(data.results);
        setLoading(false);
      };
    
      React.useEffect(() => {
        fetchstores();
      }, []);
  return (
    <div className='grid grid-cols-12 min-h-screen gap-6 p-6'>
        <div className='min-h-screen col-span-2'>
          <Sidebar/>
        </div>
          <div className='col-span-10 ml-3'>
            <h1 className='font-bold text-6xl text-amber-200 mb-4'>
              Stores
            </h1>
            <div className='flex flex-wrap gap-4'>
              {stores.map((store) => (    
            <Card slug={store.id}  title={store.name} type='stores'  image={store.image_background}/> 
          ))}
            </div>
            {loading &&  <div className="flex justify-center items-center"><BounceLoader
 color="red"/></div>}
        </div>
    </div>
  )
}

export default Stores