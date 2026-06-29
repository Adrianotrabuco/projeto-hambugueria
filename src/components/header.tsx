import { Alert, Image, View, Text, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

import colors from "tailwindcss/colors";

import { Link } from "expo-router";
import { supabase } from "@/lib/supabase";

type HeaderProps = {
  title: string;
  cartQuantityItem?: number;
};

export function Header({ title, cartQuantityItem }: HeaderProps) {
  function handleLogout() {
    Alert.alert("Sair", "Deseja sair da sua conta?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sair",
        onPress: () => supabase.auth.signOut(),
      },
    ]);
  }

  return (
    <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
      <View className="flex-1">
        <Image source={require("@/assets/logo.png")} className="h-6 w-32" />
        <Text className="text-white text-xl font-heading mt-2">{title}</Text>
      </View>

      <View className="flex-row items-center gap-5">
        {(cartQuantityItem ?? 0) > 0 && (
          <Link href={"/cart"} asChild>
            <TouchableOpacity className="relative">
              <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center top-2 z-10 -right-3.5">
                <Text className="text-slate-900 font-bold text-xs">
                  {cartQuantityItem}
                </Text>
              </View>
              <Feather name="shopping-bag" color={colors.white} size={24} />
            </TouchableOpacity>
          </Link>
        )}

        <TouchableOpacity onPress={handleLogout} activeOpacity={0.7}>
          <Feather name="log-out" color={colors.white} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
