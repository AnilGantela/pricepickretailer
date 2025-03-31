import styled from "styled-components";

// Styled components for the cards
const TabContentContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  border: 1px solid #ccc;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  text-align: center;
  background-color: #f4f4f4;
  padding: 10px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const PlusSymbol = styled.div`
  font-size: 40px;
  font-weight: bold;
  transform: translateX(-50%);
`;

const CardText = styled.p`
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: #333;
`;

const CardDetails = styled.div`
  font-size: 14px;
  color: #555;
  text-align: center;
  margin-top: 15px;
  width: 100%;
`;

const PriceAndDate = styled.div`
  font-size: 14px;
  color: #333;
  margin-top: 10px;
`;

const PriceOption = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 14px;
`;

const CampaignCards = () => {
  return (
    <TabContentContainer>
      {/* Retailer Campaign Card */}
      <Card>
        <PlusSymbol>+</PlusSymbol>
        <CardText>Retailer Campaign</CardText>
        <CardDetails>
          <p>
            Target promotions for specific retailers, offering exclusive deals
            to attract more customers and drive foot traffic to physical or
            online stores.
          </p>
          <PriceOption>
            <p>Weekly: ₹299</p>
            <p>Monthly: ₹999</p>
            <p>Yearly: ₹9999</p>
          </PriceOption>
        </CardDetails>
      </Card>

      {/* Product Campaign Card */}
      <Card>
        <PlusSymbol>+</PlusSymbol>
        <CardText>Product Campaign</CardText>
        <CardDetails>
          <p>
            Focus on individual products with targeted promotions. Ideal for
            product launches, limited-time discounts, or special offers to boost
            sales.
          </p>
          <PriceOption>
            <p>Weekly: ₹249</p>
            <p>Monthly: ₹799</p>
            <p>Yearly: ₹8499</p>
          </PriceOption>
        </CardDetails>
      </Card>

      {/* Brand Campaign Card */}
      <Card>
        <PlusSymbol>+</PlusSymbol>
        <CardText>Brand Campaign</CardText>
        <CardDetails>
          <p>
            Enhance your brand recognition with a campaign aimed at building
            customer loyalty, improving brand identity, and generating trust.
          </p>
          <PriceOption>
            <p>Weekly: ₹499</p>
            <p>Monthly: ₹1499</p>
            <p>Yearly: ₹16999</p>
          </PriceOption>
        </CardDetails>
      </Card>

      {/* Seasonal Campaign Card */}
      <Card>
        <PlusSymbol>+</PlusSymbol>
        <CardText>Seasonal Campaign</CardText>
        <CardDetails>
          <p>
            Perfect for time-sensitive offers during peak seasons like holidays,
            festivals, or special events. Take advantage of market trends and
            boost sales with exciting deals.
          </p>
          <PriceAndDate>
            <p>Price: ₹1299</p>
            <p>Start Date: 01/06/2025</p>
            <p>Expiry Date: 31/12/2025</p>
          </PriceAndDate>
        </CardDetails>
      </Card>
    </TabContentContainer>
  );
};

export default CampaignCards;
