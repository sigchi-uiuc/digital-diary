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
                // Type errors fail the build here — tsc runs inside the Next.js Docker build
                sh "docker compose build --no-cache"
            }
        }

        stage('Deploy') {
            when { branch 'prod' }
            steps {
                withCredentials([file(credentialsId: 'diary-env-file', variable: 'ENV_FILE')]) {
                    sh """
                        cp \$ENV_FILE .env
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
