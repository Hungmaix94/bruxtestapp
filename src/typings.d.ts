
declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.scss' {
  const content: any;
  export default content;
}

declare module "*.png" {
    const content: any;
    export default content;
}

declare module '@env' {
    const content : {
        REACT_APP_API_URL: string,
        REACT_APP_API_MAPBOX: string
    };
    export default content
}