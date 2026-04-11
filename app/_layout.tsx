// Atualizando o layout pra envolver o app com os providers e proteger as rotas

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../src/contexts/AuthContext";
import { ThemeProvider } from "../src/contexts/ThemeContext";

const queryClient = new QueryClient();

function ProtectedRoutes() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthScreen = segments[0] === "login" || segments[0] === undefined;

    if (!user && !inAuthScreen) {
      router.replace("/login");
    } else if (user && inAuthScreen && segments[0] === "login") {
      router.replace("/dashboard");
    }
  }, [user, loading, segments]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <ActivityIndicator size="large" color="#F23064" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <ProtectedRoutes />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
