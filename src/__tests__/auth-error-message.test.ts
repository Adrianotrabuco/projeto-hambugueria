import { getAuthErrorMessage } from "@/utils/functions/auth-error-message";

describe("getAuthErrorMessage", () => {
  it("deve tratar erro de senha ou e-mail incorretos", () => {
    expect(getAuthErrorMessage("Invalid login credentials")).toBe(
      "E-mail ou senha incorretos."
    );
  });

  it("deve tratar erro de e-mail ja cadastrado", () => {
    expect(getAuthErrorMessage("User already registered")).toBe(
      "Este e-mail já está cadastrado."
    );
  });

  it("deve tratar erro generico de senha", () => {
    expect(getAuthErrorMessage("Password should be at least 6 characters")).toBe(
      "Verifique a senha informada."
    );
  });

  it("deve tratar erro desconhecido", () => {
    expect(getAuthErrorMessage("Unexpected error")).toBe(
      "Não foi possível concluir a operação. Tente novamente."
    );
  });
});
