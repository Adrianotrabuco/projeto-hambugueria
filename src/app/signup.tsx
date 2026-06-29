import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

import { Button } from "@/components/button";
import { supabase } from "@/lib/supabase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignup() {
    if (!email.trim() || !password.trim() || !passwordConfirmation.trim()) {
      return Alert.alert("Atenção", "Preencha todos os campos.");
    }

    if (password.length < 6) {
      return Alert.alert("Atenção", "A senha deve ter pelo menos 6 caracteres.");
    }

    if (password !== passwordConfirmation) {
      return Alert.alert("Atenção", "As senhas não conferem.");
    }

    try {
      setIsLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        return Alert.alert("Erro ao cadastrar", error.message);
      }

      if (!data.session) {
        Alert.alert(
          "Cadastro criado",
          "Confira seu e-mail para confirmar a conta antes de entrar."
        );
      }
    } catch {
      Alert.alert("Erro ao cadastrar", "Não foi possível criar sua conta.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-slate-900 px-6 justify-center"
    >
      <Image
        source={require("@/assets/logo.png")}
        className="h-8 w-44 mb-10 self-center"
      />

      <Text className="text-white text-2xl font-heading mb-2">Cadastro</Text>
      <Text className="text-slate-400 font-body mb-8">
        Crie sua conta para acessar o cardápio.
      </Text>

      <View className="gap-4">
        <TextInput
          className="h-12 bg-slate-800 rounded-md px-4 font-body text-white"
          placeholder="E-mail"
          placeholderTextColor={colors.slate[400]}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          className="h-12 bg-slate-800 rounded-md px-4 font-body text-white"
          placeholder="Senha"
          placeholderTextColor={colors.slate[400]}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          className="h-12 bg-slate-800 rounded-md px-4 font-body text-white"
          placeholder="Confirmar senha"
          placeholderTextColor={colors.slate[400]}
          secureTextEntry
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          onSubmitEditing={handleSignup}
        />

        <Button onPress={handleSignup} disabled={isLoading}>
          <Button.Text>
            {isLoading ? "Criando conta..." : "Criar conta"}
          </Button.Text>
          <Button.Icon>
            <Feather name="user-plus" size={20} />
          </Button.Icon>
        </Button>
      </View>

      <Link href={"/login" as never} asChild>
        <TouchableOpacity className="mt-8 self-center">
          <Text className="text-lime-400 font-subtitle">Já tenho conta</Text>
        </TouchableOpacity>
      </Link>
    </KeyboardAvoidingView>
  );
}
