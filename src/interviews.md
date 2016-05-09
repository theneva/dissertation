# Interviews

Two interviews were conducted at FINN.no to help ensure that the comparison framework will be relevant to the business as well as academia. These interviews provided insights into how individual teams already practise Deployment Automation and the organistaion's experiences with various attempts; the factors FINN.no deems important when selecting a strategy; and both how and why they currently attempt to standardise on a uniform model for automated deployment. This section presents the findings from the interviews, and concludes with a set of requirements for a Deployment Automation strategy in FINN.no's microservice context.

## Team Reise

FINN's Team Reise (travel) has an interesting take on deployment: unlike all other teams, they have no manual verification step in the deployment process, and they do not use the test environments (dev/CI).

1. Check-in (with git, triggers Bamboo build)
2. Pipeline is notified by Git server (or polls), and triggers the build process
3. Bamboo builds, tests, and uploads the artefact(s) to a central repository, typically Nexus
4. Bamboo notifies (in-house) Pipeline that the artefact is complete and ready for deployment
5. Pipeline deploys the artefact(s) directly to production environment
6. Pipeline also deploys to test environments, but only for other services' sake---they are never used by the team.

TODO: generalise this process and illustrate it (as it is to some extent used by all teams in FINN).

### The team &amp; code quality

Initially formed to rewrite the existing platform for travel, the 16-man team split into four autonomous teams. Each team must be able to take ownership of any task related to the travel vertical with any 3/4 team members present. The teams only share the common task backlog: when an employee begins a task, it is their team's responsibility that the task is completed.

The teams have no manual processes between pushing new code and deployment, but instead rely entirely on automated tests. They follow the "boy scout rule" (which states to always leave the campground cleaner than you found it http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule) for minor refactoring work, and undertake major refactoring initiatives when deemed necessary.

The full team practises "live" code reviews every Friday, where significant changes to the code base such as new (major) features and architectural decisions are presented to the rest of the team. These meetings are used mainly to share knowledge, as there is no formal code review process.

- Team size: Started out as 16 (now 10) developers split into 4 (now 2) autonomous teams (each team must be able to solve all problems, even with any one person missing)
- "Live" code reviews every Friday for significant changes to the code base (e.g., large new features): used mainly to share knowledge
- Test-driven development (or at least, test everything before check-in): make it easy to do the right thing
- No pull requests (or even branches) for code review. Small refactorings happen after the fact: boyscout principle. Developers actually do refactor.
- Major refactorings are prioritised and undertaken every now and then, on someone's initiative.

### Code quality & testing

Automated testing becomes incredibly important when there is no manual verification step. All tests are run on each check-in before deployment. The entire test suite takes 30 minutes, or 8–9 minutes with incremental build (using Gradle). The team uses three different "classes" of tests:

- Unit tests: tests _all_ functionality in an isolated fashion, mocking everything unrelated to the logic of the unit (method or class); mainly a tool for ensuring that nothing was broken when refactoring
- "Module tests": tests functionality across units internal to the module. Includes "web" and "server", but could easily include further modules.
- Feature tests (also known as "end-to-end" tests): mocks 3rd party dependencies like airline providers (specific to Team reise) and Solr

There is no hard requirement on code coverage percentage, but using TDD (or at least testing all units) enforces high unit test coverage.

The architecture:

- Was developed over a long time.
- Is focused around JVM (like the rest of FINN), primarily with Java and Groovy components.
- Currently primarily uses Spring MVC for views, but migrating to a front-end rendering framework like React.
- Browser testing with [GEB](http://www.gebish.org/).

### Experiences

- Continuous delivery leads to fewer mistakes.
- Definitely producing more (although it's difficult to quantify): compared with e.g. "Hytte" (cabin/summerhouse) owned by the same team, but on a different platform.
- Easy to roll back

### No test environments

FINN has three main Environments: __dev__, __ci__, and __prod__. The current set-up requires each build and deployment for __dev__ and __ci__ to pass in order for new changes to reach the __prod__ environments, even though the Reise team does not use test environments at all. Thus, other unstable services in the __dev__ or __ci__ environments may cause delayed release of enhancements to the Reise platform, even though the code itself is fine.

Reise uses URL-based _feature toggles_ to deploy all new features to the production Environment, an approach they are happy with. When each service is contained as a Docker image, the team wishes to be able to pull the image and run their own copy of it during testing, thus removing the dependency on a notoriously unstable environment.

### Transition to containers

The team is looking forward to using containers, as they have an unmet requirement to easily and quickly create or stop instances of their services to cater for load. A natural extension of this possibility that the team is eager to look into is automatic service scaling, especially for the test environment---as the test environment will be hosted by a cloud provider, and FINN thus pays for the resources they use. This is unnecessary, especially since development and testing almost exclusively happens during the Norwegian daytime.

### Summary: key points of interest

The Reise team has embraced their model for Continuous Delivery, and requires that any new Deployment Strategy _must_ support complete automation of the deployment process. They also consider testability to be a _requirement_ for automation, meaning that any Deployment Strategy must facilitate easy testing: it must be possible to provision and instrument a full end-to-end test by pulling in and starting dependencies in an isoalted environment. The team strongly wishes to avoid the current problem of the testing environments breaking their build due to failing dependencies.

Finally, the team points to a need for automatic scaling, although they do not consider it a _requirement_ for the new Deployment Strategy.

## Team Cloud IO (infrastructure)

Team Cloud IO is responsible for maintaining and developing the infrastructure at FINN, and plays a large part in the initiative to migrate the entire organisation to containers. Team Cloud IO loosely defined the requirements for an organisation-wide uniform Deployment Automation strategy, and carries out the work of helping teams migrate their services to containers.

### Background

At the time of writing, FINN.no consists of several hundred microservices. Their responsibilities range from providing access to user data to handling payment for placing an ad. At the time of the interview, eight physical servers each run every microservice. This allows balancing the user load equally, although some methods are used to allow stateful microservices.

All performance problems the FINN platform has encountered can be traced back to a lack of service isolation. This is an interesting challenge, as some services scale vertically (using threads, and thus requiring more resources on a single machine), while other services scale horisontally (allowing load balancing through multiple deployments).

As the platform's test environments move to a cloud solution, a need for automatic scaling to reduce unnecessary expenses becomes apparent. This is another factor the team had to consider when selecting a Deployment Strategy.

### Strategy choice

The team has been learning since the summer of 2015, testing various deployment solutions such as Mesos and Marathon, Kubernetes with OpenShift, and Cisco Mantl. They eventually committed to Docker with Kubernetes. They have no strict deadline for implementing the new strategy---the existing set-up works---so the key objective is that the new strategy adds as much value as possible to the platform. They hope to finish the implementation of the new Deployment Strategy during summer 2016, but maintain focus on added value.

One interesting hard requirement is that there can be no system downtime during the migration to the new strategy; they will run the old set-up and the new Kubernetes platform in parallel, and redirect their beta users to the Kubernetes cluster. This means that the "old" and "new" clusters must be able to communicate, which was _not_ seen mentioned as a requirement in the literature review.

### Summary: Important factors

The number one factor for selecting a Deployemnt Strategy is that it must increase developer productivity. FINN exclusively develops their own in-house solution, and this may not be a requirement seen in another context, such as consulting. However, developer productivity maps perfectly to FINN's value, and thus revenue.

The team recognises that automation requires automated testing, and enforces a strict requirement that the Deployment Strategy facilitates various types of automated testing, including unit tests and integration tests. It would be interesting to see how Docker is utilised in this regard, as Docker seems to allow setting up a "private" test environment, which was also mentioned in the interview with Reise.

Finally, the new Deployment Strategy _must_ allow for monitoring with tools such as Prometheus (https://prometheus.io), Agent Bob (JVM data, unsure about the actual name of this thing), and hopefully standardisable dashboards using tools such as Grafana and Graphite. There is also a requirement that the new system can be integrated with FINN's in-house deployment pipeline tool, although this tool can be tweaked to meet the requirements of the Deployment Strategy.
