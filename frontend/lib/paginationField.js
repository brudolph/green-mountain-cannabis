import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells apollo we will take care of everything
    read(existing = [], { args, cache }) {
      // console.log({ existing, args, cache });
      const { take, first } = args;

      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?.productsCount;
      const page = take / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(take, take + first).filter((x) => x);

      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // We don't have any items, we must go to the network to fetch them
        return false;
      }

      // If there are items, just reutrn them from the cache, and we don't need to go to the network
      if (items.length) {
        return items;
      }

      return false; // fallback to network
    },
    merge(existing, incoming, { args }) {
      const { take } = args;
      const merged = existing ? existing.slice(0) : [];
      for (let i = take; i < take + incoming.length; ++i) {
        merged[i] = incoming[i - take];
      }

      return merged;
    },
  };
}
