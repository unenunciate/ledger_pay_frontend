
const covalentHeaders = {
    'Authentication': `Basic ${process.env.NEXT_PUBLIC_COVALENT_API_KEY}:`,
    'Content-Type': 'application/json'
}

const strapiHeaders = {
    'Content-Type': 'application/json'
}

export {
    strapiHeaders,
    covalentHeaders
}