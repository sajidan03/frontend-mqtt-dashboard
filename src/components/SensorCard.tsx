import React from 'react';
import { Thermometer, Droplets, DoorClosed } from 'lucide-react';

interface SensorCardProps {
  type: 'temperature' | 'humidity' | 'door';
  value: number;
  timestamp?: string | null;
}

const SensorCard: React.FC<SensorCardProps> = ({ type, value, timestamp }) => {
  const config = {
    temperature: {
      title: 'Temperature',
      unit: '°C',
      icon: Thermometer,
      color: 'red',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
      textColor: 'text-red-600',
    },
    humidity: {
      title: 'Humidity',
      unit: '%',
      icon: Droplets,
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-600',
    },
    door: {
      title: 'Door Status',
      unit: '',
      icon: DoorClosed,
      color: value === 1 ? 'green' : 'red',
      bgColor: value === 1 ? 'bg-green-50' : 'bg-red-50',
      borderColor: value === 1 ? 'border-green-500' : 'border-red-500',
      textColor: value === 1 ? 'text-green-600' : 'text-red-600',
    },
  };

  const { title, unit, icon: Icon, bgColor, borderColor, textColor } = config[type];

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${borderColor}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 ${bgColor} rounded-lg`}>
            <Icon className={`h-6 w-6 ${textColor}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">Real-time reading</p>
          </div>
        </div>
        
        <div className="text-right">
          <span className={`text-3xl font-bold ${textColor}`}>
            {type === 'door' ? (value === 1 ? 'CLOSED' : 'OPEN') : value}
            {unit}
          </span>
          {type === 'door' && (
            <div className={`text-sm font-medium ${textColor}`}>
              {value === 1 ? '✓ Secured' : '⚠️ Alert'}
            </div>
          )}
        </div>
      </div>

      {type !== 'door' && (
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${type === 'temperature' ? 'bg-red-500' : 'bg-blue-500'}`}
            style={{ 
              width: type === 'temperature' 
                ? `${Math.min(value * 2, 100)}%` 
                : `${value}%` 
            }}
          ></div>
        </div>
      )}

      {timestamp && (
        <div className="text-xs text-gray-500 mt-4">
          Last updated: {new Date(timestamp).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default SensorCard;