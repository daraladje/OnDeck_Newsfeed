import styled from 'styled-components';

const Card = styled.div`
  padding: 1.5rem;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  animation: appear ease 1s;
  -webkit-animation: appear ease 1s;
  -moz-animation: appear ease 1s;
  -o-animation: appear ease 1s;
  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @-moz-keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-o-keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default Card;
