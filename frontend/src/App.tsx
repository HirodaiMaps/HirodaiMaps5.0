import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TopPage } from './components/TopPage';
import BuildingDetail from './components/BuildingDetail';
import Path from './components/Path';
import CheckpointDetail from './components/CheckpointDetail';
import { DiningHallHours } from './components/DiningHallHours';
import { LanguageProvider } from './components/LanguageProvider';
import { BuildingListPage } from './components/BuildingListPage';
import { BusTimetableComponent } from './components/BusTimetable';
import { DestinationSelectingPage } from './components/DestinationSelectingPage';
import BuildingCallTrackerPage from './components/Stats';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/:currbuildingId" element={<DestinationSelectingPage />} />
          <Route path="/building/:buildingId/:buildingIdFrom" element={<BuildingDetail />} />
          <Route path="/timetable/:stopId/:checkpointId" element={<BusTimetableComponent />} />
          <Route path="/paths/:pathId" element={<Path />} />
          <Route path="/checkpoint/:checkpointId" element={<CheckpointDetail />} />
          <Route path="/dininghours" element={<DiningHallHours />} />
          <Route path="/buildinglist" element={<BuildingListPage />} />
          <Route path="/bustimetable" element={<BusTimetableComponent />} />
          <Route path="/stats" element={<BuildingCallTrackerPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
