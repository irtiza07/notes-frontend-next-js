import {
  Box,
  Button,
  Container,
  Center,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import Link from "next/link";

import NewsFeed from "../components/NewsFeed";
import TopNav from "../components/TopNav";

export default function Home() {
  return (
    <Box
      bg="#212529"
      color="white"
      minHeight={1600}
      paddingLeft={24}
      paddingRight={24}
      paddingBottom={24}
    >
      <Box>
        <TopNav showCta={true}></TopNav>
      </Box>
      <Center paddingTop={24}>
        <Heading size="4xl">The Future of Note Taking</Heading>
      </Center>
      <Center paddingTop={12}>
        <Text fontSize="2xl" align="center">
          Create podcasts from your notes. Listen to them in your favorite
          podcast player. Share them with the world.
        </Text>
      </Center>
      <Center paddingTop={12}>
        <HStack spacing="24px">
          <Link href="/signup">
            <Button colorScheme="red" variant="solid" size="lg">
              Sign Up
            </Button>
          </Link>
          <Link href="/signin">
            <Button colorScheme="red" variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
        </HStack>
      </Center>
      <Center marginTop="220px">
        <Stack direction={["column", "row"]} spacing="60px">
          <VStack spacing={8}>
            <WarningIcon w={8} h={8} color="red.500" />
            <Heading size="lg">Write</Heading>
            <Container>
              <Text textAlign="center" fontSize={22}>
                Write notes and group related ones together using tags
              </Text>
            </Container>
          </VStack>
          <VStack spacing={8}>
            <PhoneIcon w={8} h={8} color="red.500" />
            <Heading size="lg">Listen</Heading>
            <Container>
              <Text textAlign="center" fontSize={22}>
                We automatically turn your notes into audio using our deep
                learning model and add them to your favorite podcast player.
                Listen to them whenever you want, wherever you are
              </Text>
            </Container>
          </VStack>
          <VStack spacing={8}>
            <AddIcon w={8} h={8} color="red.500" />
            <Heading size="lg">Share</Heading>
            <Container>
              <Text textAlign="center" fontSize={22}>
                Provide value to others by sharing your knowledge with the world
              </Text>
            </Container>
          </VStack>
        </Stack>
      </Center>
      <Center marginTop={32} marginBottom={32}>
        <Heading>-- Trending Now --</Heading>
      </Center>
      <Center>
        <NewsFeed></NewsFeed>
      </Center>
    </Box>
  );
}
