pipeline {
  agent any

  stages {
    stage('Pull Code') {
      steps {
        echo 'Cloning repository...'
        git branch: 'dev', url: 'https://github.com/LuisRamonGV/Api_NASA_frontend'
      }
    }

    stage('Build Frontend') {
      steps {
        dir('frontend') {
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }

    stage('Deploy to EC2') {
      steps {
        echo 'Deploying via SCP...'
        sh '''
        scp -i ~/.ssh/id_rsa -r ./frontend/dist/* ubuntu@<3.147.222.36>:/home/ubuntu/frontend
        ssh -i ~/.ssh/id_rsa ubuntu@<3.147.222.36> "docker compose restart frontend"
        '''
      }
    }
  }
}
