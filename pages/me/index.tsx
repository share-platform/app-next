import { Box } from "@chakra-ui/react";
import { User } from "@supabase/supabase-js";
import React from "react";
import Account from "../../components/Account";
import Layout from "../../components/Layout";
import { supabase } from "../../utils/supabaseClient";

export default function Me({ user }: { user: User }) {
  return (
    <Layout>
      <Box>{user ? <Account user={user} /> : null}</Box>
    </Layout>
  );
}

export async function getServerSideProps({ req }: any) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/auth" } };
  }

  return {
    props: { user },
  };
}