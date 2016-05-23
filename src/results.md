# Results

The previous chapter presented the research design for gathering data in order to answer the research questions. This chapter presents the data found in the studies. First, the interview data provides a foundation for an initial revision of the framework. Second, based on the initial revision of the framework, the BeerFave reference implementation results present a comparison of some strategies for Continuous Delivery.

## Interviews

```include
src/components/interview-results.md
```

## Refining the framework: Design and Creation

This subchapter presents the results of deploying the services that are being developed locally on each developer's computer, and uploaded to a production server. Each service is assumed to comply with the Twelve-Factor App guidelines. Experiences are presented for each of the following deployment strategies: manual, scripted automation, manual container-based, and automated container-based deployment. The services were developed on a MacBook Pro running Mac OSX 10.10, and the execution environment used for testing was a Linux server running Ubuntu 15.10.

The Linux server had the proper load balancer and HTTP server _nginx_ installed and configured to simply proxy to the internal IP addresses of each service. This configuration is required in each production environment regardless of strategy, and is not part of the scope in this study.

The experiences from deploying with each strategy are described in terms of the technical requirements defined in the Method chapter:

```include
src/components/beerfave-technical-requirements.md
```

### Manual deployment

Manual deployment as a strategy requires the deployer to build and package the artefact on their local machine, and perform any actions necessary to activate the most recent version of the service for the end users. Manual deployment can be implemented in a myriad of ways, but they can all be generalised to the following set of actions that must be repeated once per host in the cluster per Environment (e.g., testing and production).

1. Access the production server;
2. Install a pre-built artefact containing the entire service with the newest changes (such as a Java JAR file).
3. Replace the old version of the service; and
4. Perform any actions required to activate the newest changes, for example by reloading the web server configuration.

#### Independent service

BeerFave's API Gateway was written in JavaScript and executed on Node.js. Installing and running an independent service required installing the latest Long-Term Service (LTS) version of the service's runtime. Installing this runtime is quite simple with the Ubuntu package manager `APT`^[https://help.ubuntu.com/community/AptGet/Howto]. Dependencies were included to ensure Dev/prod parity. After logging into the server, the application code was extracted. The application was executed using the Node command line tool.

Deploying the API Gateway required repeating the following six steps. Notably, Node.js interprets the JavaScript source code, and does not require a compilation step.

1. Running all tests on the development machine;
2. Archiving the code and its dependencies on the development machines;
3. Uploading the archive using Secure Copy (SCP);
4. Logging onto the production server using Secure Shell (SSH);
5. Extracting the archive; and
6. Locating and stopping the running process, and starting the new code.

#### Same-language services

The BeerFave system comprised two services written in Clojure. Clojure is compiled to Java Bytecode, and runs on the Java Virtual Machine. The first deployment of a Clojure service required installing the latest version of the Java Runtime Environment (JRE). However, the single JRE installation could then be applied to each subsequent JVM-based application.

Each deployment required repeating the same steps as the API gateway, with an additional step to compile the source code to Java Bytecode using the build tool. The compiled code was archived as a Java Archive (JAR) file.

#### Same platform, different language

The latest JRE was already installed on the production server from installing the Clojure applications, so there were no server-side prerequisites for deploying the Java application. The steps required to compile were the same as for the Clojure applications.

#### Static web application

Given that the HTTP server nginx was already installed and configured, deploying the static web application is an extremely simple task. After building the required static HTML, CSS, and JavaScript assets, and running tests locally, the only required manual step was uploading the code. This is in practise a script-based automation of the deployment process.

#### Different database systems

BeerFave required two database systems: CockroachDB and PostgreSQL. This required installing and running these database servers on different ports. Interestingly, CockroachDB provides a public Docker container image instead of a installing the database system onto the host. In a system where Docker is already installed, this approach may be preferable to a local installation, leading to a combination of locally installed and contained backing services.

### Scripted automated deployment

#### Same-language services

#### Same platform, different language

#### Different runtime

#### Static web application

#### Different database systems
TODO

### Manual container-based deployment

Container-based manual deployment can, like manual deployment, be accomplished in many ways. Since the BeerFave deployment is based on Docker, each image was built and pushed to the Docker Hub^[https://hub.docker.com] from the developer machine with a new version tag.

#### Same-language services

#### Same platform, different language

#### Different runtime

#### Static web application

#### Different database systems

### Automated container-based deployment

#### Same-language services

#### Same platform, different language

#### Different runtime

#### Static web application

#### Different database systems

### Limitations

TODO: Move this somewhere else

Did not look into performance: that is largely in the domain of microservices. It is worth noting that running multiple self-contained services in their separate runtimes naturally expends more computing resources than executing them in a shared runtime. However, that approach limits many of the benefits that come from running autonomous services (as described by The Twelve-Factor App). Furthermore, the context this study is heavy server laod and hundreds of microservices. Thus, a powerful execution environment is required to run the system. For this reason, performance is outside the scope of this study. It is up to the user of the framework to consider this characteristic.

that another deployment strategy, building images for virtual machines, 
