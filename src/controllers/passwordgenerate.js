export function gerarSenha(name, rga) {
  const dividirNome = name.trim().split();
  const primeiraLetra = divirNome[0][0];
  let segundoSobrenome;

  if (dividirNome.length >= 3) {
    segundoSoobrenome = dividirNome[2].toLowerCase();
  } else {
    segundoSobrenome = "noHave";
  }

  const quartoDigito = rga[3];
  const setimoDigito = rga[6];
  const ultimoDigito = rga[11];

  return `${primeiraLetra}_${segundoSobrenome}${quartoDigito}${setimoDigito}${ultimoDigito}`;
}
