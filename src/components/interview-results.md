As mentioned in the __Method__ chapter, FINN.no is Norway's leading actor in the online classified ads market. This puts them in a position where they have requirements that come with large scale, making them an interesting company to study: their requirements can possibly be generalised to other large-scale companies, something that cannot be accomplished by carrying out a small implementation project alone. FINN.no is also an early adopter of the microservice pattern in their software architecture.

The goal of the interviews was to shed light on their requirements for a Deployment Strategy, in particular to see how, if at all, these requirements differ from those discussed in the literature review. In particular, the following two teams were of interest: Team Cloud IO develops and maintains the infrastructure at FINN.no, and is behind the company-wide initiative to migrate to an infrastructure with exclusively container-based automated deployment; Team Reise is a team that has maintained a focus on automating all processes related to building, testing, and deploying their software. The leader of each team was interviewed.

As there are only two sources, the data is presented by themes that emerged from the interviews. The sources are only distinguished when this matters to the context.

### Motivation for migrating to a uniform deployment strategy

At the time of writing, FINN.no consists of several hundred microservices. Their responsibilities range from providing access to user data to handling payment for placing an ad. At the time of the interview, eight physical servers each run every microservice. This allows balancing the user load equally, although some methods are used to allow stateful microservices.

However, FINN.no has encountered some performance issues related to multiple concerns. They experience high server load during the day, and a low number of requests during the night. This non-uniform load distribution means that the physical servers, which always provide the same capacity, are overloaded during peak hours. This pattern is problematic for the following two reasons.

First, all of the services currently run without any isolation, so they always compete for the same computing resources. Isolation would allow restricting the processing power available to any given service on demand. Many of the performance problems the FINN.no platform is currently encountering can be traced back to a lack of service isolation. This is a key factor in the selection of a new deployment strategy. Lack of service isolation also requires dynamic allocation of computing resources, as some services scale vertically (using threads, and thus requiring more resources on a single machine), while other services scale horisontally (allowing load balancing through multiple deployments).

Second, the non-uniform load distribution means that the physical servers are sometimes providing much more computing power than they need, especially during the night, but other times are able to provide too little. This is a somewhat important concern in the production environment, but much more so in the testing environment. As a result, FINN.no's test environments are being moved to an Infrastructure as a Service (IaaS) platform. Thus, a need for automatic scaling to reduce unnecessary expenses becomes apparent. This is another factor the team had to consider when selecting a Deployment Strategy.

### Experiences with Automated Continuous Delivery

Team Reise sees ACD as a highly favourable factor in their everyday development. In particular, they have experienced that Continuous Delivery leads to fewer mistakes that are time-consuming to correct. Directly related to the very frequent release cycle, they have found it much easier to isolate and roll back whenever a mistake does make it into the code base.

In addition to the travel marketplace, Team Reise is also responsible for the services related to cabins and summerhouses that they inherited from another team. The deployment processes related to this project are not automated, so this service resembles most other services in the entire system that is FINN.no. Although productivity is difficult to quantify, the Reise marketplace can be directly compared to the cabin and summerhouse project. The team is certain that they produce more and better features with the Reise marketplace's automated approach to deployment.

### Code reviews and Automated Continuous Delivery

Team Reise has no manual processes between pushing new code and deployment, and relies instead entirely on automated tests. It follows the "boy scout rule" (which states to always leave the campground cleaner than you found it^[http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule]) for minor refactoring work, and undertake major refactoring initiatives when someone takes an initiative to do so. The team experiences that developers actually do perform minor refactorings in their daily work.

The team practises "live" code reviews every Friday, where significant changes to the code base such as new major features and architectural decisions are presented to the rest of the team. These meetings are used mainly to share knowledge, as there is no formal code review process prior to pushing changes into the production environment.

### The importance of automated testing

Both teams agree that automated testing is absolutely crucial when there is no manual verification step. Team Reise is currently maintaining and executing the following three different automated test types on every check-in, before deployment.

The first class of tests is Unit Tests that test _all_ functionality of the system in a very isolated fashion. In these tests, everything that is not part of the actual unit (e.g., class or method) under test is mocked with controlled values. Team Reise does not consider these tests a quality assurance, but an essential tool for refactoring the code base. Unit tests only require a basic runtime for the programming language without runtime dependencies, as they scrutinise individual classes and methods. Thus, they are usually executed very quickly.

The second class is Module Tests, in which the module (i.e., microservice or client) under test is started and its internal functionality is tested across different units. All external dependencies, such as other microservices, are mocked with controlled values. These tests detect internal mistakes in the module, and help discovering mistakes in the module's code. These tests require a server runtime with the module's dependencies: for all intents and purposes, the module is "started", but running by itself in an isolated environment.

The final test class is Feature Tests, also commonly known as end-to-end tests. In these tests, the modules are started and tested together. Third party dependencies, such as providers of airline flight information, are mocked. Feature tests uncover problems in the configuration of each module's dependencies, and verify the content and encoding of data transmitted between the modules. These tests require a production-like runtime with communication between modules.

Especially in a culture with no formal code review before code is deployed, Team Reise find great value in maintaining and running these tests prior to each deployment. The team practises a form of Test-Driven Development^[http://martinfowler.com/bliki/TestDrivenDevelopment.html], meaning that any new code must be accompanied by a sensible suite of unit tests. They require all three classes of automated tests to be supported by their deployment strategy.

### Testing environments and the transition to containers

TODO: Explain the environments and be consistent.

FINN.no has three main Environments: __dev__, __ci__, and __prod__. The current set-up requires each build and deployment for __dev__ and __ci__ to pass in order for new changes to reach the __prod__ environments, even though Team Reise does not use test environments at all. Thus, other unstable services in the __dev__ or __ci__ environments may cause delayed release of enhancements to the Team Reise platform, even if the new code itself is without mistakes.

Team Reise uses URL-based _feature toggles_ to deploy all new features to the production Environment, an approach they are happy with.

FINN.no's Team Reise team has an interesting take on deployment: unlike all other teams, they have _no_ manual verification step in the deployment process, and they do not use the test environments (dev/CI).

1. Check-in (with git, triggers Bamboo build)
2. Pipeline is notified by Git server (or polls), and triggers the build process
3. Bamboo builds, tests, and uploads the artefact(s) to a central repository, typically Nexus
4. Bamboo notifies (in-house) Pipeline that the artefact is complete and ready for deployment
5. Pipeline deploys the artefact(s) directly to production environment
6. Pipeline also deploys to test environments, but only for other services' sake---they are never used by the team.

TODO: WTF? generalise this process and illustrate it (as it is to some extent used by all teams in FINN.no).

### Strategy choice

The Cloud IO team has been exploring options for deployment since the summer of 2015, testing various deployment solutions such as Mesos and Marathon, Kubernetes with OpenShift, and Cisco Mantl. They eventually committed to Docker with Kubernetes. They have no strict deadline for implementing the new strategy---the existing set-up works---so the key objective is that the new strategy adds as much value as possible to the platform. They hope to finish the implementation of the new Deployment Strategy during summer 2016, but maintain focus on added value.

TODO: dashes don't work from here

One interesting hard requirement is that there can be no system downtime during the migration to the new strategy; they will run the old set-up and the new Kubernetes platform in parallel, and redirect their beta users to the Kubernetes cluster. This means that the "old" and "new" clusters must be able to communicate, which was _not_ seen mentioned as a requirement in the literature review.

### Thoughts on the transition to containers

Team Reise is looking forward to using containers, as they have an unmet requirement to easily and quickly create or stop instances of their services to satisfy the server load. A natural extension of this possibility that the team is eager to look into is automatic service scaling, especially for the test environment---as the test environment will be hosted by a cloud provider---and FINN.no thus pays for the resources they use. This is unnecessary, especially since development and testing almost exclusively happens during the Norwegian daytime. When each service is contained as a Docker image, the team wishes to be able to pull the contained image and run their own copy of it during testing, thus removing the dependency on any potentially unstable environments mirroring production.

The dependency on a live environment could perhaps be a small concern. However, the testing environments, especially the one intended for frequent test deployment of the microservices themselves, are erratic and inconsistent, making them unreliable for the developers. This problem has been apparent for the last several months, and is a barrier to overcome when implementing Automated Continuous Delivery.

### Summary: Important factors

TODO: What does "important" mean in this heading?

TODO: This is confusing, sort it out. When is who saying what?

Team Reise has embraced their model for Continuous Delivery, and requires that any new Deployment Strategy _must_ support complete automation of the deployment process. They also consider testability to be a _requirement_ for automation, meaning that any Deployment Strategy must facilitate easy testing: it must be possible to provision and instrument a full end-to-end test by pulling in and starting dependencies in an isolated environment. The team strongly wishes to avoid the current problem of the testing environments breaking their build due to failing dependencies.

Finally, the team points to a need for automatic scaling, although they do not consider it a _requirement_ for the new Deployment Strategy.

The number one factor for selecting a Deployment Strategy is that it must increase developer productivity. FINN.no exclusively develops their own in-house solution, and this may not be a requirement seen in another context, such as consulting. However, developer productivity is proportional to FINN.no's value to the end users, and thus revenue.

The team recognises that automation requires automated testing, and enforces a strict requirement that the Deployment Strategy facilitates various types of automated testing, including unit tests and integration tests. It would be interesting to see how Docker is utilised in this regard, as Docker seems to allow setting up a "private" test environment, which was also mentioned in the interview with Reise.

Finally, the new Deployment Strategy _must_ allow for monitoring with tools such as Prometheus (https://prometheus.io), Agent Bob (JVM data, unsure about the actual name of this thing), and hopefully standardisable dashboards using tools such as Grafana and Graphite. There is also a requirement that the new system can be integrated with Pipeline, although this tool can be tweaked to meet the requirements of the Deployment Strategy.

TODO: ditch this list of names (no point to it), and add in the Adobe Analytics thing.
