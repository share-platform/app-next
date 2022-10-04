import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

import { v4 as uuidv4 } from "uuid";

interface IProps {
  onSubmit(slot: any): void;
}

/**
 * Renders the form for adding a slot to a new workshop
 */
export default function WorkshopSlotForm({ onSubmit }: IProps): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<any>();

  const toast = useToast();

  /**
   * Handles creation of a slot for a new workshop
   * @param newSlot - the new slot data
   */
  const submitForm = (newSlot: any) => {
    reset();
    onSubmit({ ...newSlot, id: uuidv4() });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.date} mr={1}>
          <FormLabel htmlFor="date" fontSize={{ base: "xs", sm: "sm" }}>
            Date
          </FormLabel>
          <Input
            id="date"
            placeholder="Date"
            type="date"
            defaultValue={"2022-09-29"}
            {...register("date", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.date && errors.date.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.capacity}>
          <FormLabel htmlFor="capacity" fontSize={{ base: "xs", sm: "sm" }}>
            Capacity
          </FormLabel>
          <Input
            id="capacity"
            placeholder="Capacity"
            type="number"
            defaultValue={3}
            {...register("capacity", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>
            {errors.capacity && errors.capacity.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.startTime} mr={1}>
          <FormLabel htmlFor="startTime" fontSize={{ base: "xs", sm: "sm" }}>
            Start Time
          </FormLabel>
          <Input
            id="startTime"
            placeholder="Start Time"
            type="time"
            defaultValue={"17:00"}
            {...register("startTime", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.startTime && errors.startTime.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.endTime}>
          <FormLabel htmlFor="endTime" fontSize={{ base: "xs", sm: "sm" }}>
            End Time
          </FormLabel>
          <Input
            id="endTime"
            placeholder="End Time"
            type="time"
            defaultValue={"18:00"}
            {...register("endTime", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.endTime && errors.endTime.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          colorScheme={"green"}
          variant="outline"
          type="submit"
          isLoading={isSubmitting}
        >
          Add slot
        </Button>
      </Stack>
    </form>
  );
}
