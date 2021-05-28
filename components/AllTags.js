import React from "react";
import { Box, Tag, HStack, VStack, Text } from "@chakra-ui/react";

export default function AllTags({ selectedTag, tags, setSelectedTag }) {
  const onTagSelect = (e) => {
    let newTag = e.target.innerHTML;
    selectedTag && selectedTag === newTag
      ? setSelectedTag(null)
      : setSelectedTag(newTag);
  };
  return (
    <Box className="noteTags">
      <Text fontSize="2xl" textAlign="center">
        Filter By Tags
      </Text>
      <VStack
        spacing={4}
        className="parent-tags-container"
        marginTop={8}
        overflowY="scroll"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "white",
            borderRadius: "24px",
          },
        }}
        height={72}
      >
        {tags.map((tag) => (
          <Tag
            size="lg"
            key={tag}
            variant={tag === selectedTag ? "solid" : "outline"}
            colorScheme="red"
            cursor="pointer"
            onClick={(e) => onTagSelect(e)}
          >
            {tag}
          </Tag>
        ))}
      </VStack>
    </Box>
  );
}
