import Header from './components/layout/Header.tsx';
import Footer from './components/layout/Footer.tsx';
import PageRouter from './pages/PageRouter.tsx';
import './App.css';
import GlobalStyle from './styles/GlobalStyle.tsx';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <PageRouter />
      <Footer />
    </>
  );
}

export default App;
