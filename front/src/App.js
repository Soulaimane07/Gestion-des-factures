import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Auth from './Interfaces/Auth';
import { login, logout } from './Components/Redux/Slices/UserSlice';
import Admin from './Interfaces/Admin';
import { fetchFournisseurs } from './Components/Redux/Slices/FournisseurSlice';
import { fetchClients } from './Components/Redux/Slices/ClientSlice';

function App() {
  const user = JSON.parse(localStorage.getItem("kerkashi-user"))
  const dispatch = useDispatch()

  if (user) {
    dispatch(login(user))
    dispatch(fetchFournisseurs())
    dispatch(fetchClients())
  } else {
    dispatch(logout())
  }

  const logged = useSelector(state => state.user.logged)

  return (
    <div className="App">
      {logged ? <Admin /> : <Auth />}
    </div>
  );
}

export default App;
