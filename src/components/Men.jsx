import {
    Box,
    Button,
    Center,
    Container,
    Heading,
    Image,
    SimpleGrid,
    Text,
    useDisclosure,
  } from "@chakra-ui/react";
  import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
  } from "@chakra-ui/react";
  import axios from "axios";
  import { useContext, useEffect, useRef } from "react";
  import { useState } from "react";
  import { NavLink } from "react-router-dom";
  import { AuthContext } from "./AuthContext";
  import React from "react";
  import ShowMore from "./ShowMore";
  
  
  function Men() {
    const [data, setdata] = useState([]);
    const { state,dispatch } = useContext(AuthContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [showMore, setShowMore] = useState(false);
    useEffect(() => {
      getdata();
    }, []);
    function getdata() {
      axios("http://localhost:8080/Men")
        .then((res) => setdata(res.data))
        .catch((err) => console.log(err));
    }
    console.log(state.isAuth);
    const handleshow=(item)=>{
      setShowMore(!showMore)
      dispatch({type:"added",payload:item})
    }
    return (
      <>
        <Container maxWidth={"1200px"}>
          <Heading>Men</Heading>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing="40px">
            {data?.map((item) => (
              <Box 
                display="flex"
                flexDirection="column"
                mt="2"
                alignItems="center"
                key={item.id}
              >
                <Image borderRadius={"10px"} boxSize="200px" src={item.img} />
                <Text>{item.product}</Text>
                <Text>{item.brand}</Text>
                <Text>{item.price}</Text>
                <br />
  
                {state.isAuth === false ? (
                  <Button colorScheme="red" onClick={onOpen}>
                    Quick View
                  </Button>
                ) : (
                  <NavLink to={`/Men/${item.id}`}>
                    <Button colorScheme="blue">Quick View</Button>
                  </NavLink>
                )}
                <>
                  <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          Quick View
                        </AlertDialogHeader>
  
                        <AlertDialogBody>You Have To Login First</AlertDialogBody>
  
                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                </>
  
                <br></br>
                <Button
                  onClick={(() => handleshow(item))}
                  variant={["sm", "base", "md"]}
                >
                  Show More
                </Button>
                {showMore && (
                  <ShowMore
                    item={item}
                    ismodlevisible={showMore}
                    setismodelvisible={setShowMore}
                  />
                )}
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </>
    );
  }
  export default Men;