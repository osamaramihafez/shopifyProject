### Challenge

Attempting to create a mock logistics app (also for practice)

# Development environment

I've attempted the problem using Postgres and Node. Most of the following scripts are to be used in a unix environment, if you are on a windows please consider installing docker and wsl2. You will need docker for the majority of the scripts below.

### Running the backend development environment

Please note that you will need nodemone to execute `run_backend.sh` as this script is for development purposes.

To run the backend for development purposes, you can execute `sh run_backend.sh`. This will stop any currently running standalone postgres containers, build a new image, serve nodemon.

### Running tests

You can run tests using `sh run_tests.sh`. Please note that tests are automatically run whenever you push to master or a Pull Request.

### Using Postgres through docker instead of installing postgres

It's recommended that you install and learn postgres on your own, but if you'd just like to have the postgres database for development purposes you can use `docker-compose` inside of the `db` folder. You can find more instructions there.

### Mocking Production

You only ever want to mock the production environment when you want to see how the entire project comes together. To mock production you can use `docker-compose up --build` to build the script. Every other time you can use `docker-compose up`. To stop the container just use `ctrl+c` once. To run docker compose in the background just use the `-d` flag (detatched mode) when using `up`. To stop the container in detached mode (or after force exiting) use `docker-compose down`.
