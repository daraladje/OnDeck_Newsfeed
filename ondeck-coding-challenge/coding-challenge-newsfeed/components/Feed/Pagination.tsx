import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { perPage } from '../../config';

export const PAGINATION_QUERY = gql`
  query count($filter: String!) {
    count(filter: $filter)
  }
`;

export default function Pagination({ fellowship, page, setPage }) {
  /**
   * Get total count of events to display in the pagination component.
   * This may not even be useful information to have, so we could remove this if necessary
   */
  const { error, loading, data } = useQuery(PAGINATION_QUERY, {
    variables: {
      filter: fellowship,
    },
  });

  if (!data || error || loading) return null;
  const { count } = data;
  const pageCount = Math.ceil(count / perPage);
  return (
    <PaginationStyles>
      {page > 1 && <a onClick={() => setPage(page - 1)}>← Prev</a>}
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Events Total</p>
      {page < pageCount && <a onClick={() => setPage(page + 1)}>Next →</a>}
    </PaginationStyles>
  );
}

const PaginationStyles = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 1rem 0 0 0;
  border: 1px solid var(--lightGrey);
  border-radius: 10px;
  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid var(--lightGrey);
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }

  a {
    cursor: pointer;
  }
`;
