pipeline {
    agent any

    tools {
        maven "MAVEN"
    }

    environment {
        
        DOCKERHUB_CREDENTIALS = credentials ('bouhmiid-dockerhub')
        SONAR_HOST_URL = "http://192.168.1.207:9000"

        NEXUS_VERSION = "nexus3"
        NEXUS_PROTOCOL = "http"
        NEXUS_URL = "192.168.1.207:8081"
        NEXUS_REPOSITORY = "java-app"
        NEXUS_CREDENTIAL_ID = "NEXUS_CRED"

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

/*stage('Maven Build') {
            steps {
                sh 'mvn package -DskipTests=true'
            }
        }

        stage('Publish to Nexus Repository Manager') {
            steps {
                script {
                    pom = readMavenPom file: "pom.xml"
                    filesByGlob = findFiles(glob: "target/*.${pom.packaging}")
                    echo "${filesByGlob[0].name} ${filesByGlob[0].path} ${filesByGlob[0].directory} ${filesByGlob[0].length} ${filesByGlob[0].lastModified}"
                    artifactPath = filesByGlob[0].path
                    artifactExists = fileExists artifactPath
                    if (artifactExists) {
                        echo "*** File: ${artifactPath}, group: ${pom.groupId}, packaging: ${pom.packaging}, version ${pom.version}"
                        nexusArtifactUploader(
                            nexusVersion: 'nexus3',
                            protocol: 'http',
                            nexusUrl: 'http://192.168.1.207:8081',
                            groupId: pom.groupId,
                            version: pom.version,
                            repository: 'maven-central-repository',
                            credentialsId: 'NEXUS_CRED',
                            artifacts: [
                                [artifactId: pom.artifactId,
                                classifier: '',
                                file: artifactPath,
                                type: pom.packaging],
                                [artifactId: pom.artifactId,
                                classifier: '',
                                file: "pom.xml",
                                type: "pom"]
                            ]
                        )
                    } else {
                        error "*** File: ${artifactPath}, could not be found"
                    }
                }
            }
        }*/

    

stage('SonarQube') {
    steps {
        sh 'mvn sonar:sonar -Dsonar.login=admin -Dsonar.password=bouhmidenaey97'
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
