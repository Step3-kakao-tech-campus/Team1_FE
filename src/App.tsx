import Header from 'components/organisms/HeaderBar';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderBar from 'components/organisms/HeaderBar';
import NavigationBar from 'components/organisms/NavigationBar';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <HeaderBar />
      <ErrorBoundary fallback={<p>에러...</p>}>
        <Suspense fallback={<p>로딩...</p>}>
          <Routes>
            <Route path={'/'} element={<div>메인...</div>} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <NavigationBar />
    </BrowserRouter>
  );
}

export default App;
