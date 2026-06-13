export function gerarSenha(name, rga) {
  const dividirNome = name.trim().split(" ");
  const primeiraLetra = dividirNome[0][0];
  let sobrenome;

  if (dividirNome.length >= 2) {
    sobrenome = dividirNome[dividirNome.length - 1].toLowerCase();
  } else {
    sobrenome = "noHave";
  }

  const quartoDigito = rga[3];
  const setimoDigito = rga[6];
  const ultimoDigito = rga[11];

  return `${primeiraLetra}_${sobrenome}${quartoDigito}${setimoDigito}${ultimoDigito}`;
}
