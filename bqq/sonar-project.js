const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner({
    serverUrl: 'http://192.168.1.207:9000/',
    options : { 
        'sonar.projectDescription': 'Static analysis for the easyb',
        'sonar.projectName': 'Easybq Application',
        'sonar.projectKey': 'easyb',
        'sonar.login': 'admin',
        'sonar.password': 'bouhmidenaey97',
        'sonar.projectVersion': '1.0',
        'sonar.sourcesEncoding': 'UTF-8',
        'sonar.sources': '.',
        //'sonar.tests': 'specs',
        //'sonar.inclusions': 'src/**'
    },

}, () => {});
