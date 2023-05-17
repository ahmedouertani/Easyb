const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner({
    serverUrl: 'http://192.168.1.207:9000/',
    option : { 
        'sonar.projectDescription': 'Static analysis for the easyb',
        'sonar.projectName': 'Easybq Application',
        'sonar.projectKey': 'easyb',
        'sonar.login': 'admin',
        'sonar.password': 'bouhmidenaey97',
        'sonar.projectVersion': 'latest',
        'sonar.language': 'js',
        'sonar.sourcesEncoding': 'UTF-8',
        'sonar.sources': 'bqq',
        'sonar.tests': 'specs',
        'sonar.inclusions': 'src/**'
    },

}, () => {});
