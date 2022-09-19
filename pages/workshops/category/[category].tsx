import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { capitalize } from "lodash";
import React from "react";
import HeadingBar from "../../../components/HeadingBar";
import Layout from "../../../components/Layout";
import WorkshopCard from "../../../components/WorkshopCard";
import { Workshop } from "../../../shared/schemas";
import { data } from "../../../shared/data/supabase";
import { auth } from "../../../shared/auth/supabase";

export default function WorkshopCategory({
  workshops,
  category,
}: {
  workshops: Workshop[];
  category: string;
}) {
  return (
    <Layout>
      <HeadingBar>
        <Heading
          fontSize={"md"}
          color={"white"}
          fontWeight="semibold"
          pl={8}
          pb={4}
        >
          {capitalize(category)}
        </Heading>
      </HeadingBar>
      <Box p={1}>
        <SimpleGrid columns={[1, 2, 3]} spacing={3}>
          {workshops.map((w) => (
            <WorkshopCard key={w.id} workshop={w} />
          ))}
        </SimpleGrid>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const category = context.query.category;

  const user = await auth.getUserByCookie(context.req);

  if (!user) {
    return { props: {}, redirect: { destination: "/auth" } };
  }

  try {
    const workshops = await data.getWorkshopsByCategory(category)
    return { props: { workshops, category } };
  } catch (error) {
    return { props: {}, redirect: { destination: "/workshops" } };
  }
}
