[![Deploy Gatsby site to Pages](https://github.com/naw-db/naw-db.github.io/actions/workflows/gatsby.yml/badge.svg)](https://github.com/naw-db/naw-db.github.io/actions/workflows/gatsby.yml)

### 1. Environment Setup
* Install [Homebrew](https://docs.brew.sh/Installation).
* Install `nvm`
   * Visit: https://github.com/nvm-sh/nvm
* Install `node` and `npm`
   * Run command: `nvm install --lts`
   * Run command: `npm install -g npm@latest`
   * Verify version of the installed `node` and `npm`
      * Run command: `node --version` (Version should be greater than or equal to `v18.9.1`.)
      * Run command: `npm --version` (Version should be greater than or equal to `9.6.4`.)
* Install Git.
   * If you use a Mac, you can skip this. Apple ships their own fork of `git`.
* Install Gatsby CLI.
   * Run command: `npm install -g gatsby-cli`

### 2. Recommended Development Tools
* Terminal: [iTerm2](https://www.iterm2.com/)
* Shell: [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh)

### 3. Local Development
#### 3.1 Check package health
* Upgrade `node` and `npm`.
   * Run commands:
      * `nvm install --lts`
      * `npm install -g npm@latest`
* Check if there are dependencies not declared in `package.json`.
   * This checks if there are dependencies that are available on your machine but not declared in this package's dependency closure, e.g. dependencies that were installed via `npm install` without specifying the `--save` flag.
   * Run command: `npm prune`
* Check if there are upgradable global dependencies.
   * Run command: `npm outdated -g --depth=0`
   * To update all global dependencies:
      * Run command: `npm update -g`
* Check if there are upgradable project dependencies.
   * Use `npm-check-updates`:
      * `npm i -g npm-check-updates`
      * `ncu -u`
      * `npm install`

#### 3.2 To run a testing build of your website locally on your machine
* `cd` into the root directory of the website project.
* Run command: `npm install && gatsby develop`

#### 3.2 To run a production build of your website locally on your machine
* `cd` into the root directory of the website project.
* Run command: `npm install && gatsby build && gatsby serve`

### 4. Publish to GitHub Pages
A GitHub Action is set up to automatically deploy the updated website when a commit is pushed to the 'develop' branch.

Go [here](https://github.com/naw-db/naw-db.github.io/actions/workflows/gatsby.yml) to view the deployments.
