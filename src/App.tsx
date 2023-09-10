import { Suspense, useEffect, useState } from 'react';
import './App.css';
import Account from './components/Account/Account';
import { listAccountResponse } from './components/Account/type';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import { default as CreateAccount } from './components/Account/Create';
import Nav from './components/Nav/Nav';
import Chart from './components/Account/Chart';

const accountsURI = 'http://localhost:3333/accounts?limit=50';

function App() {
  const [accountsToggled, setAccountsToggled] = useState<boolean>(false);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Nav
          accountsToggled={accountsToggled}
          setAccountsToggled={setAccountsToggled}
        />
        <main
          style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
        >
          <Routes>
            <Route
              path="/accounts"
              element={
                <Suspense fallback={<AccountsLoading />}>
                  <Accounts />
                </Suspense>
              }
            />
            <Route path="/accounts/chart" element={<Chart />} />
            <Route path="/accounts/create" element={<CreateAccount />} />
          </Routes>
        </main>
      </div>

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
