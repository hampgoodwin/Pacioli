import { Suspense, useEffect, useState } from 'react';
import './App.css';
import Account from './components/Account/Account';
import {
  account,
  createAccount,
  createAccountRequest,
  createAccountResponse,
  emptyDefaultCreateAccount,
  listAccountResponse
} from './components/Account/type';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const [createAccount, setCreateAccount] = useState<createAccount>(
    emptyDefaultCreateAccount
  );
  const [createdAccounts, setCreatedAccounts] = useState<Array<account>>([]);

  function handleChangeCreateAccountData(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setCreateAccount((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  function handelCreateAccountSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // post to API
    const createAccountReq: createAccountRequest = {
      account: createAccount
    };
    fetch(accountsURI, {
      method: 'POST',
      body: JSON.stringify(createAccountReq)
    })
      .then((response) => {
        if (response.status !== 201) {
          switch (response.status) {
            case 422:
              toast.error('account already exists');
              break;
            default:
              break;
          }
          return;
        }
        return response.json();
      })
      .then((data: createAccountResponse) => {
        if (data === undefined) {
          return;
        }

        setCreatedAccounts(createdAccounts.concat(data.account));
        setCreateAccount(emptyDefaultCreateAccount);
        toast.success(`account ${data.account.name} created`);
      });
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flex: 'flex-grow',
          flexDirection: 'column'
        }}
      >
        <form
          style={{
            display: 'flex',
            flex: 'flex-shrink',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
          }}
          onSubmit={handelCreateAccountSubmit}
        >
          <label>
            name
            <input
              name="name"
              value={createAccount?.name}
              onChange={handleChangeCreateAccountData}
            />
          </label>
          <label>
            type
            <select
              name="type"
              value={createAccount.type}
              onChange={handleChangeCreateAccountData}
            >
              <option value="asset">asset</option>
              <option value="liability">liability</option>
              <option value="equity">equity</option>
              <option value="revenue">revenue</option>
              <option value="expense">expense</option>
              <option value="gain">gain</option>
              <option value="loss">loss</option>
            </select>
          </label>
          <label>
            basis
            <select
              name="basis"
              value={createAccount?.basis}
              onChange={handleChangeCreateAccountData}
            >
              <option value="debit">debit</option>
              <option value="credit">credit</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>

        <hr style={{ flexGrow: 1, width: '100%' }} />

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}
        >
          <Suspense fallback={<AccountsLoading />}>
            <Accounts createdAccounts={createdAccounts} />
          </Suspense>
        </div>
      </div>
      <Toaster />
    </>
  );
}

const accountsURI = 'http://localhost:3333/accounts?limit=50';

function Accounts({ createdAccounts }: { createdAccounts: Array<account> }) {
  const [res, setRes] = useState<listAccountResponse | null>(null);

  const accountListItems = res?.accounts.concat(createdAccounts).map((a) => {
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
