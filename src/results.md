# Results

The previous chapter presented the research design for gathering data in order to answer the research questions. This chapter presents the data found in the studies. First, the interview data provides a foundation for an initial revision of the framework. Second, based on the initial revision of the framework, the BeerFave reference implementation results present a comparison of some strategies for Continuous Delivery.

## Interviews

```include
src/components/interview-results.md
```

## Refining the framework: Design and Creation

This section presents the results of deploying the services that are developed locally on each developer's machine, and uploaded to a production server. First, a very brief overview of each Deployment Strategy is discussed. Second, each row in the Framework is mapped to some popular strategies for deployment: manual deployment, script-based automation, manual container-based deployment, and automated container-based deployment.

TODO: Script-based deployment and automated container-based deployment are missing.

### Overview of the strategies

This section provides a brief overview of each Deployment Strategy used to deploy BeerFave.

#### Manual deployment

Manual deployment of new changes can be accomplished in a myriad of ways, but all include the following steps:

1. Log onto the production server (for example with Secure SHell (SSH) or Secure File Transfer Protocol (SFTP)).
2. Download a pre-built artefact containing the newest changes (such as a Java JAR file).
3. Move the artefact to its proper location (for example inside a Java Application Server), replacing the old version.
4. (Dependent on technology) Restart services to enable new changes.

With this approach, all applications live within the same Execution Environment. In the test project, this Execution Environment was a Linux server running Ubuntu 15.10 (Wily Werewolf). Database management systems and virtual machines like the JVM are shared between services. Each Application Runtime competes equally for the system resources.

#### Script-based manual deployment

TODO

#### Manual container-based deployment

Container-based manual deployment can, like manual deployment, be accomplished in many ways. Since the BeerFave deployment is based on Docker, each image was built and pushed to the Docker Hub^[https://hub.docker.com] from the developer machine with a new version tag.

#### Automated container-based deployment

TODO

### Results by criterion

Take each row from the framework and compare. TODO: start out with only manual and container-based manual. Are they feasible for continuous deployment?

#### TODO: Criterion 1

TODO: I have a lot of results from manual- and docker-based deployment (no script-based yet), but have not had time to actually put them in the document.

### Manual deployment

Manual deployment is a time-consuming process on a single host, let alone a multitude of hosts in a load-balanced environment. It also requires the person deploying to be familiar with the operating system on the production machine.

Dependencies to pull in the changes (such as SCP) must be installed on the machine, and shared for all applications.

- One severe fault in one application takes down the machine
- One fault in the physical machine takes down the entire ecosystem
- No (simple) scaling
- Easy, requires only knowledge of Linux and the environment to install
- Fairly easy to replace a module if you know what you're doing
- Impossible to restart without downtime (without load balancers); requires more physical machines
- One process in one application can eat all resources on the machine (unless extra steps are taken to contain the resource uses, or all applications are run in a VM such as the Java VM)
- All versions of all required software/dependencies must be installed in the same namespace
- Extra users should be configured (more manual work)

### Script-based automated deployment

### Manual container deployment with Docker

### Automated container deployment with Docker and Deis

_This has not been completed yet._

## Results: Criteria by strategy

TODO: Continue this (the only place where the framework is actually used)

| Criterion | Unit | Manual | Scipt-based automation | Contained manual | Contained automated
| ------------- | ----------- | -------------- | -------------- | -------------- | -------------
| Automatic scaling | Yes / (blank) | | | | Yes
| Feature testing | Difficult | Difficult | Easy | Easy
