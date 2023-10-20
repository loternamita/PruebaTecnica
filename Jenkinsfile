pipeline {
    agent any

    stages {
        stage('Clone repository') {
            steps {
                checkout scm
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run tests') {
            steps {
                sh 'npm run test -- --watch=false --no-progress --browsers=ChromeHeadlessNoSandbox'
            }
        }
        stage('Build Docker image') {
            steps {
                script {
                    docker.build("my-welcome-app:tag")
                }
            }
        }
        // ... cualquier otra etapa que necesites (despliegue, notificaciones, etc.)
    }
}
