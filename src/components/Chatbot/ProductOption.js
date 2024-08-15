import React from 'react';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import styled from 'styled-components';

const Button = styled.button`
  
  background-color: #A9A9A9; /* Change to a more vibrant color */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 4px 10px;
  margin: 8px;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  

  &:hover {
    background-color: #808080; /* Slightly darker shade on hover */
    transform: scale(1.05); /* Slight zoom effect */
  }

  &:focus {
    outline: none;
  }

  svg {
    margin-right:3px; /* Space between icon and text */
  }
`;

const OptionsContainer = styled.div`
  margin-left  : 80px
`;

const ProductOptions = (props) => {
    //"menu", "food", "canteen", "dining"
  const options = [
    { text: "Menu", handler: props.actionProvider.handleMenu, id: 1 },
    { text: "Order", handler: props.actionProvider.handleOrder, id: 2 },
    { text: "Status", handler: props.actionProvider.handleDelivery, id: 3 },
    { text: "Help", handler: props.actionProvider.handleSupport, id: 4 },
  ];

  const optionsMarkup = options.map((option) => (
    <Button key={option.id} onClick={option.handler}>
      <LaunchRoundedIcon />{option.text}
    </Button>
  ));

  return <OptionsContainer>{optionsMarkup}</OptionsContainer>;
};

export default ProductOptions;