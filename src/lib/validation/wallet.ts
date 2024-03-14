export function validateWalletName(input: string): boolean {
    const hasChar = /[a-zA-z]/.test(input);
    const validLen = input.length > 0;
    return hasChar && validLen;
}
