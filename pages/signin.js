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

import fire from "../utils/fire";
import { UserContext } from "../utils/state";
import TopNav from "../components/TopNav";

export default function SignIn() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { _, changeUserId } = useContext(UserContext);
  const router = useRouter();

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

  const onSignIn = () => {
    console.log("First sign of clicking button");
    console.log(email);
    console.log(password);
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        console.log("Sign in successful");
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        console.log("Problems when signing in");
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
        <Heading>Sign In</Heading>
      </Center>
      <Center paddingTop={8}>
        <Text fontSize="2xl" align="center">
          Sign in to Aviva to get access to all your awesome notes and
          podcasts!
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
            onClick={onSignIn}
          >
            Sign In
          </Button>
        </VStack>
      </Center>
    </Box>
  );
}
