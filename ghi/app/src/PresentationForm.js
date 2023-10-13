import React, { useEffect, useState} from "react";

function PresentationForm (){
    const [conferences, setConferences] = useState([]);

    const [conference, setConference] = useState("");
    const handleConferenceChange = (event) => {
        const value = event.target.value;
        setConference(value);
    }

    const [name, setName] = useState("");
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const [email, setEmail] = useState("");
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
    }
    const [company, setCompany] = useState("");
    const handleCompanyChange = (event) => {
        const value = event.target.value;
        setCompany(value);
    }
    const [title, setTitle] = useState("");
    const handleTitleChange = (event) => {
        const value = event.target.value;
        setTitle(value);
    }
    const [synopsis, setSynopsis] = useState("");
    const handleSynopsisChange = (event) => {
        const value = event.target.value;
        setSynopsis(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.presenter_name = name;
        data.company_name = company;
        data.presenter_email = email;
        data.title = title;
        data.synopsis = synopsis;

        const presentationUrl = `http://localhost:8000/api/conferences/${conference}/presentations/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "apllications/json",
            },
        };
        const response = await fetch(presentationUrl, fetchConfig);
        if (response.ok) {
            const newPresentation = await response.json();
            console.log(newPresentation);

            setConferences([]);
            setConference('');
            setName('');
            setEmail('');
            setCompany('');
            setTitle('');
            setSynopsis('');
        }
    }
    const fetchData = async () => {
        const url = "http://localhost:8000/api/conferences/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setConferences(data.conferences);
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
                <h1>Create a new presentation</h1>
                <form onSubmit={handleSubmit} id="create-presentation-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleNameChange} placeholder="Presenter name" required
                        type="text" name="presenter_name" id="presenter_name"
                        className="form-control"/>
                        <label htmlFor="presenter_name">Presenter name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleEmailChange} placeholder="Presenter email" required
                        type="email" name="presenter_email" id="presenter_email"
                        className="form-control"/>
                        <label htmlFor="presenter_email">Presenter email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleCompanyChange} placeholder="Company name" required
                        type="text" name="company_name" id="company_name"
                        className="form-control"/>
                        <label htmlFor="company_name">Company name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleTitleChange} placeholder="Title" required
                        type="text" name="title" id="title"
                        className="form-control"/>
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Synopsis">Synopsis</label>
                        <textarea onChange={handleSynopsisChange} className="form-control" name="synopsis"
                        id="synopsis" rows="3"></textarea>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleConferenceChange} required id="conference" name="conference" className="form-select">
                            <option value="">Choose a conference</option>
                            {conferences.map(conference => {
                                return (
                                    <option key={conference.name} value={conference.id}>
                                        {conference.name}
                                    </option>
                                )
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
export default PresentationForm;
