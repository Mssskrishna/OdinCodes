// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import BlogPage from "./BlogPage"; // New component to show blog details
import BlogList from "./BlogList";
import Login from "./Login";
import { AuthProvider } from "./AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route for the home page that shows the list of blogs */}
          <Route path="/" element={<BlogList />} />
          {/* Route for showing individual blog content */}
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
