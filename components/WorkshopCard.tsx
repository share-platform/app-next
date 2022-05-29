import { ViewIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Img, Tag, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Workshop } from "../shared/schemas";

export default function WorkshopCard({ workshop }: { workshop: Workshop }) {
  const router = useRouter();

  return (
    <Box cursor={"pointer"}>
      <Img src="https://www.namecoinnews.com/wp-content/uploads/2021/03/Basic-Forex-Trading-Styles.jpg" />
      <Box borderTopWidth={1} borderTopColor={"gray.100"} p={4} bg="white">
        <Box mb={4}>
          <Heading color={"gray.700"} size={"sm"} fontWeight="semibold" py={2}>
            {workshop.name}
          </Heading>
          <Text color={"gray.500"} fontSize="medium">
            {workshop.description}
          </Text>

          <Box mt={3}>
            <Tag mr={1}>{workshop.category}</Tag>
            {workshop.virtual ? <Tag>virtual</Tag> : null}
          </Box>
        </Box>

        <Button
          color={"gray.600"}
          leftIcon={<ViewIcon />}
          variant={"outline"}
          w={"100%"}
          borderColor="gray.100"
          fontSize="medium"
          onClick={() => router.push(`/workshops/${workshop.id}`)}
        >
          View
        </Button>
      </Box>
    </Box>
  );
}