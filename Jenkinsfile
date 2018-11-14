node {

   stage('Prepare') {
        cleanWs()
        sh 'rm -f ~/.mozilla/firefox/*.default/cookies.sqlite'
        sh 'rm -f ~/.mozilla/firefox/*.default/*.sqlite ~/.mozilla/firefox/*default/sessionstore.js'
        sh 'rm -rf ~/.cache/mozilla/firefox/*.default/*'
    }

    stage('Checkout') {
        withCredentials([string(credentialsId: 'OAUTH_TOKEN', variable: 'token')]) {
           withEnv(['HTTPS_PROXY=http://webproxy-internett.nav.no:8088']) {
            sh 'git clone https://${token}:x-oauth-basic@github.com/navikt/foreldrepengesoknad-akseptansetest.git .'
           }
         }
    }

    stage('Setup') {
       withEnv(['HTTPS_PROXY=http://webproxy-internett.nav.no:8088']) {
          sh 'npm i'
       }

       withCredentials([file(credentialsId: 'engangsstonad_e2e_config', variable: 'TESTCONF')]) {
          sh 'cat $TESTCONF > config.js'
       }
    }

    stage('Tests') {
       try {
          withEnv(['HTTPS_PROXY=http://webproxy-internett.nav.no:8088']) {
             sh 'npm test'
          }
          slackSend([
             color: 'good',
             message: "Akseptansetestene for foreldrepengesøknad er OK :tada:"
          ])
       } catch (Exception ex) {
          slackSend([
             color: 'danger',
             message: "Akseptansetesten(e) for foreldrepengesøknad feilet, sjekk status på $env.BUILD_URL"
          ])
          throw new Exception("Akseptansetesten(e) for foreldrepengesøknad feilet", ex)
       } finally {
          sh 'rm config.js'
       }
    }

}
