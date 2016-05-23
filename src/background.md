# Background

In order to establish which concepts are important to discuss and identify a gap in the current research, this section reviews the current literature on areas related to cloud computing and microservices. In broad strokes, two key areas are considered:

- Cloud architecture, the availability of and need for automatic performance scaling, and its effect on software architecture---in particular the __microservice pattern__; and
- __Delivery__ and automated deployment, focusing on the technical and organisational aspects of this process.

In conclusion, a subset of the identified areas of research is presented. This provides a starting point for discussing quality measurement metrics for automated deployment strategies.

## Cloud computing and microservices

TODO: Name this subchapter "microservices", and make a new subchapter below it named "Cloud computing" discussing how cloud is relevant to microservices (can microservices be done without cloud? Yes!) and my project/framework.

@talwar:comparison-of-approaches-to-service-deployment:2005 [p. 1] broadly define a _service_ as a piece of software that encapsulates and presents some useful functionality, and can be part of an overall _system_. In other words, a _service_ is a specialised, autonomous, stand-alone server. The idea of splitting a large application's code base into multiple services is often referred to as the Service-Oriented Architecture (SOA) [e.g., @castro:evaluating:2015; @arnold:pattern-based-soa:2007]. For instance, an e-commerce site, such as the extremely popular Amazon^[https://amazon.com], may implement part of their system using the service pattern in the following way (see Figure @fig:example-e-commerce-services):

TODO:

- BLURRY AS BALLS
- Lacks "CSS" in the web app box

![Example e-commerce service stack](http://img.ctrlv.in/img/16/03/16/56e9409e7ad65.png){#fig:example-e-commerce-services}

- One service managing registered users (behind the firewall);
- One service keeping track of inventory (behind the firewall);
- One service keeping track of orders (behind the firewall);
- One API Gateway (accessible through the firewall); and
- One web application that communicates with the public API and visualises the data as a website.

The microservice pattern can be seen as a way to implement SOA by defining each service as a stand-alone application that can be run, developed, and deployed independently of the other services in the system [@castro:evaluating:2015, p. 585]. A service can be interacted with through a defined interface. One may open for communication over the network using an interface such as REpresentational State Transfer (REST) or Remote Procedure Calls (RPC). A software _system_ is composed of one or more _services_. Thus, a _system_ is an abstract idea that only exists in documentation, while its _services_ are the concrete software implementations of the various elements of the system specification. In addition to a set of microservices, a _system_ will often contain one or more clients that provide interfaces for interacting with the data contained within the system.

@evans-fowler:domain-driven-design:2003 [p. 1] used the term _domain_  about the _subject area_ to which a piece of software is applied. In this context, the entire set of services is a software expression of the domain: it both contains the data, and provides means of accessing and manipulating it. A domain has multiple contexts, especially on big projects, so it is important to define _Bounded Contexts_^[http://martinfowler.com/bliki/BoundedContext.html] in which a model applies [@evans-fowler:domain-driven-design:2003, pp. 298--299]. A project should initially be a monolith, and be decomposed into microservices as it grows in size and complexity [@newman:building-microservices:2015, loc. 804].

Each _client_ in a system is an expression of a Bounded Context. A client has traditionally meant a website, rendered to static assets (HTML, CSS, and JavaScript) on the server before being sent to the end user's web browser. In a system with only microservices and clients, the client connects directly to one or more services. It is then the client's task to combine data in a meaningful way and display it to the user.

With the rise of front-end JavaScript frameworks such as Google's AngularJS^[https://angularjs.org/] and Facebook's React^[https://facebook.github.io/react/], it has become a common industry practise to build an _API Gateway_^[https://www.nginx.com/blog/building-microservices-using-an-api-gateway] in addition to the web client. An API Gateway is reminiscent of the classic _façade pattern_ [@gof] from object-oriented programming: the single responsibility of the API Gateway is to combine data from the various microservices within the Bounded Context, and expose the data to the client through a tailored web API. In this pattern, each API Gateway represents a single Bounded Context.

The API Gateway pattern allows executing potentially slow actions like making multiple requests and merging the data on a developer-controlled server, instead of in the user's web browser. This can be a great advantage, as the client is subject to multiple factors outside the developers' control, such as network latency and hardware specifications. The pattern also enables some security measures, such as running microservices behind a firewall. Finally, the same API Gateway can be used by multiple clients on other platforms than the web, such as mobile and desktop applications.

This yields a system that allows independent teams, and tailors the technology stacks to each service's requirements. The microservice pattern places no restrictions on technology choices such as language and framework for each service: the only hard requirement is that each service must expose an interface through which it is possible to communicate with the service. For example, one may build a REST interface on top of the HyperText Transfer Protocol (HTTP), or an RPC interface built directly on the Transmission Control Protocol (TCP).

When each service communicates via a standardised interface, it becomes possible to build hundreds of services, each in a different programming language. However, this can place a heavy burden on the infrastructure if the services are not properly contained, and may make it hard for any given developer to work on multiple services. Thus, a completely passive government of technology choices may not be _feasible_ [@newman:building-microservices:2015, loc. 200].

Somewhat related to the microservice pattern, the system's user interface application (for example a web application) may consist of multiple web applications abstracted to look like a single application by a load balancer or proxy. These can be navigated without making the user aware that they are switching between applications, given a uniform look and feel.

The microservice pattern is an increasingly popular alternative to the traditional _monolithic_ architecture. In this context, a monolithic application (or a _monolith_) refers to a large application where the entire system consists of a single code base executed within a single runtime (e.g., the Java Virtual Machine (JVM) or .NET's Common Language Runtime (CLR)).

@castro:evaluating:2015 [p. 590] conclude that there are several benefits to being able to publish a system as a set of smaller services that can be managed independently. Specifically, they point to independent development, deployment, scaling, operation, and monitoring as a key enabler for companies to manage large applications with a more practical methodology, and scale individual development teams more easily.

They also point to the cost of this gained agility and granular scalability: microservices are by definition parts of a distributed system, which introduces a whole new class of concerns. The "fallacies of distributed computing" is a popular set of assumptions developers make when they are new to distributed computing^[Arnon Rotem-Gal-Oz's whitepaper "Fallacies of Distributed Computing Explained", available at <https://pages.cs.wisc.edu/~zuyu/files/fallacies.pdf>.]:

> 1. The network is reliable;
> 2. Latency is zero;
> 3. Bandwidth is infinite;
> 4. The network is secure;
> 5. Topology doesn't change;
> 6. There is one administrator;
> 7. Transport cost is zero; and
> 8. The network is homogeneous.

These assertions will definitely need to be taken into consideration in the comparison of various approaches. Despite their age, the fallacies are highly relevant to three popular quality attributes: _Consistency_, the guarantee that a request to read data always returns the most recently written data; _Availability_, the guarantee that the system consistently returns an expected response within timeout limits; and _Partition tolerance_ the guarantee that the system responds as expected even if network nodes are unable to communicate (CAP). The _CAP Theorem_ states that it is impossible for a system to meet all attributes at the same time [@brewer:cap:2012], as shown in @erb:2012's Figure @fig:cap-venn-diagram.

![CAP theorem as a Venn diagram [@erb:2012]](http://img.ctrlv.in/img/16/05/20/573e4fbf0a685.png){#fig:cap-venn-diagram width=50%}

There are multiple potential areas of research related to the problems of availability and consistency. One that becomes particularly prominent in the context of microservices is flexible _service discovery_, i.e. dynamically finding the IP address of web services able to answer a request [e.g., @paliwal:semantics-based-discovery:2012; @bethea:automated-discovery:2008]. Another area of relevance is fault tolerance using cloud services with tools for automatic failover to data centres in other geographical locations (or even other cloud platform providers) [e.g., @hole:building-trust:2016; @addo:automatic-failover:2014].

@castro:evaluating:2015 [p. 590] suggested evaluating different strategies, tools, and cloud services as future work on automated deployment. This indicates a need for a survey and comparison of the various tools that exist---but first, various strategies must be considered.

## Deployment strategies

@wahaballa:unified:2015 [p. 211] define software deployment as "all of the activities that make a software system available for use.". Following this definition, deployment is something every single provider of an online service must handle in some way. Deployment strategies can range from being extremely simple---e.g., by logging onto a server and manually editing some PHP code running in production---to comprehensive code review processes followed by running a pre-built artefact through several layers of automated tests, multiple test environments for manual quality assurance involving layers of bureaucracy, and finally deploying the new changes functions to a controlled subset of the production servers (known as blue/green deployment[^blue-green-deployment]) and a fraction of the end users of the service (known as canary release[^canary-release]).

[^blue-green-deployment]: http://martinfowler.com/bliki/BlueGreenDeployment.html
[^canary-release]: http://martinfowler.com/bliki/CanaryRelease.html

Logically, the quickest way of deploying new features to the end users is to directly modify the code running in the production environment. However, this is a risky approach. There is no guarantee, beyond the developer's own confidence, that that the code behaves as intended, do not interfere with existing functionality, and scale well under heavy load. On the other hand, a deployment process as extensive as the one portrayed above brings with it a large amount of overhead that may not be necessary. Thus, the goal must be to find the golden mean that fits the organisation's technical requirements, size, and team structure.

Software deployment is a dominating system administration cost, and configuration is a major error source [@talwar:comparison-of-approaches-to-service-deployment:2005]. As the popularity of service-based computing rises, so does the importance of answering which deployment approach is the best fit for the context [@talwar:approaches-for-service-deployment:2005].

@talwar:comparison-of-approaches-to-service-deployment:2005 define and compare four different approaches to deployment of services: manual, script-based, language-based, and model-based as a function of scale, complexity, and susceptibility to change. They also define a few evaluation metrics which they call Quality of Manageability (QoM) for the deployment configuration:

- Lines of code (LOC) for deployment configuration;
- Number of steps involved in deployment;
- LOC to express configuration changes; and
- Time to develop, and deploy a change.

Their comparison framework is grouped into four key categories [@talwar:comparison-of-approaches-to-service-deployment:2005, pp. 8-9]:

- Automation (self-management): scripts that repeatedly perform manual tasks;
- Self-healing: enabling a system to react to failures;
- Expressiveness (ease of use): how easy it is to configure and maintain the deployment approach; and
- Barriers to first use: how much a priori knowledge is required of the person managing deployments.

They conclude that for systems with few deployed services and configuration changes, a manual solution is the most reasonable approach. Few deployed systems with comprehensive configuration changes call for a script-based approach. Larger environments where changes involve dependencies prefer language-based solutions. Finally, a model-based approach is ideal for large systems where the underlying service design is affected by the deployment. This is mirrored in terms of configuration [@talwar:comparison-of-approaches-to-service-deployment:2005, p. 9].

> There is an opportunity to develop more elaborate quantitative comparison, potentially based on software metrics, such as those in software engineering. --- @talwar:comparison-of-approaches-to-service-deployment:2005 [p. 10]

@spinellis:by-hand:2012 [p. 86] agrees that IT systems are now expected to be a composition of multiple services, and that automation is a key enabler for ensuring that delivered IT systems are "not inscrutable monoliths that just happen to work but documented modular engines that work by design" [@spinellis:by-hand:2012, p. 87].  He also mentions two additional key themes. First, DevOps (composed of Developer and Operations) is a setting where developers no longer "toss software deliverables over a wall" for deployment, but instead coordinate through development processes like Continuous Deployment and automated testing [@spinellis:by-hand:2012, p. 86]. Second, he considers the idea of documentation of the system expressed as code, which is an added bonus that comes for free if the individual services are simple enough.

In summary, there are multiple areas to look at in future research related to cloud computing and microservices. Perhaps most prevalent is the need for an evaluation of various strategies and tools for Deployment Automation. One way to approach this can be development of tools for _quantitative_ comparison of Deployment Automation strategies. Looking at deployment configuration as source code allows using techniques from software engineering for this evaluation.

## Code as documentation

@armour:laws:2007 [loc. 427 and _passim_] stated that a software system is not in itself a product, but a _container for knowledge_; code is, indeed, executable knowledge. While his focus is on _domain_ knowledge as it lives within software systems, it is possible to apply this idea to any code, as @spinellis:by-hand:2012 points out: code is an executable specification, so expressive and concise code is self-documenting in a way that never rots.

Another of @talwar:comparison-of-approaches-to-service-deployment:2005 [p. 9]'s key findings is that maintainability and documentability are proportional to the number of LOC, and that the number of steps and LOC are both reduced with the introduction of more sophisticated deployment tools.

It follows that documentation of a system's functions and configuration can (and should, where feasible) be expressed as software rather than in a separate set of files such as a wiki. The external documentation format is, however, useful for documenting overall purposes, decision logs, and other organisational concerns regarding both the individual services and the larger system. This can be relevant foundation for research into highly expressive configuration. One theme in particular is specifying configuration as _code_ to be _run_ by a tool, rather than _markup_ such as XML to be _parsed_ by the tool.

## Continuous Delivery and DevOps

Continuous Delivery (CD) can be said to be a combination of two different ideas [@virmani:2015, p.79]:

- Continuous Integration (CI), the practise of integrating changes into the mainline early (e.g., master branch if the team uses Git for version control); and
- Continuous Deployment, the practise of deploying changes to the end users as soon as they make it into the mainline.

Putting these together renders a development workflow where developers frequently merge their changes into the production-ready version of the code base, and those changes are immediately deployed to the end users. This way of developing may introduce a need for feature management such as blue/green deployment[^blue-green-deployment] and/or canary release[^canary-release].

Continuous Delivery is only a part of a deployment strategy, but deserves its own discussion because of its potential organisational impact. With a monolithic architecture it may be possible to have a dedicated operations (Ops) team and still deploy new features and fixes to the end users somewhat continuously as the team will only have to deal with a single artefact. Even if they need to deploy it multiple times per day, tools can be developed to quickly verify and deploy the artefact. In a microservice context, however, with multiple services and teams each selecting their own technology stacks and deployment habits, it will likely be unfeasible for a dedicated operations team to manually verify and deploy each service as it receives changes. Furthermore, having to provide the Ops team with a production-ready package for them to verify and deploy whenever a change is made to the code base introduces unnecessary overhead for the development teams. This requires an organisational shift of deployment responsibility known as DevOps [e.g., @cois:modern-devops:2014].

Teams working in a microservice context can benefit from automating the process of deployment, and automation is suggested as a _requirement_ to maintain a frequent and continuous release cycle [@bruneo:cloudwave:2014; @wettinger:devops-for-cloud:2015]. The combination of automation and developers' responsibility for deployment---DevOps---should remove the need for a dedicated Ops team.

## Deployment pipeline quality metrics

There have been several studies specifically measuring the quality of a deployment pipeline (e.g., @talwar:comparison-of-approaches-to-service-deployment:2005; @castro:evaluating:2015; @feitelson:at-facebook:2013), some concerned with only a specific part of the pipeline (e.g., @spinellis:by-hand:2012; @chen:continuous-delivery:2015). Given that deployment configuration is indeed code, it becomes relevant to look to metrics designed to measure code quality in general (e.g., @bass-clements-kazman:software-architecture-in-practice:2013 with regard to architecture).

@chen:architecting-for-cd:2015 introduces the concept of Architecturally Significant Requirements, referring to the architectural requirements imposed upon the service itself by the deployment strategy. 

One important factor described by @chen:architecting-for-cd:2015 is which Architecturally Significant Requirements (ASRs) the deployment strategy imposes on the project. While Chen considers architecting for Continuous Delivery in a broad sense, different strategies will impose fewer or more ASRs of differing types on the code base of the actual service. More ASRs can make the transition to a Continuous Delivery set-up more difficult, more time consuming, and thus more expensive.

One particular ASR is considered by @addo:automatic-failover:2014, who describe an architecture for automatically routing traffic to other cloud providers if one fails. This points back to the CAP theorem, and raises the question of how to replicate data and ensure consistency across multiple providers.

## The Twelve-Factor App

Supporting the notion of ASRs, the popular Platform as a Service (PaaS) provider Heroku^[https://heroku.com] has defined a document it calls _The Twelve-Factor App_^[http://12factor.net]. This set of guidelines is highly relevant to deployment of microservices, and so the twelve factors are outlined in the following.

```include
src/components/12factor.md
```

## Summary

This chapter has introduced the concept of microservices and their applicability, as well as some techniques for measuring quality and comparing strategies for deploying them.

First, provisioning and maintaining the microservice runtime is a key concern. It ties in with the known CAP theorem, stating that consistency, availability, and partition tolerance is an unfeasible goal.

Second, cloud computing is an important factor when discussing microservices, as many of the key advantages of a microservice architecture come into play when computing resources are virtually unlimited. A system of microservices naturally requires more resources such as CPU and RAM than a monolithic system, as the microservice-based system comprises multiple runtimes and databases. If computing resources are not limited, however, this isolation allows both scaling and deployment of independent services. This has become a realistic scenario due to the rise of cloud providers.

Third, the deployment regime in the organisation plays a large role in the selection of a deployment strategy. It is essential to draw a parallel between how often the organisation _wishes_ to deploy changes to the end users, and how often the infrastructure _allows_ deployment. Automating the process takes work and introduces a learning curve, so the deployment pipeline should be tailored to suit the organisation's needs.

Fourth, the expressiveness and readability of the code that specifies the deployment strategy is a key factor in cutting the learning curve for the deployment strategy. As the configuration code grows, its quality can be measured using tools from the software engineering field---not just deployment.

Fifth, selecting a deployment strategy may have a significant organisational impact. For example, introducing DevOps to enable Continuous Delivery in an organisation that previously had a centralised team responsible for deployments requires the organisation to distribute these responsibilities to the developers, and possibly introduce new roles. In a sizable organisation, this distribution of responsibility can be challenging: it affects the workflow of everyone responsible for the development, ranging from developers to managers. DevOps also affects processes for identifying and resolving problems with the software.

Last, there are multiple ways of measuring quality of deployment approaches. In particular, Architecturally Significant Requirements of the Deployment Strategy may require so many changes to the existing code base that the strategy is unfeasible for the organisation.

With this context established, the next chapter, Method, presents how data was gathered to evaluate and compare various strategies for deployment.
