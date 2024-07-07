import GlobalStyle from './GlobalStyle';
import { RouterProvider } from 'react-router-dom';
import './App.scss';
import { router } from './routes/router';
import { AuthProvider } from './context/AuthContext';
import { ModalProvider } from './context/ModalContext';

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </AuthProvider>
    </>
  );
}
export default App;
