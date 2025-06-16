import CalendarCRUD from "../components/CalendarCRUD";
import Calendar from "../components/calendar"
import Dashboard from "../components/Dashboard";

function Home() {
    return (
        <Dashboard component={<CalendarCRUD />} />
    );
}

export default Home;