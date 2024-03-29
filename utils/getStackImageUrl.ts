export const getStackImageUrl = (stack: string) => {
  const data: {[key: string]: string} = {
    js: 'https://icon.icepanel.io/Technology/svg/JavaScript.svg',
    ts: 'https://icon.icepanel.io/Technology/svg/TypeScript.svg',
    react: 'https://icon.icepanel.io/Technology/svg/React.svg',
    vue: 'https://icon.icepanel.io/Technology/svg/Vue.js.svg',
    nextjs: 'https://icon.icepanel.io/Technology/png-shadow-512/Next.js.png',
    nodejs: 'https://icon.icepanel.io/Technology/svg/Node.js.svg',
    spring: 'https://icon.icepanel.io/Technology/svg/Spring.svg',
    java: 'https://icon.icepanel.io/Technology/svg/Java.svg',
    nestjs: 'https://icon.icepanel.io/Technology/svg/Nest.js.svg',
    express: 'https://icon.icepanel.io/Technology/png-shadow-512/Express.png',
    go: 'https://icon.icepanel.io/Technology/svg/Go.svg',
    c: 'https://icon.icepanel.io/Technology/svg/C.svg',
    python: 'https://icon.icepanel.io/Technology/svg/Python.svg',
    django: 'https://icon.icepanel.io/Technology/png-shadow-512/Django.png',
    swift: 'https://icon.icepanel.io/Technology/svg/Swift.svg',
    kotlin: 'https://icon.icepanel.io/Technology/svg/Kotlin.svg',
    mysql: 'https://icon.icepanel.io/Technology/svg/MySQL.svg',
    mongodb: 'https://icon.icepanel.io/Technology/svg/MongoDB.svg',
    php: 'https://icon.icepanel.io/Technology/svg/PHP.svg',
    graphql: 'https://icon.icepanel.io/Technology/svg/GraphQL.svg',
    firebase: 'https://icon.icepanel.io/Technology/svg/Firebase.svg',
    reactnative: 'https://icon.icepanel.io/Technology/svg/React.svg',
    unity: 'https://icon.icepanel.io/Technology/png-shadow-512/Unity.png',
    flutter: 'https://icon.icepanel.io/Technology/svg/Flutter.svg',
    aws: 'https://icon.icepanel.io/Technology/png-shadow-512/AWS.png',
    kubernetes: 'https://icon.icepanel.io/Technology/svg/Kubernetes.svg',
    docker: 'https://icon.icepanel.io/Technology/svg/Docker.svg',
    git: 'https://icon.icepanel.io/Technology/svg/Git.svg',
    figma: 'https://icon.icepanel.io/Technology/svg/Figma.svg',
    zeplin: 'https://icon.icepanel.io/Technology/svg/Sketch.svg',
  };
  return data[stack] || '';
};
