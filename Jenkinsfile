pipeline {
    agent any

    environment {
        
        DOCKERHUB_CREDENTIALS = credentials ('bouhmiid-dockerhub')
        SONAR_HOST_URL = "http://192.168.1.207:9000"

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

        stage('Build Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build('bouhmiid/EasyBQ', '.')
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
        sh 'docker push bouhmiid/EasyBQ:latest'
      }
    }

        /*stage('Run Docker Container') {
            steps {
                script {
                    docker.image('testng').run('-p 4302:4302')
                }
            }
        }*/

        stage('Sonarqube') {
    steps {
        script {
            withCredentials([string(credentialsId: 'sonarqube-credentials', variable: 'SONAR_TOKEN')]) {
                sh 'npm install -g sonarqube-scanner' // Installation du scanner SonarQube
                sh 'sonar-scanner -Dsonar.host.url=http://192.168.1.207:9000 -Dsonar.login=admin -Dsonar.password=bouhmidenaey97 -Dsonar.projectKey=bqq -Dsonar.sources=src' // Exécution du scanner SonarQube pour le projet Angular
            }
        }
    }
}






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
