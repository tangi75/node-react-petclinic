## Credits
node-react-petclinic is the merge of https://github.com/arvindmorwal/node-petclinic-rest (backend) and https://github.com/arvindmorwal/react-petclinic (frontend).

A docker compose layer has been added to enable the local execution of the whole application.

## Getting started

```
docker-compose build
docker-compose up
```

This application provides CRUD operations on the backend:

- http://localhost:5000/vets
- http://localhost:5000/pets
- http://localhost:5000/visits

The UI is available at [http://localhost:8080/](http://localhost:8080/) 

## Local development

Just replicate on your development environment what is done in docker-compose.yml and */Dockerfile for the application tier you want to develop.
