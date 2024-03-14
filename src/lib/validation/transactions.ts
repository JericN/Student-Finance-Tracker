export function validateAmount(input: number): boolean {
    const strInput = String(input);

    const hasDot = /\./.test(strInput);

    if (!hasDot) 
        return true;

    // eslint-disable-next-line prefer-destructuring
    const dec = strInput.split('.')[1];
    return dec.length < 3;
}



export function validateDescription(input: string): boolean {
    return input.length <= 200;
}