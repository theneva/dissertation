## Discussion: The framework

__TODO: Most of this text is already covered in the Results. This chapter must instead focus on how the interview results compare and map to the data from the literature review, and draw upon the results from the implementation project.__

This chapter presents a framework for analysing different approaches to Deployment Automation. The framework is based on key factors identified through the literature review and the interviews of skilled practitioners. The perspective taken in this thesis is somewhere in between the stakeholders and the developers.

The practitioners are admittedly all from the same company, and it is possible that asking outside the company (or even interviewing other roles within the company) would have yielded different answers. However, the data from the interviews were consistent.

### Testability

Testability on at least three levels has come forth as a key _prerequisite_ for automating deployment at all. These levels include:

TODO: Are examples or illustrations of these test types needed?

#### Unit level testing

Unit testing is perhaps simplest form of testing from an automation standpoint, as their execution only require a basic runtime (such the JVM in a Java environment).

#### Independent module level testing

Independent module-level testing should test functionality internal to one service, but not across services. Thus, this form of testing requires a single-server environment, which is a fairly trivial task.

#### Feature level testing (end-to-end)

Feature level testing (also known as end-to-end testing) is the least trivial of the three testing types that came up as important. Unlike the other types of testing which are confined to a single service (application), feature level testing requires a multi-server environment with connectivity between the services.

Different services in the tests may be written using different technologies, which introduces some interesting challenges. An example stack can be:

- A core logic service written with Java (running on the Java Virtual Machine);
- A web server layer running on Node.js, which communicates with the core service;
- A web client written in plain JavaScript, running only in a browser;
- A pair of native mobile applications.

TODO: Visualise the example stack with an appropriate UML diagram

Two points of possible further interest that have not come up in the interviews can be:

- Automated feature level tests across _all_ services to ensure that the separate web apps all work together;
- Universal Design test specifications.

### Developer productivity

Developer productivity came up as a clear main concern in both (all?) interviews, siding only with test automation. This metric is difficult to measure, but two important factors are _time to market for new features_ and how much time is spent _maintaining_ the existing application instead of developing new features. This, in turn, ties into the developer's feedback loops:

1. How fast are the results of new code visible to the developer when actually developing (locally)?
2. How quickly is it possible to prototype and test a new feature?
3. How long does it take from a faulty revision is built to the developer is notified?

Another interesting metric can be how accurate time estimates the team can give on average. Consistently accurate estimates can imply low overhead, which points to a good deployment strategy as well as a consistent code base with controlled technical debt. Yet another metric can be _source lines of code (SLOC) produced per day_, although it would be very context-dependent and should be cross tabulated with other metrics.

### Ease of doing the right thing

One of the most important factors for developer productivity is a consistent code base and strategy. The interview persons agree that it is much more important to make it easy to do the right thing than it is to enforce standards strictly. Code quality is a good example: analysis software such as Checkstyle (http://checkstyle.sourceforge.net/), PMD (https://pmd.github.io/), and SonarQube (http://www.sonarqube.org/) help ensure quality on a line-by-line basis and counter unnecessary complexity and bug-prone code. They do, however, not help enforcing a general architecture, nor do they suggest refactorings.

In the deployment context specifically, it is important to make it easy to both _migrate to the new strategy_ and _implement it correctly_. This should be done by making the coupling between the service logic and the deployment strategy as loose as possible, which can be done by following Heroku's Twelve Factors (http://12factor.net/) as discussed in the Background section. Furthermore, the deployment strategy cannot impose any requirements on how the code must be written. A real example is horisontal versus vertical scaling---adding more servers versus adding more computing power to a single server---which is something the company will need to handle when the migration happens.

### Monitoring &amp; integration with existing tools

Another absolute requirement for selecting a strategy for deployment is the possibility to monitor the services, preferably through both standardised and custom dashboards. For example, a new Java application could automatically be assigned a JVM metrics dashboard, monitoring memory usage over time. Other metrics that must be measurable include physical hardware state, load, and traffic. It must also be possible to integrate the monitoring with existing tools, such as the company's self-developed application for managing deployment processes, although some alterations can be made.

### Automatic service scaling

The ability to automatically scale services (to handle different loads) does not matter to the interview persons for the production environment, but would be a great utility for the test environments which are hosted by a third party Infrastructure as a Service (IaaS) provider. Being able to scale down during downtime (such as nights) and back up when required could potentially save considerable recurring expenses.

### Stable test environments (if any)?

The importance of stable test environments was expressed by the Team Lead for Team Reise: their deployments sometimes fail because other teams' services in the testing environments are unstable, even though their own pipeline has no intentional dependency on these environments. Much trouble could be saved by avoiding dependencies on other services managed by other teams being tested and redeployed at the same time.

### Transition to new strategy

Besides having to be easy, the organisation-wide transition to the new strategy must absolutely lead to zero downtime.

### Discussion

This section considers each key area of concern for deployment automation discovered in the literature review of the Background chapter, and maps them to the findings from the interviews.

TODO: This discussion is still completely unfinished in written form, but is represented in the actual framework.

#### Twelve-Factor App

#### Cloud computing and the CAP theorem

#### Support for the organisational deployment goal: deployment frequency flexibility

#### Expressiveness and code as documentation

#### DevOps

#### Architecturally Significant Requirements

Architecturally Significant Requirements (ASRs) is a common term for the requirements a deployment strategy impose on the architecture of the actual application to be deployed [e.g., @chen:architecting-for-cd:2015]. This is a……… TODO

- A clear intersection between literature (e.g., @chen:architecting-for-cd:2015) and the interview data
  - Best practises must be followed

The issue of deployment strategies affecting the overarching architecture of a single service, however, came up explicitly during the interviews.

## Security

Security can perhaps be considered an Architecturally Significant Requirement, but is a large enough field that to be included as a separate criterion.

An important discussion that is not handled by this thesis is whether services should be directly available to the public, or behind a firewall with functionality exposed through a public API per _system_ that serves as a specification of the system itself. Request authentication is an important factor that may impact the overall performance of the system considerably, as interdependent microservices will sometimes make repeated calls to the same endpoints.

The obvious downside of building a public API to expose functionality per system is that building the API itself may take considerable time: it is yet another application to configure, develop, and maintain. Upsides of using a public API include the abilities to handle user authentication per system; short-circuit requests to failing services and provide reasonable responses; and combine requests to multiple services on the server environment, where developers have control over the computing resources, as opposed to in a client such as a web browser.

### Limitations of this study

Some aspects of "real-world" development and deployment are ignored for the sake of comparison. For example, execution performance is not evaluated to any great extent, and aspects like load balancing are only briefly discussed, not actually tested. In a business context where the system faces high load from users, this is an integral aspect of the deployment structure. However, this thesis tries to _broadly_ compare multiple strategies. Thoroughly scrutinising each aspect---each row in the Framework---should be an excellent opportunity for future research.

TODO: There are more!
