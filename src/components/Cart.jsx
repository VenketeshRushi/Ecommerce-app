import { useState } from "react";
import { useEffect } from "react";
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

function Cart() {
  const [data, setdata] = useState([]);
  const [datadeleted, setdatadeleted] = useState(false);
  useEffect(() => {
    async function fetchdata() {
      let res = await fetch(`http://localhost:8080/cart`);
      let data = await res.json();
      setdata(data);
    }
    fetchdata();
  }, [datadeleted]);
  const handledelete = async (id) => {
    let res = await fetch(`http://localhost:8080/cart/${id}`, {
      method: "DELETE",
    });
    let data = await res.json();
    setdatadeleted(!datadeleted);
  };
  console.log(data.length)
  return (
    <Container>
      <Heading>Total Products : {data.length}</Heading>

      <SimpleGrid columns={[1, 2, 3]} spacing="40px">
        {data?.map((item) => (
          <Box
            display="flex"
            flexDirection="column"
            mt="2"
            alignItems="center"
            key={item.id}
          >
            <Image boxSize="200px" src={item.img} />
            <Text>{item.product}</Text>
            <Text>{item.brand}</Text>
            <Text>{item.price}</Text>
            <br />
            <Button
              onClick={() => handledelete(item.id)}
              variant={["sm", "base", "md"]}
            >
              Delete
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
export default Cart;
