import React from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../lib/api';

const Header: React.FC = () => {
  const { data: statusData, refetch } = useQuery({
    queryKey: ['status'],
    queryFn: apiService.getSystemStatus,
    refetchInterval: 10000,
  });

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-12 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            {/* <Home className="h-8 w-8 text-blue-600" /> */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Sajidan Dashboard</h1>
              <p className="text-sm text-gray-600">MQTT Protocol</p>
            </div>
          </div>

          {/* Status & Controls */}
          <div className="flex items-center space-x-4">
            {/* Connection Status */}
            <div className={`flex items-center px-3 py-2 rounded-lg ${statusData?.mqtt_connected ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {statusData?.mqtt_connected ? <Wifi className="h-5 w-5 mr-2" /> : <WifiOff className="h-5 w-5 mr-2" />}
              <span className="font-medium">
                MQTT: {statusData?.mqtt_connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => refetch()}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;