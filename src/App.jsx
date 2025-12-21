import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import AppRoutes from './routes/AppRoutes';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
