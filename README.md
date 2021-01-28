# Cloud Security Demo

## Usage

The prerequisites for this project are `Docker` and `docker-compose`. 

### Setup

Copy the `.env.example` to `.env` in the `backend` folder.

```
$ cd backend && cp .env.example .env
```

From the project root run the following command to boot up the docker containers:

```
$ docker-compose up
```

Visit [localhost:3000](http://localhost:3000) in your browser, to visit the application and [localhost:9000](http://localhost:9000)
to visit the Cloud Storage Site.

### User Mode flow

- Register or login for a new account
- After login, you will see the file list Page, click on Upload on the right upper cornor.
- Upload a an example txt file
- The File will be splitted in 3 Parts, each part will be encrypted with aes and one Key.
- The Key will be stored in the database in the files table.
- Click on Your file, the file will be merged together, decrypted and send back to the user

### Attacker Mode flow

- [localhost:3000/backdoor](http://localhost:3000/backdoor) in your browser
- There will be a list of all parts, click on one and you will get the decrypted part as download.
