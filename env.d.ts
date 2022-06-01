declare namespace NodeJS {
    export interface ProcessEnv {
        readonly DATABASE_CONNECTION: string
        readonly JWT_SECRET: string
        readonly MAILJET_API_KEY: string
        readonly MAILJET_API_SECRET: string
    }
}