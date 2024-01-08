// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   chainWebpack:(config)=>{
//     config.externals(['@actionanand/utility', 'rxjs'])

//   },
//   configureWebpack:{
//     output:{
//       libraryTarget:"system",
//       filename:"js/app.js"
//     },
//   },
// })
module.exports = {
  chainWebpack: (config) => {
    config.devServer.headers({
      'Access-Control-Allow-Origin': '*',
    });

    config.externals(['@app/utils', 'rxjs']);
  },

  configureWebpack:{
    output:{
      libraryTarget:"system",
      filename:"js/app.js"
    },
  },
}