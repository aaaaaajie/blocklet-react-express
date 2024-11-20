import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import EditProfile from './pages/edit-profile';
import Home from './pages/home';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/edit" Component={EditProfile} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <App />
    </Router>
  );
}
