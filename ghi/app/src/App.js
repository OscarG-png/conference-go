import Nav from './Nav';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import PresentationForm from "./PresentationForm"
import AttendeeForm from './AttendeeForm';
import MainPage from './MainPage';

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="locations">
            <Route path="new" element={<LocationForm />} />
          </Route>
          <Route path="conferences">
            <Route path="new" element={<ConferenceForm />} />
            </Route>
          <Route path="attendees">
            <Route path="new" element={<AttendeeForm />} />
            <Route path="List"element={<AttendeesList />} />
          </Route>
          <Route path="presentations">
            <Route path="new" element={<PresentationForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
