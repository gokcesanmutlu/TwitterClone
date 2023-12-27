import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import FeedPage from "./pages/FeedPage";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
  //console.log("mevcut kullanıcı", auth.currentUser)
  //bu bize oturumu açık olan kulanıcıların bilgisini verecektir

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/feed" element={<FeedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
