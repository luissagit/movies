import Home from './pages/home';
import Detail from './pages/detail';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
const { Content } = Layout;

function App() {
  return (
    <div className="App">
        <Content style={{ padding: '0 50px' }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route
              path="*"
              element={<Navigate to="/home" />}
            />
          </Routes>
        </Content>
      </div>
  );
}

export default App;
