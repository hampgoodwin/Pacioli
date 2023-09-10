import { useState } from 'react';
import {
  createAccount,
  createAccountRequest,
  createAccountResponse,
  emptyDefaultCreateAccount
} from '../type';
import toast from 'react-hot-toast';

const accountsURI = 'http://localhost:3333/accounts';

export default function Create() {
  const [createAccount, setCreateAccount] = useState<createAccount>(
    emptyDefaultCreateAccount
  );

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

        setCreateAccount(emptyDefaultCreateAccount);
        toast.success(`account ${data.account.name} created`);
      });
  }

  return (
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
  );
}
