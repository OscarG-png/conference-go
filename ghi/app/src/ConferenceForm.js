import React, { useEffect, useState } from "react";

function ConferenceForm() {
    const [states, setStates] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/states/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setStates(data.states);
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
            <form id="create-conference-form">
                <div className="form-floating mb-3">
                    <input placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input placeholder="starts" required type="date" name="starts" id="start" className="form-control"/>
                    <label htmlFor="starts">start</label>
                </div>
                <div className="form-floating mb-3">
                    <input placeholder="ends" required type="date" name="ends" id="end" className="form-control"/>
                    <label htmlFor="ends">end</label>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" name="description" id="description" rows="3"></textarea>
                </div>
                <div className="form-floating mb-3">
                    <input placeholder="Max presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control"/>
                    <label htmlFor="max_presentations">Maximum presentations</label>
                </div>
                <div className="form-floating mb-3">
                    <input placeholder="Max attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control"/>
                    <label htmlFor="max_attendees">Maximum attendees</label>
                </div>
                <div className="mb-3">
                    <select required id="location" name="location" className="form-select">
                        <option value="">Choose a location</option>
                        {states.map(state => {
                            return (
                                <option key={state.abbreviation} value={state.abbreviation}>
                                    {state.name}
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
