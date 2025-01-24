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

type CalendarView = 'month' | 'day';

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
    const baseDate = event?.date || initialDate || new Date();
    // Round minutes to nearest 30
    const roundedDate = new Date(baseDate);
    roundedDate.setMinutes(Math.round(roundedDate.getMinutes() / 30) * 30);
    
    return {
      title: event?.title || '',
      date: roundedDate,
      type: event?.type || 'task',
      project: event?.project || '',
      color: event?.color || 'bg-blue-500',
      description: event?.description || ''
    };
  });

  const formatDateForInput = (date: Date) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
  };

  const formatTimeForInput = (date: Date) => {
    return date.toTimeString().slice(0, 5); // Returns HH:mm format
  };

  const formatTimeForSelect = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const value = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const label = new Date(2000, 0, 1, hour, minute).toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        options.push({ value, label });
      }
    }
    return options;
  };

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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.date ? formatDateForInput(formData.date) : ''}
                onChange={(e) => {
                  const newDate = new Date(formData.date || new Date());
                  const selectedDate = new Date(e.target.value);
                  newDate.setFullYear(selectedDate.getFullYear());
                  newDate.setMonth(selectedDate.getMonth());
                  newDate.setDate(selectedDate.getDate());
                  setFormData({ ...formData, date: newDate });
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <select
                value={formData.date ? formatTimeForSelect(formData.date) : ''}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(':').map(Number);
                  const newDate = new Date(formData.date || new Date());
                  newDate.setHours(hours, minutes, 0, 0);
                  setFormData({ ...formData, date: newDate });
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900"
              >
                {generateTimeOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
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

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

interface DayViewProps {
  date: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
  onTimeSlotClick: (hour: number) => void;
}

const DayView = ({ date, events, onEventClick, onTimeSlotClick }: DayViewProps) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const dayEvents = events.filter(event => isSameDay(new Date(event.date), date));

  // Group events by hour
  const eventsByHour = dayEvents.reduce((acc, event) => {
    const hour = new Date(event.date).getHours();
    if (!acc[hour]) acc[hour] = [];
    acc[hour].push(event);
    return acc;
  }, {} as Record<number, Event[]>);

  const formatHour = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}${period}`;
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="relative grid grid-cols-[32px_1fr] divide-x divide-gray-100">
        {/* Time labels */}
        <div className="sticky top-0 z-10 bg-white">
          {hours.map(hour => (
            <div
              key={hour}
              className="h-8 text-[10px] text-gray-400 text-right pr-1 relative"
            >
              <span className="absolute top-[-0.5em] right-1">
                {formatHour(hour)}
              </span>
            </div>
          ))}
        </div>

        {/* Time slots and events */}
        <div className="relative">
          {/* Time slot backgrounds */}
          <div className="absolute inset-0">
            {hours.map(hour => (
              <div
                key={hour}
                className="h-8 border-b border-gray-50 hover:bg-gray-50 cursor-pointer"
                onClick={() => onTimeSlotClick(hour)}
              />
            ))}
          </div>

          {/* Events */}
          <div className="absolute inset-0">
            {Object.entries(eventsByHour).map(([hour, hourEvents]) => {
              return hourEvents.map((event, index) => {
                const eventDate = new Date(event.date);
                const top = `${(eventDate.getHours() * 60 + eventDate.getMinutes()) * (32/60)}px`;
                const width = hourEvents.length > 1 ? `${100 / hourEvents.length}%` : '95%';
                const left = hourEvents.length > 1 ? `${(index * 100) / hourEvents.length}%` : '2.5%';
                
                return (
                  <div
                    key={event.id}
                    className={`absolute rounded ${event.color} text-white px-1 py-0.5 cursor-pointer hover:opacity-90 overflow-hidden group`}
                    style={{
                      top,
                      left,
                      width,
                      height: '30px',
                      zIndex: 10
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                  >
                    <div className="text-[10px] font-medium truncate leading-tight">
                      {event.title}
                    </div>
                    <div className="text-[8px] opacity-90 truncate">
                      {eventDate.toLocaleTimeString([], { 
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </div>
                    {hourEvents.length > 1 && index === hourEvents.length - 1 && (
                      <div className="absolute top-0 right-0 bg-gray-700 text-[8px] px-1 rounded-bl opacity-75">
                        +{hourEvents.length}
                      </div>
                    )}
                  </div>
                );
              });
            })}
          </div>
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
  const [view, setView] = useState<CalendarView>('month');

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

  const formatDateForInput = (date: Date) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
  };

  const modalProps = {
    event: selectedEvent,
    isOpen: isModalOpen,
    onClose: () => {
      setIsModalOpen(false);
      setSelectedEvent(null);
      setSelectedDate(null);
    },
    onSave: (eventData: Omit<Event, 'id'>) => {
      if (isNewEvent) {
        handleAddEvent(eventData);
      } else {
        handleUpdateEvent(eventData);
      }
      setIsModalOpen(false);
      setSelectedDate(null);
    },
    isNew: isNewEvent,
    initialDate: selectedDate
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
      `}</style>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium text-gray-900">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView('month')}
                className={`px-3 py-1 rounded-md text-sm ${
                  view === 'month'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setView('day')}
                className={`px-3 py-1 rounded-md text-sm ${
                  view === 'day'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Day
              </button>
            </div>
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
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
              >
                Today
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
        </div>

        <div className="h-[600px]">
          {view === 'month' ? (
            <div className="h-full">
              <div className="grid grid-cols-7 gap-px">
                {days.map(day => (
                  <div key={day} className="text-center text-xs text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-px h-[calc(100%-32px)]">
                {renderCalendar()}
              </div>
            </div>
          ) : (
            <DayView
              date={currentDate}
              events={events}
              onEventClick={(event) => {
                setSelectedEvent(event);
                setSelectedDate(new Date(event.date));
                setIsNewEvent(false);
                setIsModalOpen(true);
              }}
              onTimeSlotClick={(hour) => {
                const newDate = new Date(currentDate);
                newDate.setHours(hour, 0, 0, 0);
                setSelectedDate(newDate);
                setSelectedEvent(null);
                setIsNewEvent(true);
                setIsModalOpen(true);
              }}
            />
          )}
        </div>
      </div>

      <EventModal {...modalProps} />
    </>
  );
};

export default Calendar;