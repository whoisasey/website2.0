<h1 align="center">
  Big Builds Headless CMS Site
</h1>

## 🚀 Big Builds Quick start

1.  **Clone the repo**

2.  **Install Packages**

    Navigate to your local repo and run `npm install`

3.  **Local Environment**
    Create a .env.development file at the root level and add the following (get from Gatsby Variables)

    ```
    - WPGRAPHQL_URL=
    - GATSBY_INSTAGRAM_ID=
    - GATSBY_INSTAGRAM_TOKEN=
    ```

4.  **Updating The Instagram Token**

    **_IMPORTANT_**
    Note: The Instagram Token has to be refreshed every 60 days. As of this update, please refresh it on July 23, 2022.

    In the Facebook App, go to Instagram Basic Display > Basic Display > User Token Generator and Generate Token. Follow the prompts for your password.

    - Once refreshed and tested, make sure to CHANGE the token from the Gatsby ENV Variables

5.  **Run locally**

    ```
    git checkout staging
    npm run start
    ```

or

    ```
    npm run develop
    ```
