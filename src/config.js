const config = {
    MAX_ATTACHMENT_SIZE: 5000000,
    STRIPE_KEY: process.env.REACT_APP_STRIPE_KEY,
    s3: {
      REGION: "ca-central-1",
      BUCKET: "notesapp.upload"
    },
    apiGateway: {
      REGION: "ca-central-1",
      URL: process.env.REACT_APP_API_GATEWAY_URL
    },
    cognito: {
      REGION: "ca-central-1",
      USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
      APP_CLIENT_ID: process.env.REACT_APP_APP_CLIENT_ID,
      IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID
    },
  };
  
  export default config;