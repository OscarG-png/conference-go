import React, { useEffect, useState } from "react";

function ConferenceForm() {
    const [locations, setlocations] = useState([]);

    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const [start, setStart] = useState('');
    const handleStartChange = (event) => {
        const value = event.target.value;
        setStart(value);
    }

    const [end, setEnd] = useState('');
    const handleEndChange = (event) => {
        const value = event.target.value;
        setEnd(value);
    }

    const [description, setDescription] = useState('');
    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
    }

    const [presentations, setPresentation] = useState('');
    const handlePresentationChange = (event) => {
        const value = event.target.value;
        setPresentation(value);
    }

    const [attendees, setAttendees] = useState('');
    const handleAttendeesChange = (event) => {
        const value = event.target.value;
        setAttendees(value);
    }
    const [location, setLocation] = useState('');
    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = name;
        data.starts = start;
        data.ends = end;
        data.description = description;
        data.max_presentations = presentations;
        data.max_attendees = attendees;
        data.location = location;

    const conferenceUrl = "http://localhost:8000/api/conferences/";
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "applicatons/json",
        },
    };

    const response = await fetch(conferenceUrl, fetchConfig);
    if (response.ok) {
        const newConference = await response.json();
        console.log(newConference);

        setName('');
        setStart('');
        setEnd('');
        setDescription('');
        setPresentation('');
        setAttendees('');
    }
    }
    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setlocations(data.locations);
            console.log(data);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="container">
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Create a new conference</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
                <div className="form-floating mb-3">
                    <input onChange={handleNameChange} placeholder="Name" required type="text"
                    name="name" id="name" className="form-control"/>
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleStartChange} placeholder="starts" required type="date"
                    name="starts" id="start" className="form-control"/>
                    <label htmlFor="starts">start</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleEndChange} placeholder="ends" required type="date"
                    name="ends" id="end" className="form-control"/>
                    <label htmlFor="ends">end</label>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea onChange={handleDescriptionChange} className="form-control" name="description"
                    id="description" rows="3"></textarea>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handlePresentationChange} placeholder="Max presentations"
                    required type="number" name="max_presentations" id="max_presentations"
                    className="form-control"/>
                    <label htmlFor="max_presentations">Maximum presentations</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleAttendeesChange} placeholder="Max attendees" required
                    type="number" name="max_attendees" id="max_attendees" className="form-control"/>
                    <label htmlFor="max_attendees">Maximum attendees</label>
                </div>
                <div className="mb-3">
                    <select onChange={handleLocationChange} required id="location" name="location"
                    className="form-select">
                        <option value="">Choose a location</option>
                        {locations.map(location => {
                            return (
                                <option key={location.id} value={location.id}>
                                    {location.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
            </div>
        </div>
        </div>
    </div>
    )
}

export default ConferenceForm;
