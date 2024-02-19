import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.studentfinancetracker.app',
    appName: 'Student Finance Tracker',
    webDir: 'build',
    server: {
        androidScheme: 'https',
    },
};

export default config;
