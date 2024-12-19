module.exports = function override(config, env) {
    // Add the fallbacks for the missing Node.js core modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      path: require.resolve('path-browserify'),
      util: require.resolve('util/'),
    }; 
     
  
    return config;
  };