# Results

The previous chapter presented the research design for gathering data in order to answer the research questions. This chapter presents the data found in the studies. First, the interview data provides a foundation for an initial revision of the framework. Second, based on the initial revision of the framework, the BeerFave reference implementation results present a comparison of some strategies for Continuous Delivery.

## Interviews

```include
src/components/interview-results.md
```

## Refining the framework: Design and Creation

This subchapter presents the results of deploying the services that are being developed locally on each developer's computer, and uploaded to a production server. Each service is assumed to comply with the Twelve-Factor App guidelines. Experiences are presented for each of the following deployment strategies: manual, scripted automation, manual container-based, and automated container-based deployment. The services were developed on a MacBook Pro running Mac OSX 10.10, and the execution environment used for testing was a Linux server running Ubuntu 15.10.

The Linux server had the proper load balancer and HTTP server _nginx_ installed and configured to simply proxy to the internal IP addresses of each service. This configuration is required in each production environment regardless of strategy, and is thus not part of the scope in this study.

The experiences with each strategy are described in terms of the technical requirements defined in the Method chapter:

```include
src/components/beerfave-technical-requirements.md
```

### Manual deployment

Manual deployment as a strategy requires the deployer to build and package the artefact on their local machine, and perform any actions necessary to activate the most recent version of the service for the end users. Manual deployment can be implemented in a myriad of ways, but they can all be generalised to the following set of actions that must be repeated once per host in the cluster per Environment (e.g., testing and production).

1. Access the production server;
2. Install a pre-built artefact containing the entire service with the newest changes (such as a Java JAR file).
3. Replace the old version of the service; and
4. Perform any actions required to activate the newest changes, for example by reloading the web server configuration.

In order to deploy a service, the developer must have been granted access to the production environment operating system. It requires the developer deploying a service to be familiar with the operating system, which may require internal training.

Manual deployment is characterised by zero configuration code, because the deployment process is not expressed in code, but instead completed in full by the developers themselves. This does not, however, remove the overhead of expressing the process: in a reasonably large company, the deployment process must be standardised, and thus documented. Any modifications to the production environment must be reflected in this documentation. In contrast, a fully manual approach to deployment inherently requires the highest number of distinct manual steps to perform a single deployment. Thus, the manual approach is more prone to human error than automation-based strategies.

#### Independent service {#manual-independent}

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

#### Other

TODO: Move this to the discussion?

A completely manual approach to deployment requires the developers to understand the deployment process and the Linux operating system, but does not introduce further layers of complexity. These concepts can also be considered fundamental to working a DevOps environment. Given a uniform infrastructure supporting all services, the retention is very high, and the deployment process is the same for each service.

Due to the high number of manual steps to deploy a single service, manual deployment is a time-consuming process for the developer on a single host, let alone a multitude of hosts in a cluster environment. Deploying a service written in a compiled language requires seven manual steps. Deploying the same version of the service to each subsequent host requires repeating the last four steps. In the realistic case of deploying this service to two different Environments, each running on a cluster of four hosts, the last four steps would be repeated eight times per successful deployment, resulting in a grand total of 35 manual steps per deployment.

In this approach, all applications run within the same execution environment. They have access to all resources in the host operating system limited only by the execution environment (e.g., the privileges of the Linux user that owns the process) and any access limitations imposed by the service itself, such as the Java Virtual Machine. Each Application Runtime competes equally for system resources unless further manually configured measures are taken. In other words, a long-running process in one service may cause a significant slowdown of other services.

In addition to competing for resources, each application in the execution environment is vulnerable to errors in the other services. A fatal error in any one service running in the same environment runs the risk of shutting other services down entirely.

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

### Results by strategy

This subsection presents experiences from and reflections on each deployment strategy.

_This has not been completed yet._

TODO: I have a lot of results from manual- and docker-based deployment (no script-based yet), but have not had time to actually put them in the document.

### Manual deployment


### Script-based automated deployment

TODO...

### Manual container deployment with Docker

TODO...

### Automated container deployment with Docker and Deis

TODO...

### Limitations

TODO: Move this somewhere else

Did not look into performance: that is largely in the domain of microservices. It is worth noting that running multiple self-contained services in their separate runtimes naturally expends more computing resources than executing them in a shared runtime. However, that approach limits many of the benefits that come from running autonomous services (as described by The Twelve-Factor App). Furthermore, the context this study is heavy server laod and hundreds of microservices. Thus, a powerful execution environment is required to run the system. For this reason, performance is outside the scope of this study. It is up to the user of the framework to consider this characteristic.

that another deployment strategy, building images for virtual machines, 
