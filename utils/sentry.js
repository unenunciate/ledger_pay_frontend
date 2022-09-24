import Sentry from "@sentry/nextjs";

let sentry;

const getSentry = () => {
    if(!sentry) {
        sentry = Sentry.init({
            dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
            tracesSampleRate: 1.0,
        });
    }

    return sentry;
}

export {
    getSentry
}