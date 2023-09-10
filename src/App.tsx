import { Suspense, useEffect, useState } from 'react';
import './App.css';
import Account from './components/Account/Account';
import { listAccountResponse } from './components/Account/type';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Create from './components/Account/Create/Create';

const accountsURI = 'http://localhost:3333/accounts?limit=50';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/accounts"
          element={
            <Suspense fallback={<AccountsLoading />}>
              <Accounts />
            </Suspense>
          }
        ></Route>
        <Route path="/accounts/create" element={<Create />}></Route>
      </Routes>

      <Toaster />
    </>
  );
}

function Accounts() {
  const [res, setRes] = useState<listAccountResponse | null>(null);

  const accountListItems = res?.accounts.map((a) => {
    return <Account key={a.id} account={a} />;
  });

  useEffect(() => {
    fetch(accountsURI)
      .then((response) => response.json())
      .then((data) => {
        setRes(data);
      });
  }, []);
  return <>{accountListItems}</>;
}

function AccountsLoading() {
  return <div>loading...</div>;
}

export default App;
