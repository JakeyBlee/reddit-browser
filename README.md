# Reddit Browser Codecademy Portfolio Project

## Description

This is an independent project suggested by the Codecademy platform. It was bootstrapped with [Create React App] and coded primarily by myself working from topics that I have learnt from the Codecademy platform.

The projects main purpose is to provide a simple to use and condensed browser for the popular Reddit platform, mainly to demonstrate my understanding of front end developement and its integration with APIs and HTTP requests. This project serves as a capstone to the end of the Front End Development section of my Full Stack Career Path progression.

## Features

This App allows users to search the Reddit database and through the JSON API pull posts that match their specific search requests. It displays the content of those posts, along with their upvotes and comments. Due to the API I am using, it does not allow for write operations.

There are two different formats, controlled through media queries and react-responsive. The desktop app allows for saving of subreddits to a list, which can be tailored to each user. Clicking on these subreddit icons will filter the feed to be specific to these. The mobile format is more streamlined, and displays less of these details.

## How to Use

This App will be hosted on a remote site, and therefore should not need any additional steps to deploy. Typing a term into the post searchbar will return relevant items via the API for viewing. Specific subreddits can also be filtered through the use of the subreddit searchbar. Subreddits can be further filtered by new, hot and top posts.

## Technololgies

This project uses HTML, CSS and JavaScript.
The App primarily utilises the React library and therefore the majority of the HTML is in the form of JSX. This allows for more efficient rendering and faster load times.
States are handled through React-Redux and stored globally, to allow convinient access to individual Components. Responsive design was achieved through Redux-Responsive, alongside CSS media queries.

## Collaboraters

I am the sole author of this project following its initiation through bootstrapping.

## Licence

Users are free to use any code within this app for their own projects.