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

        stage('Lint & Type-check') {
            steps {
                sh 'npm ci'
                sh 'npx tsc --noEmit'
            }
        }

        stage('Build images') {
            steps {
                sh "docker compose build --no-cache"
            }
        }

        stage('Deploy') {
            when { branch 'main' }
            steps {
                withCredentials([file(credentialsId: 'diary-env-file', variable: 'ENV_FILE')]) {
                    sh """
                        cp \$ENV_FILE .env
                        docker network create npm_network 2>/dev/null || true
                        docker compose up -d --remove-orphans
                        docker image prune -f
                    """
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
