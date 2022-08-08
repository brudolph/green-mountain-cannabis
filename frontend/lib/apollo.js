import { ApolloClient, InMemoryCache } from '@apollo/client';
import find from 'lodash/find';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        reviews: {
          merge(existing = [], incoming, { readField }) {
            const notAlreadyInCache = (review) =>
              !find(
                existing,
                (existingReview) =>
                  readField('id', existingReview) === readField('id', review)
              );

            const newReviews = incoming.filter(notAlreadyInCache);

            return [...existing, ...newReviews];
          },
          keyArgs: false,
          read(
            reviewRefs,
            { args: { orderBy, minStars, minSentences }, readField }
          ) {
            if (!reviewRefs) {
              return reviewRefs;
            }

            const filtered = reviewRefs.filter((reviewRef) => {
              const stars = readField('stars', reviewRef);
              const text = readField('text', reviewRef);
              return stars >= minStars && countSentences(text) >= minSentences;
            });

            filtered.sort((reviewRefA, reviewRefB) => {
              const createdAtA = readField('createdAt', reviewRefA);
              const createdAtB = readField('createdAt', reviewRefB);

              if (orderBy === 'createdAt_DESC') {
                return createdAtB - createdAtA;
              }
              return createdAtA - createdAtB;
            });

            return filtered;
          },
        },
      },
    },
  },
});

export const apollo = new ApolloClient({ link, cache });
