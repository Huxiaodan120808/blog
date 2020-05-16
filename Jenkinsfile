pipeline {
  agent { label 'worker' }
  post {
    failure {
      updateGitlabCommitStatus name: 'build', state: 'failed'
    }
    success {
      updateGitlabCommitStatus name: 'build', state: 'success'
    }
  }

  options {
    gitLabConnection('mo-gitlab')
    gitlabBuilds(builds: ['build'])
    buildDiscarder(logRotator(numToKeepStr: '5', artifactNumToKeepStr: '3'))
  }

  triggers {
    gitlab(triggerOnPush: true,
    triggerOnMergeRequest: true,
    skipWorkInProgressMergeRequest: true,
    ciSkip: true,
    branchFilterType: 'NameBasedFilter',
    includeBranchesSpec: 'beta',
    setBuildDescription: true)
  }

  stages {
    stage('build') {
      agent {
        docker { 
          label 'worker && extranet'
          image 'registry:5000/npm-builder'
          args '-u jenkins --net=host -v node_cache_vol:/home/jenkins/.npm:z'
        }
      }
      steps {
        // onpm.adc.com mirror 
        sh 'npm --registry http://172.16.42.55 install'
        sh 'npm run build'

        stash includes: 'dist/*', name: 'webapp-artifact'
      }
    }

    // trick to build and test in single machine
    stage('publish') {
      agent { label 'worker' }
      when {
        // do not build on pull request
        not { changeRequest() }
      }
      steps {
        // build dockerfile
        unstash 'webapp-artifact'

        sh 'docker build -t registry:5000/IComm-doc .'
        sh 'docker push registry:5000/IComm-doc'
      }
    } 
  }
}
