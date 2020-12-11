const config = {
  app: {
    name: "Movie system manager"
  },
  api: {
    default: "api",
    // If this app run in another domain use full url schema for baseURL connections
    connections: {
      sanctum: {
        baseURL: "/sanctum",
        timeout: 50000
      },
      api: {
        baseURL: "/api/v1",
        timeout: 50000
      }
    }
  },
  auth: {
    refresh: {
      timeInterval: 20, // minutes
      timeOffset: 10, // minutes
      maxAttempts: 3
    }
  }
};

export default config;
