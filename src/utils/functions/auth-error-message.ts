export function getAuthErrorMessage(message: string) {
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes("invalid login credentials") ||
    normalizedMessage.includes("invalid credentials")
  ) {
    return "E-mail ou senha incorretos.";
  }

  if (
    normalizedMessage.includes("already registered") ||
    normalizedMessage.includes("already exists") ||
    normalizedMessage.includes("user already")
  ) {
    return "Este e-mail já está cadastrado.";
  }

  if (normalizedMessage.includes("password")) {
    return "Verifique a senha informada.";
  }

  if (normalizedMessage.includes("email")) {
    return "Verifique o e-mail informado.";
  }

  return "Não foi possível concluir a operação. Tente novamente.";
}
