import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/dist/client/router';
import { DropDown, DropDownItem, SearchStyles } from '../styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: products(
      where: {
        OR: [
          { name: { contains: $searchTerm } }
          { slug: { contains: $searchTerm } }
          { category: { name: { contains: $searchTerm } } }
        ]
      }
    ) {
      id
      name
      photos {
        image {
          publicUrl
        }
      }
    }
  }
`;
export default function Search() {
  const router = useRouter();
  const [findItems, { loading, data }] = useLazyQuery(SEARCH_PRODUCTS_QUERY, {
    fetchPolicy: 'no-cache',
  });
  const items = data?.searchTerms || [];
  const urlify = function (a) {
    return a
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  const rerouteSearch = (selectedItem) => {
    router.push({
      pathname: `/product/${urlify(selectedItem.name)}`,
    });
  };
  const findItemsButChill = debounce(findItems, 350);
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
    items,
    onInputValueChange() {
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      rerouteSearch(selectedItem);
    },
    itemToString: (item) => item?.name || '',
  });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an Item',
            id: 'search',
            className: loading ? 'loading' : null,
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              {...getItemProps({ item, index })}
              key={item.id}
              highlighted={index === highlightedIndex}
            >
              <img
                src={item.photos[0]?.image.publicUrl}
                alt={item.name}
                width="50"
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
