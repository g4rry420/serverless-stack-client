const config = {
    s3: {
      REGION: "ca-central-1",
      BUCKET: "notesapp.upload",
    },
    apiGateway: {
      REGION: "ca-central-1",
      URL: "https://rghoz0au9l.execute-api.ca-central-1.amazonaws.com/prod",
    },
    cognito: {
      REGION: "ca-central-1",
      USER_POOL_ID: "ca-central-1_5eKrgzUw7",
      APP_CLIENT_ID: "2bjsfludoapkg1hdeq7qvfkakp",
      IDENTITY_POOL_ID: "ca-central-1:e9dd777c-5f62-425a-a3d9-30d4c1f06a0d",
    },
  };
  
  export default config;