import styled from "styled-components";

export const CategoryContainer = styled.div``;

export const CategoryContainerTitle = styled.p`
  margin-left: 10px;
  font-size: 16px;
  font-weight: 800;
  margin-botttom: 5px;
`;

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
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  text-align: center;
  height: 45px;
  font-weight: 600;
  padding: 5px 0px;
  border-radius: 10px;
`;

export const ProductPageContainer = styled.div`
  padding: 10px;
  height: 92.5vh;
`;

export const ProductsContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  background-color: #0000c5;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  padding: 10px;
  height: 80.56vh;

  &::-webkit-scrollbar {
    display: none;
  }

  & {
    scrollbar-width: none;
  }
`;

export const Loader = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProductsLeftContainer = styled.div`
  width: 76%;
  padding: 10px;
  overflow-y: scroll;
  background-color: white;

  border-radius: 12px;
  &::-webkit-scrollbar {
    display: none;
  }

  & {
    scrollbar-width: none;
  }

  .ul {
    display: flex;
    width: 100%;
  }
`;

export const ProductsRightContainer = styled.div`
  width: 22%;
  padding: 10px;
  overflow-y: scroll;
  background-color: white;

  border-radius: 12px;
  &::-webkit-scrollbar {
    display: none;
  }

  & {
    scrollbar-width: none;
  }
`;

export const ProductSummerContainer = styled.div`
  border: 2px solid red;
  margin-top: 10px;
  position: relative;
  padding: 10px;

  legend {
    position: absolute;
    top: -12px;
    left: 10px;
    background: white;
    padding: 0 8px;
    font-weight: 600;
    background-color: ;
  }
`;
