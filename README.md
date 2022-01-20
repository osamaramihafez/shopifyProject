### Shopify Backend Developer Intern Challenge - Summer 2022


Attempting to create a mock logistics app (also for practice)

Please note: I put a lot of effort into the backend and learned quite painfully that I should have also invested more time in the frontend as I did not have enough time to debug the cors errors that I was recieving. However, please connsider that my backend solution comes with self hosted (and automated) documentation and tests. This means that you can execute the test scripts for a small check of the basic functionalities. You can also use the documentation in order to see the how to use the api endpoints and maybe use postman alongside my backend. Thank you for your consideration, and I really appreciate it.

## Requirements
You will need to have the following installed:
- A unix terminal (preferably ubuntu, but you can also use macos terminal or wsl on windows)
- Node
- Docker

Obviously, you'll need to run `npm install` in the parent directory before executing any scripts.

## Running the project
To run the entire project you can execute the following in your terminal: `sh run_everything.sh`

### Running tests

You can run tests using `sh run_tests.sh`. Please note that tests are automatically run whenever you push to master or a Pull Request.

## Viewing documentaion
You can view the docs by executing `sh run.sh` from inside the `docs` folder and then navigating to `localhost` on your browser.
Note: you may need to have npx installed, but it's likely to work without doing so if you already have npm (node).
