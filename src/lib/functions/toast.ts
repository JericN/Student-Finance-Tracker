import type { ToastSettings } from '@skeletonlabs/skeleton';

export function error(message: string): ToastSettings {
    return {
        message: message,
        timeout: 2000,
        background: 'variant-filled-error',
    };
}

export function success(message: string): ToastSettings {
    return {
        message: message,
        timeout: 2000,
        background: 'variant-filled-success',
    };
}
