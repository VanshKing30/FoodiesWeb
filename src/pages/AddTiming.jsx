import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddTiming = () => {
  const [selectedDay, setSelectedDay] = useState('monday');
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [timings, setTimings] = useState({
    monday: { morningTime: '', afternoonTime: '', eveningTime: '' },
    tuesday: { morningTime: '', afternoonTime: '', eveningTime: '' },
    wednesday: { morningTime: '', afternoonTime: '', eveningTime: '' },
    thursday: { morningTime: '', afternoonTime: '', eveningTime: '' },
    friday: { morningTime: '', afternoonTime: '', eveningTime: '' },
    saturday: { morningTime: '', afternoonTime: '', eveningTime: '' },
    sunday: { morningTime: '', afternoonTime: '', eveningTime: '' },
  });

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  useEffect(() => {
    // Fetch existing timings from API
    axios.get(`${process.env.REACT_APP_BASE_URL}/${id}/timing`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        const fetchedTimings = response.data;
        const updatedTimings = { ...timings };

        fetchedTimings.forEach(timing => {
          const dayLower = timing.day.toLowerCase();
          if (updatedTimings[dayLower]) {
            updatedTimings[dayLower] = {
              morningTime: timing.morningTime || '',
              afternoonTime: timing.afternoonTime || '',
              eveningTime: timing.eveningTime || '',
            };
          }
        });

        setTimings(updatedTimings);
      })
      .catch(error => console.error("Error fetching timings:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  const handleTimeChange = (period, value) => {
    setTimings(prev => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [period]: value,
      },
    }));
  };

  const handleSave = async () => {
    axios.put(`${process.env.REACT_APP_BASE_URL}/${id}/timing`, 
      {
        day: selectedDay,
        morningTime: timings[selectedDay].morningTime,
        afternoonTime: timings[selectedDay].afternoonTime,
        eveningTime: timings[selectedDay].eveningTime,
      }, 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => alert('Timing updated successfully'))
    .catch(error => console.error("Error updating timings:", error));
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4 bg-gray-100">
        <ul>
          {days.map(day => (
            <li
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`p-2 cursor-pointer ${selectedDay === day ? 'bg-green-500 text-white' : ''}`}
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-xl mb-4">Set Timing for {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}</h2>
        <div className="mb-4">
          <label className="block mb-2">Morning:</label>
          <input
            type="text"
            value={timings[selectedDay]?.morningTime || ''}
            onChange={(e) => handleTimeChange('morningTime', e.target.value)}
            className="border p-2 w-full"
            placeholder='Example: 08:00 am - 12:00 pm'
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Afternoon:</label>
          <input
            type="text"
            value={timings[selectedDay]?.afternoonTime || ''}
            onChange={(e) => handleTimeChange('afternoonTime', e.target.value)}
            className="border p-2 w-full"
            placeholder='Example: 12:00 pm - 04:00 pm'
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Evening:</label>
          <input
            type="text"
            value={timings[selectedDay]?.eveningTime || ''}
            onChange={(e) => handleTimeChange('eveningTime', e.target.value)}
            className="border p-2 w-full"
            placeholder='Example: 06:00 pm - 10:00 pm'
            required
          />
        </div>
        <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded">
          Save Timing
        </button>
      </div>
    </div>
  );
};

export default AddTiming;
