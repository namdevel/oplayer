module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // modules: 'umd',
        useBuiltIns: 'usage',
        targets: {
          browsers: ['last 2 versions', '> 1%', 'not dead', 'ie >= 11']
        },
        spec: true,
        forceAllTransforms: true,
        corejs: {
          version: 3,
          proposals: false
        }
      }
    ]
  ],
  plugins: [
    [
      'babel-plugin-import-global',
      {
        globals: {
          '@oplayer/core': 'OPlayer',
          '@oplayer/ui': 'OUI',
          '@oplayer/hls': 'OHls',
          'hls.js/dist/hls.light.min.js': 'Hls',
          '@oplayer/torrent': 'OTorrent',
          'webtorrent/webtorrent.min.js': 'WebTorrent',
          react: 'React'
        }
      }
    ]
  ]
}
