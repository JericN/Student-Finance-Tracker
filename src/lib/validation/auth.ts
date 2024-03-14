export function validateUsername(input: string): boolean {
    const re = /[0-9A-Za-z]/;
    const filtered = input.split('').filter(e => !re.test(e));

    const validChars = filtered.length === 0;
    const validLen = input.length <= 12;

    return validChars && validLen;
}

export function validatePassword(input: string): boolean {
    const re = /[0-9]/;

    const hasNumber = re.test(input);
    const validLen = input.length <= 20;

    return hasNumber && validLen;
}
