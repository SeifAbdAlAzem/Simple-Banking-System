import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CustomerDetailsPage from "./Pages/CustomerDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customer/:id" element={<CustomerDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
