# Learn Terraform - Lambda functions and API Gateway

AWS Lambda functions and API gateway are often used to create serverless
applications.

This repo is a companion repo to the [AWS Lambda functions and API gateway](https://developer.hashicorp.com/terraform/tutorials/aws/lambda-api-gateway) tutorial.

## How to run the example ?

1. Init the hello-world project.

        cd hello-world
        npm install

2. Compile the typescript code to javascript.

        npm run build

3. Init terraform.

        cd ..
        terraform init

4. Create all the infrastructure.

        terrform apply

5. Then we call the api.

        curl "$(terraform output -raw base_url)/hello?Name=Terraform"

6. Create an item in Music table

        "Artist","SongTitle","AlbumTitle","Awards"
        "Acme Band","Happy Day","Album Title","10"

        curl "$(terraform output -raw base_url)/hello?Name=Acme+Band&SongTitle=Happy+Day"

6. Don't forget to destroy everything when you finished testing.

        terrform destroy
