# Background and existing literature

In order to establish which concepts are important to cover and uncover a gap to fill, this section reviews the current literature on some related areas. In broad strokes, two key areas are considered:

- Cloud architecture, the availability of and need for automatic performance scaling, and its effect on software architecture---in particular the __microservice architectural pattern__; and
- __(Continuous) delivery__ and automated deployment, focusing on the technical and organisational aspects of this process.

The overarching goal of this thesis is to provide a framework for comparing approaches to tying these fields together in a real-world context. Continuous Delivery impose some organisational and cultural requirements as well as technical: separate teams _developing_ and _managing_ a service will necessarily lead to some coordination-related overhead, which hinders true _continuous_ delivery of new features. Thus, this chapter also touches the concept of DevOps (from "development" and "operations").

This section introduces the architectural pattern referred to as "microservices", before discussing some deployment strategies and issues related to this. This section also touches upon the concept of code as executable knowledge. Finally, it ends with a discussion on different metrics for measuring the quality of a deployment pipeline for different purposes.

## Cloud computing &amp; microservices

@talwar:comparison-of-approaches-to-service-deployment:2005 broadly define a service as:

> […] a standalone software component that encapsulates and presents useful functionality, is installed in a computing environment, and can be composed into an overall system or application. --- @talwar:comparison-of-approaches-to-service-deployment:2005 [p. 1]

In other words, a service is a specialised, autonomous piece of software that can be interacted with through the network using an interface such as Representational State Transfer (REST) or Remote Procedure Calls (RPC). A software _system_ is composed of one or more _services_. The _system_ will often comprise one service that provides a visual representation of data---for example a website service---that integrates with the other components---services---in the system. Thus, the _system_ is an abstract idea that only exists in documentation, while the _services_ are the concrete software implementations of the various elements of the specification.

The idea of splitting a large application's code base into multiple services is often referred to as the Service-Oriented Architecture (SOA) (e.g., [@castro:evaluating:2015; @arnold:pattern-based-soa:2007]). The microservice pattern can be seen as a way to implement SOA by defining each service as a stand-alone application that can be run, developed, and deployed independently of the other services ([@castro:evaluating:2015, p. 585]).

For instance, an e-commerce site, such as the extremely popular Amazon[^amazon], may implement their application using the microservice architectural pattern in the following way:

[^amazon]: https://amazon.com

- One service managing registered users;
- One service keeping track of inventory;
- One service generating user-targeted recommendations; and
- One service dealing with orders.

TODO: Visualise this stack?

This would yield a system that allows work in individual teams, and tailoring the technology stacks to each service's requirements. Indeed, the microservice pattern places no restrictions on technology choices such as language and framework for each service: the only hard requirement is that each service must expose an interface through which it is possible to communicate with the service. For example, one may build a REpresentational State Transfer (REST) interface on top of the HyperText Transfer Protocol (HTTP), or a Remote Procedure Call (RPC) interface built directly on the Transmission Control Protocol (TCP). It is, then, possible to build hundreds of services, each in a different programming language, However, this can place a heavy burden on the infrastructure if the services are not properly contained and may not be _feasible_ ([@newman:building-microservices:2015, loc. 200]).

Somewhat related to the microservice pattern, the system's user interface application (for example a web application) may consist of multiple web applications abstracted to look like a single application by a load balancer or proxy. These can be navigated without making the user aware that s/he is switching between applications, given a uniform look and feel.

The microservice-style architecture is an increasingly popular alternative to the traditional _monolithic_ architectural style. In this context, a monolithic application (or a _monolith_) refers to a large application where the entire system consists of a single code base executed within a single runtime (such as Java's Java Virtual Machine (JVM) and .NET's Common Language Runtime (CLR)).

To finish this subsection, @chen:architecting-for-cd:2015 introduces the concept of Architecturally Significant Requirements, referring to the architectural requirements imposed upon the service itself by the deployment strategy. To support this, the popular Platform as a Service (PaaS) provider [Heroku](https://heroku.com) has defined a document it calls __The Twelve-Factor App__[^12factor] , a set of twelve requirements that should be met by each service to enable simple deployment in a cloud environment. These requirements concern every layer of the application, including (but not limited to) code base structure, dependency declaration, testing environments, and logging. This idea will be considered in more detail in the final subsection.

@castro:evaluating:2015 [p. 590] conclude that there are several benefits to being able to publish a system as a set of smaller services that can be managed independently. Specifically, they point to independent development, deployment, scaling, operation, and monitoring as a key enabler for companies to manage large applications with a more practical methodology, and scale individual development teams more easily.

They also point to the cost of this gained agility and granular scalability: microservices are by definition parts of a distributed system, which introduces a whole new class of concerns. The "fallacies of distributed computing", originally asserted by Peter Deutsch and others at Sun Microsystems (creator of the Java programming language), is a popular set of assumptions developers make when they are new to distributed computing[^fallacies-of-distributed-computing-explained]:

1. The network is reliable.
2. Latency is zero,
3. Bandwidth is infinite.
4. The network is secure.
5. Topology doesn't change.
6. There is one administrator.
7. Transport cost is zero.
8. The network is homogeneous.

[^fallacies-of-distributed-computing-explained]: Arnon Rotem-Gal-Oz's whitepaper "Fallacies of Distributed Computing Explained", available at https://pages.cs.wisc.edu/~zuyu/files/fallacies.pdf.

These assertions will definitely need to be taken into consideration in the comparison of various approaches.

As future work in the microservices with regard to deployment, @castro:evaluating:2015 suggest the following:

> The process to automate the deployment of microservices and gateways using different strategies, tools and/or managed cloud services (such as Docker, Amazon EC2 Container Service, and AWS Lambda) will be evaluated. --- @castro:evaluating:2015 [p. 590]

This points to a need for a dive into the various tools that exist---but first, various strategies must be considered.

## Deployment strategies

@wahaballa:unified:2015 [p. 211] define software deployment as "all of the activities that make a software system available for use.". Following this definition, deployment is something every single provider of an online service must handle in some way. Deployment strategies can range from being extremely passive---for example by logging onto a server and manually editing some PHP code running in production---to comprehensive code review processes followed by running a pre-built artefact through several layers of automated tests, multiple test environments for manual quality assurance involving layers of bureaucracy, and finally deploying the new changes functions to a controlled subset of the production servers (known as blue/green deployment[^blue-green-deployment]) and a fraction of the end users of the service (known as canary release[^canary-release]).

[^blue-green-deployment]: http://martinfowler.com/bliki/BlueGreenDeployment.html
[^canary-release]: http://martinfowler.com/bliki/CanaryRelease.html

Naturally, the quickest way of deploying new features to the end users is directly modify the code running in the production environment. However, this is a risky approach: other than the developer's own confidence, there is no guarantee that the changes work as intended; do not interfere with existing functionality; and scale well under heavy load. On the other hand, a deployment process as extensive as the one portrayed above brings with it a large amount of overhead that may not be necessary. Thus, the goal must be to find the golden mean that fits the organisation's nonfunctional requirements, size, and team structure.

> As [service-oriented computing (SOC)] becomes more prevalent, the question of which deployment approach is best gains importance. --- @talwar:approaches-for-service-deployment:2005 [p. 70]

> Recent studies show that management of software deployments dominates system administration costs, and that configuration is a major source of errors in system development. --- @talwar:comparison-of-approaches-to-service-deployment:2005 [p. 1]

Whether it is possible to determine a "best" approach, as Talwar et al. allude to, remains to be seen. However, they establish a need for a tool for comparison of strategies and tools.

In their 2005 article "Comparison of Approaches to Service Deployment", @talwar:comparison-of-approaches-to-service-deployment:2005 define and compare four different approaches to deployment of services: manual, script-based, language-based, and model-based as a function of scale, complexity, and susceptibility to change. They also define a few evaluation metrics which they call Quality of Manageability (QoM) measures for the deployment configuration:

- number of lines of configuration code (LOC) for deployment;
- number of steps involved in deployment;
- LOC to express configuration changes;
- time to develop, deploy, and make a change.

Their comparison framework is grouped into four key categories [@talwar:comparison-of-approaches-to-service-deployment:2005, pp. 8-9]:

- automation (self-management): scripts that repeatedly perform manual tasks;
- self-healing: enabling a system to react to failures;
- expressiveness (ease of use): how easy it is to configure and maintain the deployment approach;
- barriers to first use: how much a priori knowledge is required of the person managing deployments.

They conclude that for systems with few deployed services and configuration changes, a manual solution is the most reasonable approach; few deployed systems with comprehensive configuration changes call for a script-based approach; larger environments where changes involve dependencies prefer language-based solutions; and a model-based approach is ideal for large systems where the underlying service design is affected by the deployment. This is mirrored in terms of configuration [@talwar:comparison-of-approaches-to-service-deployment:2005, p. 9].

> There is an opportunity to develop more elaborate quantitative comparison, potentially based on software metrics, such as those in software engineering. --- @talwar:comparison-of-approaches-to-service-deployment:2005 [p. 10]

In the write-up "Don't Install Software By Hand", @spinellis:by-hand:2012 [p. 86] seconds the sentiments that IT systems are now expected to be a composition of multiple services, and that automation is a key enabler for ensuring that delivered IT systems are "not inscrutable monoliths that just happen to work but documented modular engines that work by design" [@spinellis:by-hand:2012, p. 87].

Spinellis also touches upon two additional key themes. First, DevOps (composed of Developer and Operations) is a setting where developers no longer "toss software deliverables over a wall" for deployment, but instead coordinate through development processes like Continuous Deployment and automated testing, a process commonly referred to as DevOps (from Developer and Operations) [@spinellis:by-hand:2012, p. 86]. Second, he considers the idea of documentation of the system expressed as code, which is an added bonus introduced if the individual services are simple enough.

[^12factor]: http://12factor.net

## Code as documentation

In his book _The Laws of Software Process: A New Model for the Production and Management of Software_, Phillip Armour states that a software system is not in itself a product, but a _container for knowledge_; code is, indeed, executable knowledge [@armour:laws:2007, loc. 427 and _passim_]. While his focus is on _domain_ knowledge as it lives within software systems, it is possible to apply this idea to any code, as @spinellis:by-hand:2012 points out: code is an executable specification, so expressive and concise code is self-documenting in a way that never rots.

Another of @talwar:comparison-of-approaches-to-service-deployment:2005 [p. 9]'s key findings is that maintainability and documentability are proportional to the number of LOC, and that the number of steps and LOC are both reduced with the introduction of more sophisticated deployment tools:

> Finally, the system's documentation would have been very coherent and consistent, reduced to a single configuration file, documenting an absolute minimum number of parameters and making subsequent changes easy. --- @talwar:comparison-of-approaches-to-service-deployment:2005 [p. 3]

It follows, then, that documentation of a system's functions and configuration can (and should, where feasible) be expressed as software rather than in a separate set of files such as a wiki. The external documentation format is, however, useful for documenting overall purposes, decision logs, and other organisational concerns regarding both the individual services and the larger system.

## Continuous Delivery and DevOps (developer operations)

Continuous Delivery (CD) can be said to comprise two different ideas [@virmani:2015, p.79]:

- Continuous Integration (CI), the practise of integrating changes into the mainline early (for example, master branch if the team uses Git for version control); and
- Continuous Deployment, the practise of deploying changes to the end users as soon as they make it into the mainline.

Putting these together renders a development workflow where developers frequently merge their changes into the production-ready version of the code base, and those changes are immediately deployed to the end users. This way of developing may introduce a need for feature management such as blue/green deployment and/or canary release.

Continuous Delivery is only a part of a deployment strategy, but deserves its own discussion because of its potential organisational impact.

With a monolithic architecture it may be possible to have a dedicated operations (Ops) team and still deploy new features and fixes to the end users somewhat continuously as the team will only have to deal with a single artefact. Even if they need to deploy it multiple times per day, tools can be developed to quickly verify and deploy the artefact in a short time. In a microservice context, however, with multiple services and teams each selecting their own technology stacks and deployment habits, it will likely be impossible for a dedicated operations team to manually verify and deploy each service as it receives changes. Furthermore, having to provide the Ops team with a production-ready package for them to verify and deploy whenever a change is made to the code base introduces unnecessary overhead for the development teams.

Teams working in a microservice context are strongly incentivised to automate the process of deployment, and automation is _required_ to maintain a frequent and continuous [@bruneo:cloudwave:2014; @wettinger:devops-for-cloud:2015], stripping an Ops team of this repetitive role.

## Quality metrics for deployment pipelines

There have been several studies specifically measuring the quality of a deployment pipeline (e.g., @talwar:comparison-of-approaches-to-service-deployment:2005; @castro:evaluating:2015; @feitelson:at-facebook:2013), some concerned with only a specific part of the pipeline (such as @spinellis:by-hand:2012; chen:continuous-delivery:2015), and---given that deployment configuration is indeed code---it becomes relevant to look to metrics designed to measure code quality in general (for instance @bass-clements-kazman:software-architecture-in-practice:2013 with regard to architecture).

One important factor introduced by @chen:architecting-for-cd:2015 is which Architecturally Significant Requirements (ASRs) the deployment strategy imposes on the project. While Chen considers architecting for Continuous Delivery in a broad sense, different strategies will impose fewer or more ASRs of differing types on the code base of the actual service. More ASRs can make the transition to a Continuous Delivery set-up more difficult, more time consuming, and thus more expensive.

## Proposals for future research

(…)
