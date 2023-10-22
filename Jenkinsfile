pipeline {

    agent any

    tools {
        sonarQubeEnv name: 'sonarQubePruebaTecnica'
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

        stage('SonarQube analysis') {
            steps {
                withSonarQubeEnv('sonarQubePruebaTecnica') {
                    // Aquí va el comando para realizar el análisis de SonarQube.
                    // Las propiedades de SonarQube se pasan mediante parámetros -D
                    sh '''
                        sonar-scanner \
                            -Dsonar.projectKey=my-app \
                            -Dsonar.sources=src \
                            -Dsonar.exclusions=**/node_modules/** \
                            -Dsonar.test.inclusions=**/*.spec.ts \
                            -Dsonar.typescript.lcov.reportPaths=coverage/my-app/lcov.info \
                            -Dsonar.host.url=http://localhost:9000 \
                            -Dsonar.login=sqp_292289a50e9308062e41ca49d730de5885bbbbc0
                    '''
                }
            }
        }

        stage('Wait for SonarQube to complete analysis') {
            steps {
                // Este paso espera a que SonarQube complete el análisis y devuelve el resultado
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
