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
        DOCKER_HUB_CREDENTIALS = credentials('TokenDocker')
    }

    // Etapas
    stages {

        // Validar acceso al repositorio
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // En esta parte se clona el repositorio en el servidor de jenkins
        // stage('Clone repository') {
        //     steps {
        //         git(
        //               credentialsId: 'TokenGitHub-Jenkins',
        //               url: "${REPO_URL}",
        //               branch: "${BRANCH}"
        //           )
        //     }
        // }

        // En esta parte se instalan dependencias y ejecutan pruebas unitarias en Jasmine y Karma
        // stage('Install dependencies And Run Unit tests') {
        //     steps {
        //         script {
        //           try {
        //             sh 'npm ci'
        //             sh 'ng test --watch=false --browsers=ChromeHeadless'
        //           } catch (Exception e) {
        //             echo "Hubo un error durante la ejecución de las pruebas unitarias: ${e.getMessage()}"
        //             currentBuild.result = 'FAILURE'
        //           }
        //          }
        //      }
        // }

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





        stage('Docker Build') {
          steps {
            script {
              // Autenticación con Docker Hub antes de construir la imagen
              withCredentials([usernamePassword(credentialsId: 'TokenDocker', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                sh "echo ${DOCKER_HUB_CREDENTIALS} | docker login -u ${dockerHubUser} --password-stdin"
              }

              def currentBuildNumber = currentBuild.number
              sh "docker build -t ${UsernameDocker}/pruebatecnica:v${currentBuildNumber} . "
            }
          }
        }

        stage('Docker Push') {
          steps {
            script {
              def currentBuildNumber = currentBuild.number
              sh "docker push ${UsernameDocker}/pruebatecnica:v${currentBuildNumber}"
            }
          }
        }

        // Construimos la imagen y la publicamos en dockerHub
        /*stage('Build and Push Docker Image') {
            steps {

                script {

                    def currentBuildNumber = currentBuild.number

                    //Construye la imagen Docker en el contexto actual
                    def appImage = docker.build("${UsernameDocker}/pruebatecnica:v${currentBuildNumber}")

                    //Publica la imagen en docker Hub
                    withDockerRegistry([credentialsId: 'TokenDocker', url: 'https://index.docker.io/v1/']) {
                      appImage.push()
                    }
                }
            }
        }*/
    }

    post {
      always {
        echo 'Limpiando el entorno de trabajo...'
        cleanWs()
      }
      success {
        echo 'La pipeline fue exitosa. Enviando notificación de éxito...'
      }
      failure {
        echo 'La pipeline falló. Enviando notificación de fallo...'
      }
    }
}
DOCKER_HUB_CREDENTIALS
