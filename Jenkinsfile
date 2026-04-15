pipeline {
    agent any

    environment {
        COMPOSE_FILE = "docker-compose.yml"
        IMAGE_TAG    = "${env.GIT_COMMIT?.take(7) ?: 'latest'}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build images') {
            steps {
                // Rebuilds only layers whose inputs changed; cache reused otherwise
                sh "docker compose build"
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([file(credentialsId: 'diary-env-file', variable: 'ENV_FILE')]) {
                    sh '''
                        docker compose --env-file "$ENV_FILE" up -d --remove-orphans
                        docker image prune -f
                    '''
                }
            }
        }
    }

    post {
        failure {
            echo "Build failed on branch ${env.BRANCH_NAME} — check logs above."
        }
        success {
            echo "Deployed successfully (${IMAGE_TAG})."
        }
    }
}
