pipeline {

    agent any

    tools {
        'org.jenkinsci.plugins.docker.commons.tools.DockerTool' 'Docker18.9'
    }

    environment {
        SONAR_SCANNER_HOME = tool name: 'SonarQube Scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
        DOCKER_CERT_PATH = credentials('TokenDocker')
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
        /*stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }*/

        // En esta parte se instalan dependencias y ejecutan pruebas unitarias en Jasmine y Karma
        stage('Install dependencies And Run Unit tests') {

            agent {
                docker {
                    image 'node:14'
                }
            }

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
                            -Dsonar.test.inclusions=**/*.spec.ts,**/*.test.ts,**/*spec.ts \
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












        stage('Build and Push Docker Image') {
            steps {

                script {

                    def currentBuildNumber = currentBuild.number

                    // Construye la imagen Docker en el contexto actual
                    def appImage = docker.build("pruebatecnica:v${currentBuildNumber}")

                    // Publica la imagen en docker Hub
                    docker.withRegistry('https://registry.hub.docker.com', 'TokenDocker') {
                      appImage.push()
                    }
                }

            }
        }









    }
}
