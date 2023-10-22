pipeline {

    agent any

    // Dependencias que necesitamos
    tools {
        'org.jenkinsci.plugins.docker.commons.tools.DockerTool' 'Docker18.9'
    }

    // Variables de entorno extraidas del servidor de jenkins
    environment {
        SONAR_SCANNER_HOME = tool name: 'SonarQube Scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
        DOCKER_CERT_PATH = credentials('TokenDocker')
    }

    // Etapas
    stages {

        // Validar el pipeline
        // stage('Checkout') {
        //     steps {
        //         git(
        //               credentialsId: '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',
        //               url: 'https://github.com/loternamita/PruebaTecnica.git',
        //               branch: 'develop'
        //           )
        //     }
        // }

        // En esta parte se clona el repositorio en el servidor de jenkins
        // stage('Clone repository') {
        //     steps {
        //         git(
        //               credentialsId: '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',
        //               url: 'https://github.com/loternamita/PruebaTecnica.git',
        //               branch: 'develop'
        //           )
        //     }
        // }

        // En esta parte se instalan dependencias y ejecutan pruebas unitarias en Jasmine y Karma
        /*stage('Install dependencies And Run Unit tests') {
            steps {
                script {
                  sh 'npm install'
                  sh 'ng test --watch=false --browsers=ChromeHeadless'
                }
            }
        }*/

        // Configura Sonar con requisitos especificos que se requieran
        // stage('SonarQube Analysis') {
        //     steps {
        //         script {
        //             def scannerHome = tool 'SonarQube Scanner';
        //             withSonarQubeEnv('sonarQubePruebaTecnica') {
        //                 sh """
        //                     ${scannerHome}/bin/sonar-scanner \
        //                     -Dsonar.projectKey=pruebaTecnica \
        //                     -Dsonar.projectName='pruebaTecnica' \
        //                     -Dsonar.sources=src \
        //                     -Dsonar.exclusions=**/node_modules/** \
        //                     -Dsonar.tests=src \
        //                     -Dsonar.test.inclusions=**/*.spec.ts,**/*.test.ts,**/*spec.ts \
        //                     -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info
        //                 """
        //             }
        //         }
        //     }
        // }

        // Este paso espera a que SonarQube complete el análisis y devuelve el resultado
        // stage('Wait for SonarQube to complete analysis') {
        //     steps {
        //         waitForQualityGate abortPipeline: true
        //     }
        // }

        // Construimos la imagen y la publicamos en dockerHub
        stage('Build and Push Docker Image') {
            steps {

                script {

                    def currentBuildNumber = currentBuild.number
                    def username = 'loternamita'
                    def password = DOCKER_CERT_PATH

                    // Construye la imagen Docker en el contexto actual
                    //def appImage = docker.build("loternamita/pruebatecnica:v${currentBuildNumber}")

                    // Publica la imagen en docker Hub
                    // withDockerRegistry([credentialsId: 'TokenDocker', url: 'https://index.docker.io/v1/']) {
                    //   appImage.push()
                    // }

                    // Utilizar credenciales almacenadas para iniciar sesión en Docker Hub
                    withCredentials([usernamePassword(credentialsId: DOCKER_CERT_PATH, usernameVariable: username, passwordVariable: password)]) {
                        // Iniciar sesión en Docker Hub
                        sh "docker login -u $username -p $password"

                        // Construir la imagen de Docker
                        sh "docker build -t loternamita/pruebatecnica:v${currentBuildNumber} ."

                        // Publicar la imagen en Docker Hub
                        sh "docker push loternamita/pruebatecnica:v${currentBuildNumber}"
                    }
                }
            }
        }
    }
}
