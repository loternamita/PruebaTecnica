pipeline {

    agent any

    environment {
        SONAR_SCANNER_HOME = tool name: 'SonarQube Scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
    }

    // Etapas
    stages {

        // Validar el pipeline
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

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
        }

        // Configura Sonar con requisitos especificos que se requieran
        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarQube Scanner';
                    withSonarQubeEnv('sonarQubePruebaTecnica') {
                        sh """
                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=pruebaTecnica \
                            -Dsonar.projectName='pruebaTecnica' \
                            -Dsonar.sources=src \
                            -Dsonar.exclusions=**/node_modules/** \
                            -Dsonar.tests=src \
                            -Dsonar.test.inclusions=**/*.spec.ts **/*spec.ts **/*.test.ts \
                            -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info
                        """
                    }
                }
            }
        }

        // Este paso espera a que SonarQube complete el análisis y devuelve el resultado
        stage('Wait for SonarQube to complete analysis') {
            steps {

                waitForQualityGate abortPipeline: true
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
