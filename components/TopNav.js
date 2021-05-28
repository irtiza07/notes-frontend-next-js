import React from "react";
import { Button, HStack, Text, Flex, Spacer, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function TopNav({ showCta }) {
  const router = useRouter();

  return (
    <Flex padding={8} mb={12}>
      <HStack spacing={8} cursor="pointer" onClick={() => router.push("/")}>
        <Image
          src="https://irtizahighlights.s3.us-east-2.amazonaws.com/aviva_logo_v1.png"
          alt="Aviva"
          width={28}
          height={28}
        />
        {/* <Heading>Aviva</Heading> */}
      </HStack>
      <Spacer></Spacer>
      <HStack spacing={12}>
        <Text
          fontSize={22}
          onClick={() => router.push("/help")}
          cursor="pointer"
        >
          Help
        </Text>
        {showCta && (
          <Button
            colorScheme="red"
            variant="outline"
            size="lg"
            fontSize={22}
            onClick={() => router.push("/signup")}
          >
            Get Started
          </Button>
        )}
      </HStack>
    </Flex>
  );
}
