type EnvironmentType = {
    APIURL: string;
    APPURL: string;
    mode: 'prod' | 'dev' 
}

const Environment: EnvironmentType = {
    APIURL: "http://127.0.0.1:8055",
    APPURL: "",
    mode: 'dev'
}

export default Environment;