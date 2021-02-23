import styled from 'styled-components';
import Navbar from './Nav/Navbar';

export default function Layout({ children, setFellowship }) {
  return (
    <Container>
      <Main>
        <Navbar setFellowship={setFellowship} />
        {children}
      </Main>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fefefe;
`;

const Main = styled.div`
  padding: 1rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 600px;
`;
