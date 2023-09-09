import { account } from './type';

import './Account.css';

function Account({ account }: { account: account }) {
  return (
    <div
      id={account.id}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: '1.5em',
        padding: '.5em',
        border: '3px solid black',
        backgroundColor: 'gray'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <div>{account.name}</div>
        <div>
          <div className="basis">{account.basis}</div>
          <div className="type">{account.type}</div>
        </div>
      </div>
      <div>
        <div>{account.createdAt}</div>
      </div>
    </div>
  );
}

export default Account;
