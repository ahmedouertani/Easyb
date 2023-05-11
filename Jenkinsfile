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

        /*stage('Build Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build('bouhmiid/easybq', '.')
                    //dockerImage.push()
                }
            }
        }*/

        stage ('login to dockerhub') {
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

  /*stage('Push') {
      steps {
        sh 'docker push bouhmiid/easybq:latest'
      }
    }

        stage('Run Docker Container') {
            steps {
                script {
                    docker.image('bouhmiid/easybq').run('-p 4304:4304')
                }
            }
        }

        stage('Deploy') {
    steps {
        nexusPublisher nexusInstanceId: 'nexus1', nexusRepositoryId: 'your-repo-id', protocol: 'http', serverUrl: 'http://nexus-url', packages: [[$class: 'NpmPackage', packageJson: 'package.json', targetRepo: 'your-repo-name']]
    }
}*/


stage('Sonarqube') {
    steps {
        script {
            // Use SonarQubeScanner tool installation
            def scannerHome = tool 'sonar-scanner'

            // Execute SonarQube scanner
            withEnv(["PATH+SONARQUBE_SCANNER=${scannerHome}/bin"]) {
                sh 'sonar-scanner'
            }
            
            timeout(time: 10, unit: 'MINUTES') {
                waitForQualityGate abortPipeline: true
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
