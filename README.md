# LodgeBox-api
LodgeBox is a file distribution and collection system for local deployment in the classroom. 

### Installation and Configuration

Clone and open the repository in the terminal:

```bash
git clone https://github.com/ian-antking/lodgebox-api.git
```

Install ```mongodb``` as a global dependancy:

### Linux
```bash
sudo apt install mongodb
```
### Mac
```bash
brew install mongodb
```

Start the ```mongodb``` service:

### Linux
```bash
sudo service mongod start
```
### Mac
```bash
brew services mongodb start
```

Start `mongodb` local server:


### Linux
```bash
sudo mongod --port 27017 --dbpath /data/db
```
### Mac
```bash
mongodb
```
Create the file path for database storage:

```bash
sudo mkdir -p /data/db
```

You may also need to give permission for ```mongob``` to access the database path

Use the package manager [npm](https://www.npmjs.com/) to install dependencies: 

```bash
npm install
```
Create ```.env``` and ```.env.test``` files in the project root. Add the following environment variables:

```
DATABASE_CONN="mongodb://127.0.0.1:27017/lodgebox-api"
TEACHER_CODE="teacherCode"
JWT_SECRET="jwtSecret"
```
**Make sure the ```TEACHER_CODE``` and ```JWT_SECRET``` are different in ```.env```**
