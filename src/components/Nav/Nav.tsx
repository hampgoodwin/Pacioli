import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav({
  accountsToggled,
  setAccountsToggled
}: {
  accountsToggled: boolean;
  setAccountsToggled: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <nav style={{ display: 'flex' }}>
      <ul
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'flex-start',
          listStyle: 'none'
        }}
      >
        <li>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <NavLink to="/accounts">
              <h3>accounts</h3>
            </NavLink>
            {accountsToggled ? (
              <FontAwesomeIcon
                icon={faChevronUp}
                onClick={() => {
                  setAccountsToggled(false);
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faChevronDown}
                onClick={() => {
                  setAccountsToggled(true);
                }}
              />
            )}
          </div>
          {accountsToggled && (
            <>
              <NavLink to="/accounts/create">create</NavLink>
              <h4>
                <NavLink to="/accounts/chart">chart</NavLink>
              </h4>
            </>
          )}
        </li>
        <li>
          <h3>reports</h3>
        </li>
      </ul>
    </nav>
  );
}
