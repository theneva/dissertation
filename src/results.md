# Results

This section presents the results of deploying the services that are developed locally on each developer's machine, and uploaded to a production server.

## Manual deployment

### Overview

Manual deployment of new changes can be accomplished in a myriad of ways, but all include the following steps:

1. Log onto the production server (for example with Secure SHell (SSH) or Secure File Transfer Protocol (SFTP))
2. Download either
    1. newest changes to the code base and build an artefact if required, or
    2. a pre-built artefact (such as a Java JAR)
3. Move the artefact to its proper location (for exmaple inside a Java Application Server)
4. (Dependent on technology) Restart services to enable new changes.

### Results

- Deployment is a time-consuming process on a single host, let alone a multitude in a load-balanced environment
- Gives native performance

## Script-based automated deployment

## Manual container deployment with Docker

## Automated container deployment with Docker and Deis

_This has not been completed yet._
