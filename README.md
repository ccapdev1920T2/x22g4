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
npm install
```
> Run this file in cmd to add the cats' details in the database
```shell
node addDefaults.js
```
> Run the application
```shell
node index.js
```

#### Notes
> Use this code to delete posts:
```shell
node deletePosts.js
```
> Use this code to clear exisiting user profiles:
```shell
node clearUsers.js
```

## Built With
* Bootstrap - Open-source CSS framework
* MongoDB - Cross-platform database program
* NodeJS - JavaScript runtime environment 

## Team
| <a href="https://github.com/Darvvvin" target="_blank">**Jacob Darvin**</a> | <a href="https://github.com/G-Justin" target="_blank">**Justin Jay Galura**</a> | <a href="https://github.com/waterproofloaf" target="_blank">**Michele Gelvoleo**</a> |
| :---: |:---:| :---:|
| [![Jacob Darvin](https://avatars1.githubusercontent.com/u/29309542?v=3&s=200)](https://github.com/Darvvvin)    | [![Justin Jay Galura](https://avatars1.githubusercontent.com/u/27716956?v=3&s=200)](https://github.com/G-Justin) | [![Michele Gelvoleo](https://avatars1.githubusercontent.com/u/60908989?v=3&s=200)](https://github.com/waterproofloaf)  |
| <a href="https://github.com/Darvvvin" target="_blank">`github.com/darvvvin`</a> | <a href="https://github.com/G-Justin" target="_blank">`github.com/G-Justin`</a> | <a href="https://github.com/waterproofloaf" target="_blank">`github.com/waterproofloaf`</a> |


## Acknowledgments
We would like to thank Sir Arren Antioquia for helping us build this project and suggesting ways on how we can improve it. 

## Heroku
https://thawing-savannah-07556.herokuapp.com/

