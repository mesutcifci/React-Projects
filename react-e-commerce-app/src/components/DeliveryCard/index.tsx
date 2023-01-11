import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

interface ICardData {
  id: string;
  price: string;
  description: string;
  iconName: string;
}

interface IProps {
  cardData: ICardData;
  icon: JSX.Element;
}

const DeliveryCard = ({ cardData, icon }: IProps) => {
  return (
    <Card sx={{ width: "143px", height: "188px" }}>
      <CardContent>
        {icon}
        <Typography sx={{ mb: 1.5 }}>{`$${cardData.price}`}</Typography>
        <Typography variant="body2">{cardData.description}</Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};

export default DeliveryCard;
