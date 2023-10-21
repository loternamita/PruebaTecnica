pipeline {


    agent any

    // Etapas
    stages {

        // En esta parte se clona el repositorio en el servidor de jenkins
        stage('Clone repository') {
            steps {
                git(
                      credentialsId: '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',
                      url: 'https://github.com/loternamita/PruebaTecnica.git',
                      branch: 'develop'
                  )
            }
        }

        // En esta parte se instala las dependencias
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        // En esta parte se ejecutan pruebas unitarias en Jasmine y Karma
        stage('Run Unit tests') {
            steps {
                script {
                  sh 'npm install'
                  sh 'ng test --watch=false --browsers=ChromeHeadless'
                }
            }
            post {
                always {
                  junit 'test-results/test-results.xml'
                }
            }
        }

        // En esta parte se dockeriza el proyecto
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
