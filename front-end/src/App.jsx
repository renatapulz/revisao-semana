import { Outlet } from 'react-router-dom';
import NavBar from "./../src/assets/header/header";
import {AuthContextProvider} from "./hooks/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <NavBar />
      <Outlet />
    </AuthContextProvider>
  );
}

export default App;