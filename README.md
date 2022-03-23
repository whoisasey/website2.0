<h1 align="center">
  Big Builds Headless CMS Site
</h1>

## 🚀 Big Builds Quick start

1.  **Clone the repo**

2.  **Install Packages**

    Navigate to your local repo and run `npm install`

3.  **Local Environment**
    Create a .env.development file at the root level and add this

    ```
    - WPGRAPHQL_URL=https://bigbuilds.ca/graphql
    - GATSBY_INSTAGRAM_ID=GET THIS FROM GATSBY ENV VARIABLES
    - GATSBY_INSTAGRAM_TOKEN=GET THIS FROM GATSBY ENV VARIABLES
    ```

    **_IMPORTANT_**
    Note: The Instagram Token has to be refreshed every 60 days. As of this update, please refresh it on May 22, 2022.

    Make sure you have a Facebook Developer account (Atina will invite you to the app), and make this request. Replace {long-lived-access-token} with the token from Gatsby

    ```
    curl -i -X GET "https://graph.instagram.com/refresh_access_token
    ?grant_type=ig_refresh_token
    &access_token={long-lived-access-token}"
    ```

    Once refreshed and tested, make sure to CHANGE the token from the Gatsby ENV Variables

4.  **Run locally**

    ```
    git checkout staging
    npm run start
    ```

or

    ```
    npm run develop
    ```
