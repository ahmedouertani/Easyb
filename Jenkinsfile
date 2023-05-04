pipeline {
    agent any

    environment {
        
        DOCKERHUB_CREDENTIALS = credentials ('bouhmiid-dockerhub')
    }

    stages {

        stage('Checkout Git') {   //Récupération du code source
            steps {
                echo 'checking GitHub Repo'
                git branch: 'main',
                url: 'https://github.com/ahmedouertani/Easyb.git'
            }
        }

        stage('Use Node.js') { //Installation de Node.JS
            steps {
                script {
                    nodejs = tool 'nodejs-16'
                    env.PATH = "${nodejs}/bin:${env.PATH}"
                }
            }
        }

        stage('Install dependencies') { //Installer les dépendances du projet
            steps {
                sh 'npm install'
            }
        }

        /*stage('Run Lint') {
            steps {
                sh 'npm run lint'
            }
        }*/

        /*stage('Build app') {
            steps {
                sh 'npm run build:prod'
            }
        }*/


/*stage('Sonarqube') {
    steps {
            sh 'mvn sonar:sonar -Dsonar.login=admin -Dsonar.password=bouhmidenaey97' // Exécuter l'analyse SonarQube avec Maven et les informations d'authentification appropriées
        }
    }*/

     /*stage('SonarQube analysis') {
      steps {
        withSonarQubeEnv('SONARQUBE_TOKEN') {
          // Exécution de l'analyse SonarQube
          sh 'sonar-scanner' // Utilisation du scanner SonarQube pour analyser le code source
        }
      }
    }*/



        stage('Build Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build('bouhmiid/testng1', '.')
                    //dockerImage.push()
                }
            }
        }

        stage ('login to dockerhub') {
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

  stage('Push') {
      steps {
        sh 'docker push bouhmiid/testng1:latest'
      }
    }

        stage('Run Docker Container') {
            steps {
                script {
                    docker.image('testng').run('-p 4300:4300')
                }
            }
        }

        stage ('MVN Sonarqube'){

           steps {
            sh 'mvn sonar:sonar -Dsonar.login=admin -Dsonar.password=bouhmidenaey97'

           }
           }


        /*stage('Upload artifact') {
            steps {
                script {
                    def artifacts = findFiles(glob: 'dist/**//**.js')
                    archiveArtifacts artifacts
                }
            }
        }*/
    }
    
    post {
        success {
            echo 'Success'
        }
        failure {
            echo 'Failure'
        }
    }
}
