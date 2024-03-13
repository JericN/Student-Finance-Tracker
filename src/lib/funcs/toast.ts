import type { ToastSettings } from '@skeletonlabs/skeleton';

export function errorToast(message: string): ToastSettings {
    return {
        message: message,
        timeout: 2000,
        background: 'variant-filled-error',
    };
}

export function successToast(message: string): ToastSettings {
    return {
        message: message,
        timeout: 2000,
        background: 'variant-filled-success',
    };
}
