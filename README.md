# DLSU CATVAS
<p align="center">
<img  src="https://github.com/ccapdev1920T2/x22g4/blob/master/public/imgs/it.png"
width="160"  height="160">
</p>
DLSU CATVAS is a website application that provides an online database for DLSU PUSA. This allows users to view cats that are still up for adoption, already adopted, and those who are in the process of being domesticated. It also allows users to make their own accounts to post cats they see within DLSU. These accounts also allows them to meowt (like) photos and comment on posts.

## Getting Started
This web application requires internet to properly load BootstrapCDN.

### Prerequisites
#### Clone
- Clone this repository to your local computer

#### Setup
- This project uses Express, Handlebars, and MongoDB so it is recommended to make sure you have Node.JS installed and then conduct the following steps:
> Navigate to the project folder and open cmd
```shell
npm init
```
> Use defaults
```shell
npm install express --save
npm install hbs --save
npm install mongodb --save
```
> Add cat profiles and simulate log-in throught a default user
```shell
node addDefaults.js
```
> NOTE: This code is for deleting posts all at once!
```shell
node deletePosts.js
```

## Built With
* Bootstrap - Open-source CSS framework
* NodeJS - Open-source, cross-platform, JS runtime environment
* MongoDB - Cross-platform database program 

## Team
* **Jacob Darvin** 
* **Justin Jay Galura**
* **Michele Gelvoleo**

## Acknowledgments
We would like to thank Sir Arren Antioquia for helping us build this project and suggesting ways on how we can improve it. 

