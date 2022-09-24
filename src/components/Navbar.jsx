import { Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const userlogin = ({ email, password }) => {
  return axios({
    url: "https://reqres.in/api/login",
    method: "POST",
    data: {
      email,
      password,
    },
  });
};

function Navbar() {
  const [email, setemail] = useState("eve.holt@reqres.in");
  const [password, setpassword] = useState("cityslicka");
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSmallerThan700] = useMediaQuery("(max-width: 750px)");

  const handleform = (e) => {
    e.preventDefault();
    userlogin({ email, password }).then((res) => {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          token: res.data.token,
        },
      });
      navigate("/");
    });
  };

  const logedout = () => {
    userlogin({ email, password }).then((res) => {
      dispatch({
        type: "LOGOUT_SUCCESS",
        payload: {
          token: null,
        },
      });
    });
    navigate("/");
  };
  console.log(state);
  return (
    <>
      <Drawer
        placement={"right"}
        onClose={state.onClosemobilenav}
        isOpen={state.openmobile}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent textAlign={"center"} background={"#151418"}>
          <DrawerHeader
            bg="#151418"
            color="white"
            fontSize={"32px"}
            m="0px"
            borderBottomWidth="1px"
          >
            Venketesh Rushi
          </DrawerHeader>
          <DrawerBody
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            mb="35px"
          >
            <Stack direction={"column"} spacing={"18px"} alignItems={"center"}>
              <Box onClick={() => dispatch({ type: "onClosemobilenav" })}>
                <Text color={"white"} fontWeight={"bold"} fontSize={30}>
                  <Link to="/">Home</Link>
                </Text>
              </Box>
              <Box onClick={() => dispatch({ type: "onClosemobilenav" })}>
                <Text color={"white"} fontWeight={"bold"} fontSize={30}>
                  <Link to="/men">Men</Link>
                </Text>
              </Box>
              <Box onClick={() => dispatch({ type: "onClosemobilenav" })}>
                <Text color={"white"} fontWeight={"bold"} fontSize={30}>
                  <Link to="/women">Women</Link>
                </Text>
              </Box>
              <Box onClick={() => dispatch({ type: "onClosemobilenav" })}>
                <Text color={"white"} fontWeight={"bold"} fontSize={30}>
                  <Link to="/kids">Kids</Link>
                </Text>
              </Box>
              <Box onClick={() => dispatch({ type: "onClosemobilenav" })}>
                <Text color={"white"} fontWeight={"bold"} fontSize={30}>
                  <Link to="/cart">Cart</Link>
                </Text>
              </Box>
            </Stack>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button
              bg="rgb(108,99,255)"
              color="white"
              variant="outline"
              mr={3}
              onClick={() => dispatch({ type: "onClosemobilenav" })}
              size="lg"
              _hover={{
                background: "transparent",
                color: "white",
              }}
            >
              close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {isSmallerThan700 ? (
        <Stack
          direction={"row"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Button
            backgroundColor="rgb(255,0,0)"
            bg="transparent"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"start"}
            ml={"5"}
            size={"md"}
            onClick={() => dispatch({ type: "openmobilenav" })}
          >
            <HamburgerIcon color={"white"} w={7} h={7} />
          </Button>
          <>
            {!state.isAuth ? (
              <div>
                {" "}
                <Button
                  backgroundColor="rgb(255,0,0)"
                  bg="transparent"
                  mr={"5"}
                  color="white"
                  onClick={onOpen}
                >
                  Login
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>
                      <Heading>Log In</Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Box>
                        <Stack direction="column" gap="0.5rem">
                          <Box>
                            <Input
                              type="email"
                              placeholder="email"
                              name="email"
                              onChange={(e) => setemail(e.target.value)}
                            />
                          </Box>
                          <Box>
                            <Input
                              type="password"
                              placeholder="password"
                              name="password"
                              onChange={(e) => setpassword(e.target.value)}
                            />
                          </Box>
                        </Stack>
                      </Box>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        _hover={{ backgroundColor: "rgb(86,163,35)" }}
                        backgroundColor="rgb(86,163,35)"
                        color={"white"}
                        onClick={handleform}
                      >
                        Submit
                      </Button>
                      <Button
                        backgroundColor="rgb(255,0,0)"
                        _hover={{ backgroundColor: "rgb(255,0,0)" }}
                        color={"white"}
                        mr={3}
                        ml={"5"}
                        onClick={onClose}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            ) : (
              <Button
                _hover={{ backgroundColor: "rgb(255,0,0)" }}
                backgroundColor="rgb(86,163,35)"
                color={"white"}
                mr={"25px"}
                onClick={logedout}
              >
                LogOut
              </Button>
            )}
          </>
        </Stack>
      ) : (
        <Container
          maxWidth={"100%"}
          bg="red"
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
          textColor="white"
          fontWeight={"bold"}
        >
          <Link to="/">Home</Link>
          <Link to="/men">Men</Link>
          <Link to="/women">Women</Link>
          <Link to="/kids">Kids</Link>
          <Link to="/cart">Cart</Link>
          <>
            {!state.isAuth ? (
              <div>
                {" "}
                <Button
                  backgroundColor="rgb(255,0,0)"
                  bg="transparent"
                  onClick={onOpen}
                  _hover={{ backgroundColor: "rgb(86,163,35)" }}
                >
                  Login
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>
                      <Heading>Log In</Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Box>
                        <Stack direction="column" gap="0.5rem">
                          <Box>
                            <Input
                              type="email"
                              placeholder="email"
                              name="email"
                              onChange={(e) => setemail(e.target.value)}
                            />
                          </Box>
                          <Box>
                            <Input
                              type="password"
                              placeholder="password"
                              name="password"
                              onChange={(e) => setpassword(e.target.value)}
                            />
                          </Box>
                        </Stack>
                      </Box>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        _hover={{ backgroundColor: "rgb(86,163,35)" }}
                        backgroundColor="rgb(255,0,0)"
                        color={"white"}
                        onClick={handleform}
                      >
                        Submit
                      </Button>
                      <Button
                        colorScheme="blue"
                        mr={3}
                        ml={"5"}
                        onClick={onClose}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            ) : (
              <Button
                _hover={{ backgroundColor: "rgb(255,0,0)" }}
                backgroundColor="rgb(86,163,35)"
                color={"white"}
                onClick={logedout}
              >
                LogOut
              </Button>
            )}
          </>
        </Container>
      )}
    </>
  );
}
export default Navbar;
