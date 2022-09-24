import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

function ProductDetails() {
  const [data, setdata] = useState([]);
  const param = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function getdata() {
      let res = await fetch(
        `http://localhost:8080/${param.category}/${param.id}`
      );
      let data = await res.json();
      setdata(data);
    }
    getdata();
  }, [param.id]);
  console.log(data);
  console.log(param.id);
  console.log(param.category);
  const handleclick = (item) => {
    axios.post(`http://localhost:8080/cart`, {
      data: {
        item,
      },
    });
    navigate("/cart");
  };
  return (
    <>
      <SimpleGrid columns={[1, 2, 3]} spacing="40px">
        <Box
          display="flex"
          flexDirection="column"
          mt="2"
          alignItems="center"
          key={data?.id}
        >
          <Image boxSize="200px" src={data?.img} />
          <Text>{data?.product}</Text>
          <Text>{data?.brand}</Text>
          <Text>{data?.price}</Text>
          <br />
          <Button
            onClick={() => handleclick(data)}
            variant={["sm", "base", "md"]}
          >
            Buy Now
          </Button>
        </Box>
      </SimpleGrid>
    </>
  );
}
export default ProductDetails;
