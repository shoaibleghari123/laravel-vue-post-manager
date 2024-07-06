Clone the repository

git clone https://github.com/shoaibleghari123/laravel-vue-post-manager.git

Switch to the repo folder

cd laravel-vue-post-manager

Install all the dependencies using composer and npm

composer install
npm install

Copy the example env file and make the required configuration changes in the .env file

cp .env.example .env

Generate a new application key

php artisan key:generate


Run the database migrations and seeder (Set the database connection in .env before migrating)

php artisan migrate
php artisan db:seed

Command list

git clone https://github.com/shoaibleghari123/laravel-vue-post-manager.git
cd laravel-vue-post-manager
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
npm run dev

Default login information:


email: from database
password: password

Note:

There are two types of roles:

Administrator: This role has all permissions, including the ability to delete posts.
Editor: This role has all permissions except for deleting posts

Overview

This project is a simple Post CRUD application built with Vue 3, utilizing the Composition API and Laravel 8. I've
divided the components into composable and main components. Composables serve a role similar to service classes in
Laravel. The application demonstrates how to manage posts, including functionalities such as creation, reading,
updating, and deletion. It leverages Vue.js for the frontend and Laravel for the backend.

HOW TO WORK WITH

Vue Js, SPA, Laravel, Sanctum, User, Role, Permissions, Validation, Vue Js pagination, Vue Js abilities, Vue Js composition etc...

