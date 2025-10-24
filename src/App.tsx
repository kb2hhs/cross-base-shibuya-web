import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LocalizedApp from './pages/LocalizedApp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LocalizedApp language="en" />} />
        <Route path="/ja" element={<LocalizedApp language="ja" />} />
        <Route path="/zh-cn" element={<LocalizedApp language="zh-cn" />} />
        <Route path="/zh-tw" element={<LocalizedApp language="zh-tw" />} />
        <Route path="/ko" element={<LocalizedApp language="ko" />} />
        <Route path="/pt" element={<LocalizedApp language="pt" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
