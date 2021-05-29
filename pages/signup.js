import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useState, useContext } from "react";
import { useRouter } from "next/router";

import TopNav from "../components/TopNav";

import fire from "../utils/fire";
import { UserContext } from "../utils/state";

export default function SignUp() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { userId, changeUserId } = useContext(UserContext);
  const router = useRouter();
  console.log("Sign up page");
  console.log(userId);

  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("Auth changed. New state has a user");
      changeUserId(user.uid);
      router.push("/dashboard");
    } else {
      console.log("Auth changed. New state does not have a user");
      changeUserId(null);
    }
  });

  const onSignUp = () => {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("Sign up successful");
        console.log(`Assigned user_id for new user ${userCredential.user.uid}`);
        fetch(
          `https://aziiqfussc.execute-api.us-east-1.amazonaws.com/dev/users`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              userId: userCredential.user.uid,
            }),
          }
        );
      })
      .catch((error) => {
        console.log(error.code);
      });
  };
  return (
    <Box
      bg="#212529"
      minHeight={1600}
      color="white"
      paddingLeft={24}
      paddingRight={24}
    >
      <TopNav></TopNav>
      <Center paddingTop={100}>
        <Heading>Welcome to NoteBytes</Heading>
      </Center>
      <Center paddingTop={8}>
        <Text fontSize="2xl" align="center">
          Quickly get set up to create and share awesome podcasts!
        </Text>
      </Center>
      <Center paddingTop={148}>
        <VStack spacing={8} width={500}>
          <Input
            placeholder="Email"
            focusBorderColor="red.500"
            type="email"
            size="lg"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            focusBorderColor="red.500"
            type="password"
            size="lg"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            colorScheme="red"
            variant="solid"
            size="lg"
            onClick={onSignUp}
          >
            Sign Up
          </Button>
        </VStack>
      </Center>
    </Box>
  );
}
