# Interviews

I have conducted two interviews at FINN.no to help ensure that the comparison framework will be relevant to the business as well as academia. These interviews provided insights into how individual teams already practise Deployment Automation and the organistaion's experiences with various attempts; the factors FINN.no deems important when selecting a strategy; and both how and why they currently attempt to standardise on a uniform model for automated deployment. This section presents the findings from the interviews, and concludes with a set of requirements for a Deployment Automation strategy in FINN.no's microservice context.

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

The architecture

- Was developed over a long time.
- Is focused around JVM (like the rest of FINN), primarily with Java and Groovy components.
- Currently primarily uses Spring MVC for views, but migrating to a front-end rendering framework like React.
- Browser testing with [GEB](http://www.gebish.org/).

## Experiences

- Continuous delivery leads to fewer mistakes.
- Definitely producing more (although it's difficult to quantify): compared with e.g. "Hytte" (cabin/summerhouse) owned by the same team, but on a different platform.
- Easy to roll back

### No test environments

- The current set-up requires the _dev_ build to be green in order to even reach _prod_, even though the team does not use test environments. Thus, unstable dependencies (other services) in the _dev_ environment can hinder a production release.
- Possible move away from test environments: if your service depends on another service, you can just pull the Docker image for that service and run it yourself.
- Use feature toggles (not even Unleash, just URL query string) to test new features in production

### Transition to containers

- Easily add or take down instances (impossible to do quickly now). Auto scaling, especially for test environments if needed (see also interview with Audun).

### Summary: key points of interest

- Completely automated continuous delivery must be possible
- Any instability in test environments should not affect whether new changes reach production
- Testability is a key concern---a requirement---for automation
    - It must be possible to provision and instrument a full e2e-test
    - It should be easy to pull in and start dependencies
    - It must be possible to automate the entire deployment process
- Automatic scaling

## Team Cloud IO (infrastructure)

Team Cloud IO is responsible for maintaining and developing the infrastructure at FINN, and plays a large part in the initiative to migrate the entire organisation to containers. Team Cloud IO loosely defined the requirements for an organisation-wide uniform Deployment Automation strategy, and carries out the work of helping teams migrate their services to containers.

### Background

At the time of writing, FINN.no consists of several hundred microservices. Their responsibilities range from providing access to user data to handling payment for placing an ad. At the time of the interview, eight physical servers each run every microservice. This allows balancing the user load equally, although some methods are used to allow stateful microservices.


- Running all services (mods) on 8 physical servers leads to overload
    - Some services scale vertically (using threads) rather than horisontally (more boxes)
    - All problems could be traced back to lack of isolation
- Moving to new infrastructure
    - Test environments hosted by IBM leads to need for automatic scaling

### Strategy choice

- Learning &amp; testing since summer 2015
- Tested Mesos + Marathon
- Kubernetes (with OpenShift)
- Cisco Mantl
- Started testing Kubernetes before Christmas
- Implementation - Hopefully in summer
    - No deadline: the only critical thing is that it's good
    - Hard requirement: zero downtime
    - Will run old &amp; Kubernetes in parallel: beta users get Kubernetes access. These clusters need to communicate somehow

### Summary: Important factors

1. Developer productivity
2. Automation REQUIRES automated testing
3. Monitoring possibilities
    - Prometheus (https://prometheus.io/)
    - Agent Bob (JVM Data, unsure about the actual name of this thing)
    - Dashboards are required (hopefully standardisble)
4. Integration with in-house deployment pipeline tool
