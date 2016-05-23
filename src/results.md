# Results

The previous chapter presented the research design for gathering data in order to answer the research questions. This chapter presents the data found in the studies. First, the interview data provides a foundation for an initial revision of the framework. Second, based on the initial revision of the framework, the BeerFave reference implementation results present a comparison of some strategies for Continuous Delivery.

## Interviews

```include
src/components/interview-results.md
```

## Refining the framework: Design and Creation

This subchapter presents the results of deploying the services that are being developed locally on each developer's computer, and uploaded to a production server. Each service is assumed to comply with the Twelve-Factor App guidelines. Experiences are presented for each of the following deployment strategies: manual, scripted automation, and automated container-based deployment. The services were developed on a MacBook Pro running Mac OSX 10.10, and the execution environment used for testing was a Linux server running Ubuntu 15.10.

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

Scripted automated deployment implies programming scripts to automate repetitive manual processes. The benefit of automating the deployment process is twofold: first, it allows developers to focus on features; second, it reduces the risk of human errors. There is a vast number of tools existing tools to help automate service deployment, and range from simply uploading a service to the production environment to parsing and installing third party dependencies [@spinellis:by-hand:2012].

The BeerFave system was automated using the open source Continuous Integration server Jenkins^[https://jenkins.io/]. Whenever a new commit was uploaded to the revision control system, an HTTP request was sent to notify Jenkins about changes. Jenkins would download the changes from the revision control system, install dependencies, build the system, and run the automated tests.

If the test suite passed, Jenkins triggered a shell script that uploaded the artefact to a predefined location on the production server using SCP. It then sent an HTTP request to the production server, notifying it that a new build was available for activation. Finally, this HTTP request was received by an HTTP server on the production server, which triggered yet another shell script that activated the new changes.

TODO: Does this deserve a figure?

This automation only handles _upgrading_ services, however: the environmental dependencies such as the JRE must still be installed on the hosts prior to the deployment. These results assume that the environment has already been configured, as these factors were considered with manual deployment. However, installation of runtimes and build tools on the build server is a new factor.

#### Independent service

Configuring an independent service for deployment required two actions. First, Node.js was installed on the build server, a Jenkins job was configured, and a notification trigger set up. The job configuration instructed Jenkins on how to install the service's dependencies, build and test the service, and finally archive and upload the service to the production service and trigger installation. Second, a shell script was written on the production server to listen for HTTP requests from Jenkins and activating the new service.

#### Same-language services

Configuration services written in the same language, and thus running on the same platform, required installing the platform once on the build server. A job was configured, and a notification trigger was set up for each service. The script running on the production server was expanded to accept this new job.

#### Same platform, different language

The build process in its entirety was completed by the build server. While no new platforms were required on the production host, the Java Development Kit had to be installed on the build server. Beyond that installation, a job configuration and a notification trigger were all that was required, as the service activation script was capable of accepting and starting Java Archives.

#### Static web application

The static web application was configured as a job that built, tested, and uploaded the archive to the production server directly using SCP. The static nature of the web application avoided a dependency on the service activation script.

#### Different database systems

These were configured in the same way as for manual deployment.

TODO: Remove the following section?

### Automated container-based deployment

Container-based manual deployment can, like manual deployment, be accomplished in many ways. Since the BeerFave deployment is based on Docker, each image was built and pushed to the Docker Hub^[https://hub.docker.com] from the developer machine with a new version tag.

#### Same-language services

#### Same platform, different language

#### Different runtime

#### Static web application

#### Different database systems

### Limitations

TODO: Move this somewhere else

Did not look into performance: that is largely in the domain of microservices. It is worth noting that running multiple self-contained services in their separate runtimes naturally expends more computing resources than executing them in a shared runtime. However, that approach limits many of the benefits that come from running autonomous services (as described by The Twelve-Factor App). Furthermore, the context this study is heavy server laod and hundreds of microservices. Thus, a powerful execution environment is required to run the system. For this reason, performance is outside the scope of this study. It is up to the user of the framework to consider this characteristic.

that another deployment strategy, building images for virtual machines, 
