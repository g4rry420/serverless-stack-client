const dev = {
  STRIPE_KEY: process.env.REACT_APP_STRIPE_KEY,
  s3: {
    REGION: "ca-central-1",
    BUCKET: process.env.REACT_APP_BUCKET_NAME_DEV
  },
  apiGateway: {
    REGION: "ca-central-1",
    URL: process.env.REACT_APP_API_GATEWAY_URL_DEV
  },
  cognito: {
    REGION: "ca-central-1",
    USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID_DEV,
    APP_CLIENT_ID: process.env.REACT_APP_APP_CLIENT_ID_DEV,
    IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID_DEV
  },
};

const prod = {
  STRIPE_KEY: process.env.REACT_APP_STRIPE_KEY,
  s3: {
    REGION: "ca-central-1",
    BUCKET: process.env.REACT_APP_BUCKET_NAME
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

const config = {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  // Default to dev if not set
  ...(process.env.REACT_APP_STAGE === "prod" ? prod : dev),
};

export default config;
