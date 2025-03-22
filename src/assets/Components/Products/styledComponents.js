import styled from "styled-components";

export const CategoryContainer = styled.div`
  border: 2px solid red;
  padding: 3px;
  display: flex;
  font-size: 20px;
`;

export const CategoryContainerTitle = styled.p``;

export const CategoryList = styled.ul`
  flex-grow: 1;
  display: flex;
  justify-content: space-around;
`;

export const CategoryListItem = styled.li`
  margin-left: 5px;
  color: ${(props) => props.$selected};
  background-color: ${(props) => props.$selectedbg};
  border: 2px solid ${(props) => props.$selected};
  cursor: pointer;
  font-size: 20px;
  width: 20%;
`;

export const ProductPageContainer = styled.div`
  padding: 10px;
  height: 92.5vh;
`;

export const ProductsContainer = styled.div`
  width: 100%;
  border: 2px solid red;
  overflow-y: scroll;
`;
