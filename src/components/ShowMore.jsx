import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Box,
  Image,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
function ShowMore({ ismodlevisible, setismodelvisible }) {
  //const { isOpen, onOpen, onClose } = useDisclosure()
  const { state, dispatch } = useContext(AuthContext);
  const onClose = () => {
    setismodelvisible(!ismodlevisible);
    dispatch({ type: "removed" });
  };
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={ismodlevisible} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Products Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              display="flex"
              flexDirection="column"
              mt="2"
              alignItems="center"
              key={state.data1?.id}
            >
              <Image
                boxSize="200px"
                borderRadius="5px"
                src={state.data1?.img}
              />
              <Text>{state.data1?.product}</Text>
              <Text>{state.data1?.brand}</Text>
              <Text>{state.data1?.price}</Text>
              <br />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default ShowMore;
