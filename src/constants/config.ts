import argv from 'minimist'
const opts = argv(process.argv.slice(2))
export const isProduction = Boolean(opts.production)
