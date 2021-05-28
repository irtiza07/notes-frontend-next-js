import React from "react";
import { Box, Button, Center, HStack, Text } from "@chakra-ui/react";
import TopNav from "../components/TopNav";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaRegNewspaper,
} from "react-icons/fa";

export default function Help() {
  return (
    <Box
      bg="#212529"
      color="white"
      minHeight={1600}
      paddingLeft={24}
      paddingRight={24}
      paddingBottom={24}
    >
      <TopNav showCta={true}></TopNav>
      <Center marginTop={48}>
        <Text fontSize={32}>
          If you have any questions, bug report or feature request, please email
          me at:
        </Text>
      </Center>
      <Center marginTop={28}>
        <Text fontSize={32}>irtizahafiz9@gmail.com</Text>
      </Center>
      <Center marginTop={32}>
        <Text fontSize={32}>Or, you can also reach me at my socials below</Text>
      </Center>
      <Center mt={28}>
        <HStack>
          <Button
            colorScheme="facebook"
            leftIcon={<FaFacebook />}
            onClick={() =>
              window.open("https://www.facebook.com/irtiza.hafiz.77/")
            }
          >
            Facebook
          </Button>
          <Button
            colorScheme="linkedin"
            leftIcon={<FaLinkedin />}
            onClick={() =>
              window.open("https://www.linkedin.com/in/irtiza-hafiz/")
            }
          >
            Linkedin
          </Button>
          <Button
            colorScheme="red"
            leftIcon={<FaYoutube />}
            onClick={() =>
              window.open(
                "https://www.youtube.com/channel/UCDankIVMXJEkhtjv5yLSN4g"
              )
            }
          >
            YouTube
          </Button>
          <Button
            colorScheme="purple"
            leftIcon={<FaInstagram />}
            onClick={() =>
              window.open("https://www.instagram.com/irtiza.hafiz/")
            }
          >
            Instagram
          </Button>
          <Button
            colorScheme="orange"
            leftIcon={<FaRegNewspaper />}
            onClick={() => window.open("https://irtizahafiz.com")}
          >
            Personal Website
          </Button>
        </HStack>
      </Center>
    </Box>
  );
}
