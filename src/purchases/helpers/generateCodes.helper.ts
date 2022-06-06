export class GenerateCodeHelper {
  static generateRandomCode() {
    return String(Math.floor((Math.random() * (999999 - 100000 + 1) + 100000)));
  }

  static generateRandomAlfanumericCode() {
    let result = ""; 
    const possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let index = 0; index < 6; index++) {
      result += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }

    return result;
  }
}