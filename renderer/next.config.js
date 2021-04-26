module.exports = {
  images:{
    domains: ['storage.googleapis.com'],
    loader: "imgix",
    path: "",
  },
  webpack: (config) => Object.assign(config, {
    target: 'electron-renderer',
  }),
}
