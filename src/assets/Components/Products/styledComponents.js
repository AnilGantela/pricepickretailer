import styled from "styled-components";

export const CategoryContainer = styled.div``;

export const CategoryContainerTitle = styled.p`
  margin-left: 10px;
  font-size: 16px;
  font-weight: 800;
  margin-botttom: 5px;
  color: white;
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
  border: 4px solid #0000c5;

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
  border: 5px solid #0000c5;

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

export const PopupContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;
export const CloseButton = styled.button`
  position: absolute;
  top: -25px;
  right: -10px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #5f5fd4;
  z-index: 1;
  font-size: 30px;
  &:hover {
    background-color: transparent;
    color: red;
    transform: translateY(-2px); /* Lift effect */
  }
`;

export const ProductList = styled.ul`
  height: 90%;
  margin-top: 10px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::-webkit-scrollbar {
    display: none;
  }

  & {
    scrollbar-width: none;
  }
`;

export const ProductListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 3px 16px;
  margin-top: 10px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Soft shadow */
  transition: transform 0.2s, box-shadow 0.2s;

  width: 99%;
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    background-color: #5f5fd4;
    h1 {
      color: white;
    }
    p {
      color: white;
    }
  }

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 8px;
  }

  h1 {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    flex: 1;
  }

  p {
    font-size: 14px;
    font-weight: 600;
    color: #ff4d4d;
  }
`;
