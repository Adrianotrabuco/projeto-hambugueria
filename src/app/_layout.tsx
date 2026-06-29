import { useEffect, useState } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Session } from "@supabase/supabase-js";

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import { Loading } from "@/components/loading";
import { supabase } from "@/lib/supabase";

export default function Layout() {
  const router = useRouter();
  const segments = useSegments();
  const [session, setSession] = useState<Session | null>(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsSessionLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsSessionLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isSessionLoading) {
      return;
    }

    const currentRoute = String(segments[0] ?? "");
    const isAuthRoute = currentRoute === "login" || currentRoute === "signup";

    if (!session && !isAuthRoute) {
      router.replace("/login" as never);
    }

    if (session && isAuthRoute) {
      router.replace("/" as never);
    }
  }, [isSessionLoading, router, segments, session]);

  if (!fontsLoaded || isSessionLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="bg-slate-900 flex-1">
      <Slot />
    </SafeAreaView>
  );
}
