[![Deploy Gatsby site to Pages](https://github.com/naw-db/naw-db.github.io/actions/workflows/gatsby.yml/badge.svg)](https://github.com/naw-db/naw-db.github.io/actions/workflows/gatsby.yml)

### 1. Environment Setup
* Install [Homebrew](https://docs.brew.sh/Installation).
* Install `nvm`
    * Visit: https://github.com/nvm-sh/nvm
* Install `node` and `yarn`
    * Run command: `nvm install --lts`
    * Run command: `npm install -g yarn@latest`
    * Verify version of the installed `node` and `yarn`
        * Run command: `node --version` (Version should be greater than or equal to `v18.16.0`.)
        * Run command: `yarn --version` (Version should be greater than or equal to `1.22.19`.)
* Install Git.
    * If you use a Mac, you can skip this. Apple ships their own fork of `git`.
* Install Gatsby CLI.
    * Run command: `npm install -g gatsby-cli`

### 2. Recommended Development Tools
* Terminal: [iTerm2](https://www.iterm2.com/)
* Shell: [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh)

### 3. Local Development
#### 3.1 Check package health
* Upgrade `node` and `yarn`.
    * Run commands:
        * `nvm install --lts`
        * `npm install -g yarn@latest`
* Check if there are upgradable project dependencies.
    * Run command: `yarn upgrade`
#### 3.2 To run a testing build of your website locally on your machine
* `cd` into the root directory of the website project.
* Run command: `yarn install && yarn run develop`

#### 3.2 To run a production build of your website locally on your machine
* `cd` into the root directory of the website project.
* Run command: `yarn install && yarn run build && yarn run serve`

#### 3.3 To run E2E tests against your local website
* To execute tests with GUI, run command: `CY_OP=open yarn run test:run:e2e`
* To execute tests without GUI, run command: `CY_OP=run yarn run test:run:e2e`

### 4. Publish to GitHub Pages
A GitHub Action is set up to automatically deploy the updated website when a commit is pushed to the `develop` branch.

Go [here](https://github.com/naw-db/naw-db.github.io/actions/workflows/gatsby.yml) to view the deployments.
