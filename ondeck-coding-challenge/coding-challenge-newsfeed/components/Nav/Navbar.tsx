import Search from './Search';
import styled from 'styled-components';
import Link from 'next/link';

export default function Navbar({ setFellowship, setButtonState }) {
  return (
    <NavStyle>
      <Link href="/">
        <img
          className="logo"
          src="https://assets-global.website-files.com/5fdbf0943c2eae424a7cde2c/5fdbf0943c2eae00d67ce58b_logo.svg"
          loading="lazy"
          alt="Test"
          onClick={() => {
            setFellowship && setFellowship('All');
          }}
        />
      </Link>
      <Search />
    </NavStyle>
  );
}

const NavStyle = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  .logo {
    cursor: pointer;
    height: 50px;
    width: auto;
  }
`;
