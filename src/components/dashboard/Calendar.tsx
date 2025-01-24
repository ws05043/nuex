'use client';
import { useState, useEffect } from 'react';

interface Event {
  id: string;
  title: string;
  date: Date;
  type: 'deadline' | 'meeting' | 'task';
  project: string;
  color: string;
  description?: string;
}

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<Event, 'id'>) => void;
  isNew?: boolean;
  initialDate?: Date | null;
}

const THEME_COLORS = [
  { name: 'Blue', value: 'bg-blue-500' },
  { name: 'Purple', value: 'bg-purple-500' },
  { name: 'Green', value: 'bg-green-500' },
  { name: 'Red', value: 'bg-red-500' },
  { name: 'Orange', value: 'bg-orange-500' },
  { name: 'Teal', value: 'bg-teal-500' },
  { name: 'Indigo', value: 'bg-indigo-500' },
  { name: 'Gray', value: 'bg-gray-500' },
];

const EventModal = ({ event, isOpen, onClose, onSave, isNew = false, initialDate }: EventModalProps) => {
  const [formData, setFormData] = useState<Partial<Event>>(() => {
    const baseData = event || {
      title: '',
      date: initialDate || new Date(),
      type: 'task',
      project: '',
      color: 'bg-blue-500',
      description: ''
    };
    
    return baseData;
  });

  useEffect(() => {
    if (isOpen) {
      setFormData(event || {
        title: '',
        date: initialDate || new Date(),
        type: 'task',
        project: '',
        color: 'bg-blue-500',
        description: ''
      });
    }
  }, [isOpen, initialDate, event]);

  if (!isOpen) return null;

  const formatDateForInput = (date: Date) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    selectedDate.setHours(12, 0, 0, 0);
    setFormData({ ...formData, date: selectedDate });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {isNew ? 'Add New Event' : 'Event Details'}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
              placeholder="Enter event title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={formData.date ? formatDateForInput(formData.date) : ''}
              onChange={handleDateChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Event['type'] })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900"
            >
              <option value="task">Task</option>
              <option value="deadline">Deadline</option>
              <option value="meeting">Meeting</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project
            </label>
            <input
              type="text"
              value={formData.project}
              onChange={(e) => setFormData({ ...formData, project: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
              placeholder="Enter project name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="grid grid-cols-8 gap-2">
              {THEME_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setFormData({ ...formData, color: color.value })}
                  className={`w-8 h-8 rounded-full ${color.value} hover:opacity-80 transition-opacity
                    ${formData.color === color.value ? 'ring-2 ring-offset-2 ring-blue-600' : ''}
                  `}
                  title={color.name}
                  type="button"
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
              rows={3}
              placeholder="Enter event description"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (formData.title && formData.date) {
                onSave(formData as Omit<Event, 'id'>);
                onClose();
              }
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {isNew ? 'Add Event' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewEvent, setIsNewEvent] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleAddEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date(eventData.date),
      color: eventData.color || 'bg-blue-500',
    };
    
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  const handleUpdateEvent = (eventData: Omit<Event, 'id'>) => {
    if (selectedEvent) {
      const updatedEvents = events.map(event => 
        event.id === selectedEvent.id 
          ? { ...event, ...eventData }
          : event
      );
      setEvents(updatedEvents);
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    setIsModalOpen(false);
  };

  const getEventColor = (type: Event['type']) => {
    switch (type) {
      case 'deadline':
        return 'bg-red-500';
      case 'meeting':
        return 'bg-blue-500';
      case 'task':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-100"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day, 12, 0, 0, 0);
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return isSameDay(eventDate, date);
      });

      days.push(
        <div 
          key={day} 
          className="h-24 border border-gray-100 p-1 cursor-pointer hover:bg-gray-50 relative"
          onClick={() => {
            setSelectedDate(date);
            setSelectedEvent(null);
            setIsNewEvent(true);
            setIsModalOpen(true);
          }}
        >
          <div className="flex justify-between items-start mb-1">
            <span className={`text-sm ${
              isSameDay(date, new Date()) 
                ? 'bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center' 
                : 'text-gray-600'
            }`}>
              {day}
            </span>
          </div>
          <div className="absolute top-8 left-1 right-1 bottom-1 overflow-y-auto custom-scrollbar">
            <div className="space-y-1 pr-1">
              {dayEvents.map(event => (
                <div 
                  key={event.id}
                  className={`${event.color} text-white text-xs p-1.5 rounded-md truncate cursor-pointer hover:opacity-90`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEvent(event);
                    setSelectedDate(new Date(event.date));
                    setIsNewEvent(false);
                    setIsModalOpen(true);
                  }}
                >
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #E5E7EB;
          border-radius: 20px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #D1D5DB;
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #E5E7EB transparent;
        }
        
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #D1D5DB;
        }
      `}</style>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium text-gray-900">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              className="p-2 hover:bg-gray-50 rounded-xl"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              className="p-2 hover:bg-gray-50 rounded-xl"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px">
          {days.map(day => (
            <div key={day} className="text-center text-sm text-gray-500 py-2">
              {day}
            </div>
          ))}
          {renderCalendar()}
        </div>
      </div>

      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
          setSelectedDate(null);
        }}
        onSave={(eventData) => {
          if (isNewEvent) {
            handleAddEvent(eventData);
          } else {
            handleUpdateEvent(eventData);
          }
          setIsModalOpen(false);
          setSelectedDate(null);
        }}
        isNew={isNewEvent}
        initialDate={selectedDate}
      />
    </>
  );
};

export default Calendar; 