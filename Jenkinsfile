pipeline {
    agent any

    stages {
        stage('Clone repository') {
            steps {
                git(
                      credentialsId: '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',
                      url: 'https://github.com/loternamita/PruebaTecnica.git',
                      branch: 'develop'
                  )
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
                    docker.build("my-welcome-app:1.0.0")
                }
            }
        }
        // ... cualquier otra etapa que necesites (despliegue, notificaciones, etc.)
    }
}
