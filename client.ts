const client = {
  version: process.env.version as string,
  name: process.env.name as string,
  enviroment: process.env.enviroment as
    | "DEVELOPMENT"
    | "PRODUCTION"
    | "TESTING",
  paypal: process.env.paypal as string,
  image: process.env.image as string,
  realm: process.env.realm as string,
  google: process.env.google as string,
  key: "821623252255455",
  translate: process.env.translate as string,
  llampukaq:
    process.env.enviroment == "DEVELOPMENT"
      ? "https://devapi.llampukaq.com"
      : "https://api.llampukaq.com",
};

export default client;
