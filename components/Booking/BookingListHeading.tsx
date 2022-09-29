import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { BookingDetails } from "../../shared/schemas";

interface IProps {
  bookings: BookingDetails[];
}

export default function BookingListHeading({ bookings }: IProps) {
  return (
    <Box borderLeftWidth={"thick"} borderLeftColor="green.500" px="7" py="7">
      <Heading pb="1" size={"md"} color={"gray.700"}>
        Upcoming {`(${bookings.length})`}
      </Heading>
      <Text fontSize={"sm"} color="gray.500">
        Workshops you are going to soon
      </Text>
    </Box>
  );
}
