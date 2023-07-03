import Header from './components/layout/Header.tsx';
import Footer from './components/layout/Footer.tsx';
import PageRouter from './pages/PageRouter.tsx';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <PageRouter />
      <Footer />
    </>
  );
}

export default App;
