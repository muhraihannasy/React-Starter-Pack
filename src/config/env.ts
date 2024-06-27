type EnvironmentType = {
    APIURL: string;
    APPURL: string;
    mode: 'prod' | 'dev' 
}

const Environment: EnvironmentType = {
    APIURL: "",
    APPURL: "",
    mode: 'dev'
}

export default Environment;