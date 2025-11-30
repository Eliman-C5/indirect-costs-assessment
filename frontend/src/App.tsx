// import PricingTable from './components/PricingClient';
import Sidebar from './components/Sidebar';
import { useEffect, useState } from 'react';
import { useGetPlants } from './hooks/useGetPlants';

export const App = () => {
  const [currentPlant, setCurrentPlant] = useState({ id: '', name: '' });

  const { plants, loading } = useGetPlants();

  useEffect(() => {
    if (plants.length === 0) return;
    setCurrentPlant({ id: plants[0].id || '', name: plants[0].name || '' });
  }, [plants]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar plants={plants} currentPlant={currentPlant} setCurrentPlant={setCurrentPlant} loading={loading} />
      <main className="flex-1 overflow-auto">
        {/* <PricingTable plantId={currentPlant.id} /> */}
      </main>
    </div>
  );
};
