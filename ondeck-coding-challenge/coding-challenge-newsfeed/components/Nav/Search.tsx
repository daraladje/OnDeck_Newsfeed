import { gql, useLazyQuery } from '@apollo/client';
import { debounce } from '@material-ui/core';
import { resetIdCounter, useCombobox } from 'downshift';
import { getFellowshipPhoto } from '../../lib/announcementPhoto';
import { useRouter } from 'next/router';

const SEARCH_EVENTS_QUERY = gql`
  query SEARCH_EVENTS_QUERY($searchTerm: String!) {
    searchTerms: search(where: $searchTerm) {
      id
      ... on User {
        name
        bio
        avatar_url
      }
      ... on Project {
        name
        description
        icon_url
      }
      ... on Announcement {
        title
        body
        fellowship
      }
    }
  }
`;

export default function Search() {
  const router = useRouter();
  // Search bar to allow user to go to pages of fellows, projects, or announcements
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_EVENTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const items = data?.searchTerms || [];
  // Ping search every 350ms
  const spreadOutSearch = debounce(findItems, 350);
  resetIdCounter();
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items: items,
    onInputValueChange({ inputValue }) {
      spreadOutSearch({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/${selectedItem.__typename.toLowerCase()}s/${
          selectedItem.id
        }`,
      });
    },
    itemToString: (item) => item?.name || item?.title || '',
  });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'Search',
            placeholder: 'Search all Entities...',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <a
              href={`/${item.__typename.toLowerCase()}s/${item.id}`}
              className="link-none"
            >
              <DropDownItem
                key={item.__typename + item.id}
                {...getItemProps({ item })}
                highlighted={index === highlightedIndex}
              >
                <img
                  src={
                    item.avatar_url ||
                    item.icon_url ||
                    getFellowshipPhoto(item.fellowship)
                  }
                  width="50"
                  alt=""
                />

                {item.name || item.title}
              </DropDownItem>
            </a>
          ))}
        {isOpen && !items.length && !loading && inputValue.length > 0 && (
          <DropDownItem>
            No entities found for search term: {inputValue}
          </DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}

import styled, { keyframes } from 'styled-components';

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 1px solid var(--lightGray);

  .link-none {
    text-decoration: none;
    color: inherit;
  }
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid var(--lightGray);
  background: ${(props) => (props.highlighted ? '#f7f7f7' : 'white')};
  padding: 1rem;
  transition: all 0.2s;
  ${(props) => (props.highlighted ? 'padding-left: 2rem;' : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid
    ${(props) => (props.highlighted ? props.theme.lightgrey : 'white')};
  img {
    margin-right: 10px;
  }
  cursor: pointer;
  &:hover {
    padding-left: 2rem;
    border-left: 10px solid ${(props) => props.theme.lightgrey};
    background: '#f7f7f7';
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px #305cea;
  }

  to {
    box-shadow: 0 0 10px 1px #305cea;
  }
`;

const SearchStyles = styled.div`
  position: relative;
  margin-left: auto;
  padding-top: 5px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  input {
    width: 400px;
    padding: 10px;
    border: none;
    font-size: 1.5rem;
    font-family: 'Nunito Sans', sans-serif;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

export { DropDown, DropDownItem, SearchStyles };
