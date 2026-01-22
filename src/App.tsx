import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Header from './components/Header';
import SensorCard from './components/SensorCard';
import RelayCard from './components/RelayCard';
import { apiService } from './lib/api';

function App() {
  const queryClient = useQueryClient();

  const { data: sensorData } = useQuery({
    queryKey: ['sensor'],
    queryFn: apiService.getSensorData,
    refetchInterval: 3000,
  });

  const { data: relayData } = useQuery({
    queryKey: ['relay'],
    queryFn: apiService.getRelayStatus,
    refetchInterval: 3000,
  });

  const controlRelayMutation = useMutation({
    mutationFn: ({ relay1, relay2 }: { relay1: boolean; relay2: boolean }) =>
      apiService.controlRelay(relay1, relay2),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relay'] });
    },
  });

  const handleToggleRelay = (relayName: 'relay1' | 'relay2') => {
    if (!relayData?.data) return;

    const newRelay1 = relayName === 'relay1' ? !relayData.data.relay1 : relayData.data.relay1;
    const newRelay2 = relayName === 'relay2' ? !relayData.data.relay2 : relayData.data.relay2;
    
    controlRelayMutation.mutate({ relay1: newRelay1, relay2: newRelay2 });
  };

  const handleAllOn = () => {
    controlRelayMutation.mutate({ relay1: true, relay2: true });
  };

  const handleAllOff = () => {
    controlRelayMutation.mutate({ relay1: false, relay2: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-12 py-8">
        {/* Sensor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SensorCard
            type="temperature"
            value={sensorData?.data?.temperature || 0}
            timestamp={sensorData?.data?.timestamp}
          />
          <SensorCard
            type="humidity"
            value={sensorData?.data?.humidity || 0}
            timestamp={sensorData?.data?.timestamp}
          />
          <SensorCard
            type="door"
            value={sensorData?.data?.magnet_status || 0}
            timestamp={sensorData?.data?.timestamp}
          />
        </div>

        {/* Relay Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Individual Controls */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Device Controls</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RelayCard
                  relayNumber={1}
                  status={relayData?.data?.relay1 || false}
                  timestamp={relayData?.data?.timestamp}
                  onToggle={() => handleToggleRelay('relay1')}
                  loading={controlRelayMutation.isPending}
                />
                <RelayCard
                  relayNumber={2}
                  status={relayData?.data?.relay2 || false}
                  timestamp={relayData?.data?.timestamp}
                  onToggle={() => handleToggleRelay('relay2')}
                  loading={controlRelayMutation.isPending}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Master Controls */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Master Control</h3>
              <div className="space-y-4">
                <button
                  onClick={handleAllOn}
                  disabled={controlRelayMutation.isPending}
                  className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  TURN ALL ON
                </button>
                <button
                  onClick={handleAllOff}
                  disabled={controlRelayMutation.isPending}
                  className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  TURN ALL OFF
                </button>
              </div>
              
              {/* System Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-3">System Information</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>MQTT Status:</span>
                    <span className={`font-medium ${sensorData?.mqtt_connected ? 'text-green-600' : 'text-red-600'}`}>
                      {sensorData?.mqtt_connected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Update:</span>
                    <span>{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;