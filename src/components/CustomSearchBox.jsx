import { useRef, useEffect } from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";
import styled from "styled-components";
import { BaseInput } from "./BaseComponents";

function CustomSearchBox(props) {
  const { placeholder } = props;
  const { query, refine, clear, isSearchStalled } = useSearchBox(props);
  const searchInput = useRef();

  const onInputChange = (event) => {
    if (event.target.value.match(/[^0-9]/g)) {
      searchInput.current.setCustomValidity("Please enter numbers only");
      searchInput.current.reportValidity();
    } else searchInput.current.setCustomValidity("");
    event.target.value = event.target.value.replace(/[^0-9]/g, "");

    if (event.target.value.length >= 3) {
      refine(event.target.value);
    } else if (event.target.value.length === 0) {
      clear();
    }
  };

  const onInputKeyDown = (event) => {
    if (event.target.value.length >= 5) {
      searchInput.current.setCustomValidity("Please enter 5 digits max");
      searchInput.current.reportValidity();
    } else searchInput.current.setCustomValidity("");
  };

  return (
    <>
      <Input
        ref={searchInput}
        type="text"
        placeholder={placeholder}
        onChange={onInputChange}
        maxLength="5"
        onKeyDown={onInputKeyDown}
      ></Input>
    </>
  );
}

const Input = styled(BaseInput)`
  width: 100%;
`;

export default CustomSearchBox;
