import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
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

function Login() {
  const [email, setemail] = useState("eve.holt@reqres.in");
  const [password, setpassword] = useState("cityslicka");
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      // navigate("/")
    });
  };

  // if (state.isAuth) {
  //   // return <Navigate to="/"/>
  //   return (
  //     <div>
  //       <h3>you are already Logged In</h3>
  //       <button onClick={logedout}>Logout</button>
  //     </div>
  //   );
  // }

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Heading>Log In</Heading>
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
                <Box>
                  <Button onClick={handleform}>Submit</Button>
                </Box>
              </Stack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Login;
