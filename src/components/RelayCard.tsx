import React from 'react';
import { Zap, ZapOff, Lightbulb, Fan } from 'lucide-react';

interface RelayCardProps {
  relayNumber: 1 | 2;
  status: boolean;
  timestamp?: string | null;
  onToggle: () => void;
  loading?: boolean;
}

const RelayCard: React.FC<RelayCardProps> = ({ 
  relayNumber, 
  status, 
  timestamp, 
  onToggle, 
  loading = false 
}) => {
  const config = {
    1: {
      title: 'Light Control',
      subtitle: 'Relay 1',
      icon: Lightbulb,
      onColor: 'bg-yellow-500',
      offColor: 'bg-gray-300',
    },
    2: {
      title: 'Fan Control',
      subtitle: 'Relay 2',
      icon: Fan,
      onColor: 'bg-blue-500',
      offColor: 'bg-gray-300',
    },
  };

  const { title, subtitle, icon: Icon } = config[relayNumber];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-3 ${status ? 'bg-yellow-50' : 'bg-gray-50'} rounded-lg`}>
            <Icon className={`h-6 w-6 ${status ? 'text-yellow-600' : 'text-gray-600'}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full ${status ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {status ? 'ON' : 'OFF'}
        </div>
      </div>

      <button
        onClick={onToggle}
        disabled={loading}
        className={`w-full py-4 rounded-lg flex items-center justify-center space-x-3 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${
          status 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-green-500 hover:bg-green-600 text-white'
        }`}
      >
        {status ? (
          <>
            <ZapOff className="h-6 w-6" />
            <span className="text-lg font-semibold">TURN OFF</span>
          </>
        ) : (
          <>
            <Zap className="h-6 w-6" />
            <span className="text-lg font-semibold">TURN ON</span>
          </>
        )}
      </button>

      {timestamp && (
        <div className="text-xs text-gray-500 mt-4 text-center">
          Last updated: {new Date(timestamp).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default RelayCard;