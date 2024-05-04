export async function hashPassword(str) {
    const buffer = new TextEncoder().encode(str);
    return window.crypto.subtle.digest("SHA-256", buffer).then((hash) => {
      return Array.prototype.map
        .call(new Uint8Array(hash), (x) => ("00" + x.toString(16)).slice(-2))
        .join("");
    });
  }
  