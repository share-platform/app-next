import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
import * as React from "react";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { OAuthButtonGroup } from "./0AuthButtonGroup";
import { Logo } from "./Logo";
import { useRouter } from "next/router";
import { auth } from "../shared/auth/supabase";
import { data } from "../shared/data/supabase";

enum Mode {
  LOGIN,
  SIGNUP,
}

export default function AuthenticationForm() {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const [mode, setMode] = React.useState<Mode>(Mode.LOGIN);
  const toast = useToast();

  const logIn = async (formData: any) => {
    try {
      const success = await auth.signIn(formData.email, formData.password);

      if (success) {
        showToast("Login Successful");
        router.push("/workshops");
      }
    } catch (error: any) {
      showToast("Login Unsuccessful", error.message, false);
    }
  };

  const signUp = async (formData: any) => {
    try {
      const user = await auth.signUp(formData.email, formData.password);

      if (user) {
        const values = {
          user_id: user.id,
          username: formData.username,
          name: formData.name,
          surname: formData.surname,
          dob: formData.dob,
        };

        await data.createProfile(values)
      }

      showToast("Sign Up Successful");
      router.push("/workshops");
    } catch (error: any) {
      showToast("Sign Up Unsuccessful", error.message, false);
    }
  };

  const showToast = (title: any, description: any = null, success: boolean = true) => {
    toast({
      title: title,
      description: description,
      status: success ? "success" : "error",
      duration: 4000,
      isClosable: true,
    })
  }

  const onSubmit = async (formData: any) => {
    setIsLoading(true);

    mode === Mode.LOGIN ? logIn(formData) : signUp(formData);

    setIsLoading(false);
  };

  const makeFormField = (id: string, type: string, title: string, placeholder: string): ReactElement => {
    return <FormControl>
      <FormLabel htmlFor={id}>{title}</FormLabel>
      <Input
        {...register(id)}
        id={id}
        type={type}
        focusBorderColor="brand.700"
        boxShadow={"sm"}
        borderRadius="xl"
        size="lg"
        isRequired={true}
        placeholder={placeholder}
      />
    </FormControl>
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "7", sm: "8" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="8">
          <Stack spacing="6">
            <Logo />
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
                {mode === Mode.LOGIN
                  ? "Log in to your account"
                  : "Create an account "}
              </Heading>
              <Heading
                size={useBreakpointValue({ base: "xs", md: "sm" })}
                color="gray.600"
              >
                OR
              </Heading>
              <HStack spacing="1" justify="center">
                <Text
                  color="muted"
                  cursor={"pointer"}
                  textDecoration={"underline"}
                  onClick={() => {
                    setMode((oldMode) => {
                      if (oldMode === Mode.LOGIN) {
                        return Mode.SIGNUP;
                      }
                      return Mode.LOGIN;
                    });
                  }}
                >
                  {mode === Mode.LOGIN ? "Sign up" : "Login"}
                </Text>
              </HStack>
            </Stack>
          </Stack>
          <Box
            py={{ base: "12", sm: "8" }}
            px={{ base: "8", sm: "10" }}
            bg={useBreakpointValue({ base: "white", sm: "white" })}
            boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
            borderRadius={{ base: "2xl", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing="3">
                { mode === Mode.SIGNUP ? makeFormField("name", "text", "Name", "Name") : null }
                { mode === Mode.SIGNUP ? makeFormField("surname", "text", "Surname", "Surname") : null }
                { mode === Mode.SIGNUP ? makeFormField("dob", "date", "Date of Birth", "01/01/2000") : null }
                { mode === Mode.SIGNUP ? makeFormField("username", "text", "Username", "luckyHelper") : null }
                { makeFormField("email", "email", "Email", "robinson@crusoe.com") }
                { makeFormField("password", "password", "Password", "stuckOnAnIsland1774") }
              </Stack>
              <Stack spacing="6">
                <Button
                  color={"white"}
                  variant="contained"
                  bg="brand.700"
                  type="submit"
                  isLoading={isLoading}
                  _hover={{ backgroundColor: "#5c56eeF0" }}
                  boxShadow="lg"
                >
                  {mode === Mode.LOGIN ? "Sign in" : "Sign up"}
                </Button>
                <HStack>
                  <Divider />
                  <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
                <OAuthButtonGroup />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Container>
  );
}
