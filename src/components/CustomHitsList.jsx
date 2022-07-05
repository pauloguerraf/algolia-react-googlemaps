import { useHits } from "react-instantsearch-hooks-web";
import styled from "styled-components";

function CustomHitsList(props) {
  const { hits, results, sendEvent } = useHits(props);

  return (
    <>
      <ResultCardsList>
        {hits.map((hit) => (
          <ResultCard key={hit.objectID}>
            <IconContainer></IconContainer>
            <ResultCardItems>
              <li>
                <b>{hit.name}</b>
              </li>
              <li>
                {hit.address_1}, {hit.state}, {hit.zip_code}
              </li>
            </ResultCardItems>
          </ResultCard>
        ))}
      </ResultCardsList>
    </>
  );
}

const ResultCardsList = styled.ul`
  list-style: none;
  gap 20px;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  max-height:  720px;
  overflow-y: scroll;
`;

const ResultCardItems = styled.ul`
  list-style: none;
`;

const ResultCard = styled.div`
  display: flex;
`;

const IconContainer = styled.div`
  background-color: red;
  flex-basis: 33.3%;
  flex-grow: 0;
  aspect-ratio: 1;
`;

export default CustomHitsList;
